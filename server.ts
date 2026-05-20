import express from "express";
import path from "path";
import fs from "fs"; // fs import is no longer needed after removing local file storage, but keeping for now as it's not harmful. Will remove if it causes build issues.
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Strict check for GEMINI_API_KEY
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error(
      "[CRITICAL_CONFIG_ERROR]: GEMINI_API_KEY is not set. AI Recruiter API will not function.",
    );
    // Optionally, you might want to exit the process or disable the API endpoint.
    // For now, it will proceed but the AI functionality will fail.
  }

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: geminiApiKey || "", // Use the checked key
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // AI Recruiter API
  app.post("/api/recruiter", async (req, res) => {
    if (!geminiApiKey) {
      return res
        .status(500)
        .json({
          error:
            "AI Recruiter API is not configured. GEMINI_API_KEY is missing.",
        });
    }
    try {
      const { query } = req.body;

      const prompt = `
        You are an AI assistant representing Muhammad Hairul Iqwan (Iqwan), a Workflow Automation Specialist & Fullstack Developer.
        Iqwan\'s Profile:\n- 10+ years experience in Customer Operations (former CS Professional).
        - Transitioned to Fullstack Development & Automation.
        - Expertise: React, Tailwind CSS, Python, Google Apps Script, Workflow Automation, UI/UX Design.
        - Core Strength: Bridging manual operations with high-end automation. Understands \"human\" operations.
        - Personal Brand: \"IqwanEngine\".

        A recruiter or potential collaborator is asking: \"${query}\"\n
        Respond in a professional, slightly high-tech/cyberpunk tone, as if you are the \"IqwanEngine Core Neural Link\".\n        Highlight his unique background in CS as a competitive advantage.
        Keep it concise and persuasive.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Recruiter Error:", error);
      res.status(500).json({ error: "Failed to process request." });
    }
  });

  // FEEDBACK WEBHOOK ROUTABLE PORT & FIREWALL LAYER
  app.post("/api/feedback", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // TWO-TIER VALIDATION GUARD (The Backend Firewall)
      if (!name || !email || !message) {
        console.warn(
          "[FIREWALL_REJECT]: Missing mandatory parameter properties.",
        );
        res.status(400).json({
          status: "ERROR",
          message:
            "Security Reject: Missing required fields (name, email, message).",
        });
        return;
      }

      const EMAIL_STRICT_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!EMAIL_STRICT_PATTERN.test(email.trim())) {
        console.error(
          `[SECURITY_BREACH_ALERT]: Inbound email \'${email}\' violates strict pattern verification.`,
        );
        res.status(400).json({
          status: "ERROR",
          message: "Security Reject: Malformed email string",
        });
        return;
      }

      console.log(
        `[PROCESSING]: Handshake secure for \'${name}\' (${email}). Proceeding to webhook dispatches...`,
      );

      // Removed: 1. COMMITTING FILE-BASED SQL-ALIKE ROW TRANSACTIONS

      // 2. Telegram Webhook sync dispatcher
      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
      // Removed hardcoded fallback for GAS_WEBHOOK_URL. Now it must be set in env.
      const GAS_WEBHOOK_URL = process.env.GAS_WEBHOOK_URL;

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        try {
          const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
          const response = await fetch(tgUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: `🚨 *New Portfolio Lead!*\n👤 *Name:* ${name}\n📬 *Email:* ${email}\n✉️ *Message:* ${message}`,
              parse_mode: "Markdown",
            }),
          });
          if (response.ok) {
            console.log("[TELEGRAM_DISPATCH]: Message pushed successfully.");
          } else {
            console.error(
              `[TELEGRAM_DISPATCH_FAILED]: Status ${response.status} - ${response.statusText}`,
            );
            // Attempt to read and log response body for more details on failure
            try {
              const errorBody = await response.text();
              console.error(`[TELEGRAM_DISPATCH_FAILED_DETAILS]: ${errorBody}`);
            } catch (bodyReadError) {
              console.error(
                `[TELEGRAM_DISPATCH_FAILED_DETAILS]: Could not read response body: ${bodyReadError}`,
              );
            }
          }
        } catch (tgErr: any) {
          console.error(
            `[TELEGRAM_DISPATCH_EXCEPTION]: Connection failure on Telegram Node: ${tgErr.message}`,
          );
        }
      } else {
        console.log(
          "[SYSTEM]: Telegram target token variables are unconfigured. Skipping Telegram dispatch.",
        );
      }

      // 3. Google Apps Script Webhook sync dispatcher
      if (GAS_WEBHOOK_URL) {
        try {
          const response = await fetch(GAS_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          });
          if (response.ok) {
            console.log(
              "[GAS_DISPATCH]: Webhook auto-acknowledgement successfully executed.",
            );
          } else {
            console.error(
              `[GAS_DISPATCH_FAILED]: Status ${response.status} - ${response.statusText}`,
            );
            // Attempt to read and log response body for more details on failure
            try {
              const errorBody = await response.text();
              console.error(`[GAS_DISPATCH_FAILED_DETAILS]: ${errorBody}`);
            } catch (bodyReadError) {
              console.error(
                `[GAS_DISPATCH_FAILED_DETAILS]: Could not read response body: ${bodyReadError}`,
              );
            }
          }
        } catch (gasErr: any) {
          console.error(
            `[GAS_DISPATCH_EXCEPTION]: Connection failure on Apps Script Node: ${gasErr.message}`,
          );
        }
      } else {
        console.log(
          "[SYSTEM]: Google Apps Script Target webhook is unconfigured. Skipping GAS email.",
        );
      }

      res.status(201).json({
        status: "SUCCESS",
        message: "Lead securely processed across all neural nodes.",
      });
    } catch (err: any) {
      console.error("[CRITICAL_ERROR]: Feedback endpoint crash:", err);
      res.status(500).json({
        status: "ERROR",
        message: "Internal processing collapse. Signal terminated.",
      });
    }
  });

  // Serve /HI-Portfolio/assets and /assets directly from root assets folder
  app.use(
    "/HI-Portfolio/assets",
    express.static(path.join(process.cwd(), "assets")),
  );
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
