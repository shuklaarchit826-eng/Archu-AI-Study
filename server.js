import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Archu AI Study Backend is running");
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-6-luna",
      input: [
        {
          role: "system",
          content:
            "You are Archu AI Study, a helpful educational AI. Explain answers clearly and safely for students."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI answer could not be generated"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Archu AI Study server running on port ${PORT}`);
});
