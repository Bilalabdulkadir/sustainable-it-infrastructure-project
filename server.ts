import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if GEMINI_API_KEY is unset
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add your Gemini API key in Settings > Secrets inside the AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Full-stack API Route for Green IT audits
app.post("/api/audit", async (req: Request, res: Response): Promise<void> => {
  try {
    const ai = getAIClient();
    const { infraType, scale, currentPUE, primaryWorkload, additionalDetails } = req.body;

    if (!infraType || !scale || !primaryWorkload) {
      res.status(400).json({ error: "Missing required audit parameter values." });
      return;
    }

    const prompt = `Perform a comprehensive Green IT / Sustainable IT Infrastructure Audit for the following environment:
Deployment Type: ${infraType}
Scale: ${scale}
Estimated PUE (Power Usage Effectiveness): ${currentPUE}
Primary Workload: ${primaryWorkload}
Additional Details & Practices: ${additionalDetails}

Provide professional, rigorous, and highly actionable optimization feedback. Include exactly 3 prioritized recommendations categorized into 'energy', 'cloud', or 'ewaste'.
Also generate a highly optimized automation script (e.g. bash shell, python, or powershell) based on their details to help them automate optimization or monitoring (for instance, a local machine sleep-trigger audit, cloud virtual machine power scheduling cron task, or carbon calculation tool).
Provide an estimated annual kWh energy savings number for each recommendation.

Respond with strict JSON matching the requested schema. Ensure the overallScore is between 0 and 100 representing their current Green IT posture.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Chief Sustainability Officer and Senior Green IT Systems Architect. You are auditing organizations to optimize their digital carbon footprints, reduce datacenter power consumption, right-size cloud architecture, and establish sustainable hardware procurement lifecycles. Your audits must be highly technical, precise, and include real executable scripts.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { 
              type: Type.INTEGER,
              description: "A metric score from 0 (very carbon-inefficient) to 100 (exemplary green IT posture) auditing the current state."
            },
            summary: { 
              type: Type.STRING,
              description: "A summary analysis paragraph outlining the current baseline efficiency, major bottlenecks, and estimated carbon opportunities."
            },
            recommendations: {
              type: Type.ARRAY,
              description: "Exactly 3 distinct, prioritized, and highly structured technical recommendations.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Concisely worded title for the recommendation." },
                  category: { 
                    type: Type.STRING, 
                    description: "Category of optimization: must be 'energy', 'cloud', or 'ewaste'." 
                  },
                  priority: { 
                    type: Type.STRING, 
                    description: "Level of priority: 'high', 'medium', or 'low'." 
                  },
                  impactDescription: { 
                    type: Type.STRING, 
                    description: "Clear explanation detailing the estimated environmental and financial impact of implementing this change." 
                  },
                  estimatedKwhSavings: { 
                    type: Type.INTEGER, 
                    description: "Estimated annual energy reduction in kWh. Return 0 if the recommendation is purely process/procurement based." 
                  },
                  implementationSteps: {
                    type: Type.ARRAY,
                    description: "Step-by-step instructions to execute this recommendation.",
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "category", "priority", "impactDescription", "estimatedKwhSavings", "implementationSteps"]
              }
            },
            automationScript: {
              type: Type.OBJECT,
              description: "A custom automation script or cron utility matching the organizational needs.",
              properties: {
                language: { type: Type.STRING, description: "The scripting language (e.g. 'python', 'bash', 'powershell')." },
                filename: { type: Type.STRING, description: "An appropriate, clean filename for the script." },
                code: { type: Type.STRING, description: "Full, clean, production-ready, executable scripting code with comments." },
                description: { type: Type.STRING, description: "A summary explaining what the script does and how to deploy/schedule it." }
              },
              required: ["language", "filename", "code", "description"]
            }
          },
          required: ["overallScore", "summary", "recommendations", "automationScript"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Received an empty response from the Gemini API.");
    }

    res.json(JSON.parse(resultText.trim()));
  } catch (error: any) {
    console.error("Gemini Audit Route Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred while generating the sustainability audit report." 
    });
  }
});

// Configure Vite middleware or Static asset hosting depending on node environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Green IT Hub custom server running on http://localhost:${PORT}`);
  });
}

startServer();
