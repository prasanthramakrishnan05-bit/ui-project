import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `You are a UI generator.
Only return JSX.
User request: ${prompt}`
    });

    const text =
      response.output?.[0]?.content?.[0]?.text || "No output";

    res.json({ code: text });

  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});