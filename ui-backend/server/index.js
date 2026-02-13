import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL:"https:/api.groq.com/openai/v1",
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "user",
      content: `You are a UI generator. Only return JSX.
      User request: ${prompt}`
    }
  ],
});

    const text =
      response.choices[0].message.content;

    res.json({ code: text });

  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});