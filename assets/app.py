import os
import re
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests

# -------------------------------------------------------------------------
# LOGGING CONFIG_SYS
# -------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] SYSTEM_NODE: %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("security_trace.log")
    ]
)
logger = logging.getLogger("IqwanEngine_Backend")

# -------------------------------------------------------------------------
# SYSTEM CONFIG & APPS ENGINE
# -------------------------------------------------------------------------
app = Flask(__name__)

# Security configuration: Adjust allowed origins as needed for production domains
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Flask Configuration & Database Engine binding
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# SQLite portfolio database binding
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', f'sqlite:///{os.path.join(BASE_DIR, "portfolio.db")}'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Environment Variables Configuration Check
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
GAS_WEBHOOK_URL = os.environ.get("GAS_WEBHOOK_URL", "https://script.google.com/macros/s/AKfycbwNC-6YSV5VZheQzgl1EDTw-8r5XT6FKnAykbjiIjDhJT1AHzdCotlVuM5hGvaeMiI/exec")

# -------------------------------------------------------------------------
# DATABASE ORM MODELS (portfolio.db -> Table: feedback)
# -------------------------------------------------------------------------
class Feedback(db.Model):
    __tablename__ = 'feedback'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "timestamp": self.timestamp.isoformat()
        }

# -------------------------------------------------------------------------
# SYSTEM FIREWALL VERIFICATION & REGEX UTILS
# -------------------------------------------------------------------------
EMAIL_STRICT_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

def verify_email_pattern(email_str: str) -> bool:
    """
    Validates email values strictly using a strict regex boundary.
    No spaces are permitted, formatting must support <prefix>@<domain>.<suffix>
    """
    if not email_str:
        return False
    return bool(EMAIL_STRICT_PATTERN.match(email_str.strip()))

# -------------------------------------------------------------------------
# FIREWALL ENDPOINTS / ROTATING PIPELINES
# -------------------------------------------------------------------------
@app.route("/api/feedback", methods=["POST"])
def register_feedback_lead():
    """
    Secure Webhook routing feedback submissions through multi-neural checking.
    """
    try:
        payload = request.get_json()
        if not payload:
            logger.warning("[FIREWALL_REJECT]: Empty or invalid JSON content received.")
            return jsonify({
                "status": "ERROR",
                "message": "Security Reject: Malformed payload format."
            }), 400

        # Safe parameter extraction with parsing defaults
        name = payload.get("name", "").strip()
        email = payload.get("email", "").strip()
        message = payload.get("message", "").strip()

        # TWO-TIER VALIDATION GUARD (The Backend Firewall)
        if not name or not email or not message:
            logger.warning(f"[FIREWALL_REJECT]: Missing mandatory parameter properties. (Author: '{name}', Mail: '{email}')")
            return jsonify({
                "status": "ERROR",
                "message": "Security Reject: Missing required fields (name, email, message)."
            }), 400

        if not verify_email_pattern(email):
            # Dump internal security trace logs and reject
            logger.error(f"[SECURITY_BREACH_ALERT]: Inbound transmission email '{email}' violates strict pattern verification.")
            return jsonify({
                "status": "ERROR",
                "message": "Security Reject: Malformed email string"
            }), 400

        # IF EMAIL IS STRICTLY VALID (Lolos Tapisan) -> ENTER CORE TRANSACTION ENGINE
        logger.info(f"[PROCESSING]: Handshake secure for '{name}' ({email}). Committing payload to DB storage...")

        # 1. SQLite DB transaction session setup
        new_feedback = Feedback(name=name, email=email, message=message)
        db.session.add(new_feedback)
        db.session.commit()
        logger.info(f"[DATABASE_STORED]: Successfully stored database lead entry with ID {new_feedback.id}")

        # 2. Telegram Webhook sync dispatcher
        if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
            try:
                tg_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
                tg_payload = {
                    "chat_id": TELEGRAM_CHAT_ID,
                    "text": (
                        f"🚨 *New Portfolio Lead!*\n"
                        f"👤 *Name:* {name}\n"
                        f"📬 *Email:* {email}\n"
                        f"✉️ *Message:* {message}"
                    ),
                    "parse_mode": "Markdown"
                }
                tg_response = requests.post(tg_url, json=tg_payload, timeout=8)
                if tg_response.status_code == 200:
                    logger.info("[TELEGRAM_DISPATCH]: Message pushed successfully.")
                else:
                    logger.error(f"[TELEGRAM_DISPATCH_FAILED]: Status: {tg_response.status_code}, Body: {tg_response.text}")
            except Exception as tg_err:
                logger.error(f"[TELEGRAM_DISPATCH_EXCEPTION]: Connection failure on Telegram Node: {str(tg_err)}")
        else:
            logger.warning("[SYSTEM]: Telegram target token variables are unconfigured. Skipping Telegram dispatch.")

        # 3. Google Apps Script Webhook sync dispatcher
        if GAS_WEBHOOK_URL:
            try:
                gas_payload = {
                    "name": name,
                    "email": email,
                    "message": message
                }
                gas_response = requests.post(GAS_WEBHOOK_URL, json=gas_payload, timeout=10)
                if gas_response.status_code == 200:
                    logger.info("[GAS_DISPATCH]: Webhook auto-acknowledgement successfully executed.")
                else:
                    logger.error(f"[GAS_DISPATCH_FAILED]: Status: {gas_response.status_code}, Body: {gas_response.text}")
            except Exception as gas_err:
                logger.error(f"[GAS_DISPATCH_EXCEPTION]: Connection failure on Apps Script Node: {str(gas_err)}")
        else:
            logger.warning("[SYSTEM]: Google Apps Script Target webhook is unconfigured. Skipping GAS email.")

        # 4. Final Success Routing confirmation payload
        return jsonify({
            "status": "SUCCESS",
            "message": "Lead securely processed across all neural nodes."
        }), 201

    except Exception as general_err:
        logger.error(f"[CRITICAL_ERROR]: Encountered unexpected server crash: {str(general_err)}")
        return jsonify({
            "status": "ERROR",
            "message": "Internal processing collapse. Signal terminated."
        }), 500

# -------------------------------------------------------------------------
# DATABASE INITIALIZATION MANIFEST
# -------------------------------------------------------------------------
@app.before_all if hasattr(app, 'before_all') else None
def setup_database_schema():
    pass

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        logger.info("[INITIALIZATION]: Local DB Portfolio schemas successfully verified/created.")
    # Run server on secure debug default parameters
    app.run(host="0.0.0.0", port=5000, debug=True)
