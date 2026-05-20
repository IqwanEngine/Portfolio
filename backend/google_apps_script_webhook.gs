/**
 * Google Apps Script Webhook API - doPost(e)
 * Designed for Hairul Iqwan's Premium Portfolio Automation System
 * 
 * Target Webhook URL: https://script.google.com/macros/s/AKfycbwNC-6YSV5VZheQzgl1EDTw-8r5XT6FKnAykbjiIjDhJT1AHzdCotlVuM5hGvaeMiI/exec
 * 
 * This script processes incoming POST requests containing contact form data:
 * { "name": "...", "email": "...", "message": "..." }
 * 
 * It automatically sends:
 * 1. A highly polished, crimson-themed confirmation HTML email back to the visitor/sender.
 * 2. An administration notification copy to your personal email.
 */

// Handle POST request from the React frontend
function doPost(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    // Parse the incoming JSON content
    var postData;
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        "status": "error",
        "message": "Empty payload received"
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }

    var name = postData.name || "Anonymous Visitor";
    var email = postData.email || "";
    var message = postData.message || "No message body provided.";

    // Validate email address presence
    if (!email || email.trim() === "") {
      return ContentService.createTextOutput(JSON.stringify({
        "status": "error",
        "message": "Valid email address is required to dispatch notification"
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }

    // Retrieve script owner's email address
    var myEmail = Session.getActiveUser().getEmail() || "hairuliqwan352@gmail.com";

    // Build styled HTML emails
    var autoResponseHtml = getAutoResponseHtml(name, message);
    var adminNotificationHtml = getAdminNotificationHtml(name, email, message);

    // 1. Dispatch confirmation auto-response back to the sender
    MailApp.sendEmail({
      to: email,
      subject: "RECON_TRANSMISSION: Handshake Successful // Hairul Iqwan",
      htmlBody: autoResponseHtml,
      name: "IqwanEngine // Hairul Iqwan"
    });

    // 2. Dispatch administrative alert containing submission details back to creator
    MailApp.sendEmail({
      to: myEmail,
      subject: "ALERT // PORTFOLIO_INBOUND: Message from " + name,
      htmlBody: adminNotificationHtml,
      replyTo: email,
      name: "IqwanEngine Alerts"
    });

    // Return CORS-friendly success JSON output
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Transmission successfully processed & routed."
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);

  } catch (err) {
    Logger.log("Critical execution error: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": "Internal processing failure.",
      "details": err.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// Handle OPTIONS request for preflight CORS negotiation
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    });
}

/**
 * HTML Template: Visitor/Sender Auto-Response Confirmation
 * Premium Crimson Red on Dark Slate Theme Match
 */
function getAutoResponseHtml(name, userMessage) {
  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta charset="utf-8">',
    '  <style>',
    '    body {',
    '      margin: 0; padding: 0; background-color: #030305; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '      color: #ffffff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;',
    '    }',
    '    .wrapper {',
    '      width: 100%; table-layout: fixed; background-color: #030305; padding: 30px 0;',
    '    }',
    '    .container {',
    '      max-width: 600px; margin: 0 auto; background-color: #0a0a0c; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 6px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.4);',
    '    }',
    '    .header {',
    '      background-color: #0c000c; padding: 30px; text-align: center; border-bottom: 1px solid rgba(239, 68, 68, 0.15);',
    '    }',
    '    .header h1 {',
    '      margin: 0; font-size: 18px; font-weight: bold; font-family: monospace; letter-spacing: 5px; color: #ef4444; text-transform: uppercase;',
    '    }',
    '    .content {',
    '      padding: 40px 30px; line-height: 1.6; color: #d1d5db; font-size: 14px;',
    '    }',
    '    .content p { margin: 0 0 20px 0; }',
    '    .highlight { color: #ffffff; font-weight: 600; }',
    '    .quote-box {',
    '      background-color: #030305; border-left: 3px solid #ef4444; padding: 15px 20px; margin: 25px 0; font-style: italic; color: #9ca3af; font-size: 13px;',
    '    }',
    '    .tech-badge {',
    '      display: inline-block; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); background-color: rgba(239, 68, 68, 0.05); padding: 4px 10px; border-radius: 2px; margin-bottom: 20px;',
    '    }',
    '    .footer {',
    '      background-color: #030305; padding: 25px 30px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-family: monospace; font-size: 10px; color: #4b5563; text-transform: uppercase; letter-spacing: 3px;',
    '    }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="wrapper">',
    '    <div class="container">',
    '      <div class="header">',
    '        <h1>IQWANENGINE // BOT_ACK</h1>',
    '      </div>',
    '      <div class="content">',
    '        <div class="tech-badge">HANDSHAKE_INITIALIZED_2026</div>',
    '        <p>Hello <span class="highlight">' + name + '</span>,</p>',
    '        <p>This is an automated operational confirmation that your digital transmission has been received and logged securely by my personal portfolio systems on my core node servers.</p>',
    '        <p>I genuinely appreciate you reaching out. I have cached your message details, and I will establish a direct human comms link back to your address as soon as possible.</p>',
    '        <div class="quote-box">',
    '          <span class="highlight">Your Message:</span><br/>',
    '          "' + userMessage.replace(/\n/g, '<br/>') + '"',
    '        </div>',
    '        <p>Let\'s build the next great automation workflow together.</p>',
    '        <p style="margin-bottom: 0;">Sincerely,<br/><span class="highlight" style="color: #ef4444;">Hairul Iqwan</span><br/>Full-Stack Developer</p>',
    '      </div>',
    '      <div class="footer">',
    '        SYSTEM_STATUS: ONLINE_CORE // CYBERJAYA_MY',
    '      </div>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

/**
 * HTML Template: Admin/Owner Notification Alert
 * Detailed structural display mapping submission context
 */
function getAdminNotificationHtml(name, email, userMessage) {
  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta charset="utf-8">',
    '  <style>',
    '    body {',
    '      margin: 0; padding: 0; background-color: #030305; font-family: monospace; color: #ffffff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;',
    '    }',
    '    .wrapper {',
    '      width: 100%; table-layout: fixed; background-color: #030305; padding: 30px 0;',
    '    }',
    '    .container {',
    '      max-width: 600px; margin: 0 auto; background-color: #0a0a0c; border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; overflow: hidden;',
    '    }',
    '    .header {',
    '      background-color: #0e0404; padding: 25px; text-align: left; border-bottom: 1px solid rgba(239, 68, 68, 0.3);',
    '    }',
    '    .header h2 {',
    '      margin: 0; font-size: 14px; font-weight: bold; letter-spacing: 3px; color: #ef4444; text-transform: uppercase;',
    '    }',
    '    .section {',
    '      padding: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);',
    '    }',
    '    .label {',
    '      color: #ef4444; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; display: block;',
    '    }',
    '    .value {',
    '      color: #f3f4f6; font-size: 13px; margin: 0 0 18px 0; background-color: #030305; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.05);',
    '    }',
    '    .msg-body {',
    '      margin: 0; color: #f3f4f6; font-size: 13px; line-height: 1.6; white-space: pre-wrap; background-color: #030305; padding: 12px; border: 1px solid rgba(239, 68, 68, 0.15); border-left: 3px solid #ef4444;',
    '    }',
    '    .footer {',
    '      background-color: #030305; padding: 20px 30px; text-align: center; font-size: 9px; color: #4b5563; text-transform: uppercase; letter-spacing: 2px;',
    '    }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="wrapper">',
    '    <div class="container">',
    '      <div class="header">',
    '        <h2>[!] ALERT: PORTFOLIO_INBOUND_SIGNAL</h2>',
    '      </div>',
    '      <div class="section">',
    '        <span class="label">TRANS_AUTHOR</span>',
    '        <div class="value">' + name + '</div>',
    '        ',
    '        <span class="label">TRANS_ROUTE_REPLY_TO</span>',
    '        <div class="value">' + email + '</div>',
    '        ',
    '        <span class="label">TRANS_PAYLOAD_BODY</span>',
    '        <div class="msg-body">' + userMessage + '</div>',
    '      </div>',
    '      <div class="footer">',
    '        IQWANENGINE TELEMETRY SYSTEM // PORTFOLIO_V4',
    '      </div>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}
