import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// For the sake of simplicity, we'll store the conversation in memory
// In a production app, you'd want to store this in a database
let sessionConversations = {};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed, please use POST" });
  }

  try {
    const prompt = req.body.prompt;
    const sessionId = req.body.sessionId;

    let messages = [
      {
        role: "system",
        content:
          "You are an Arabic language grammar explainer. Based on the user's questions and responses, clarify Arabic grammar concepts at their current level of understanding. Start with foundational grammar rules and gradually introduce more complex topics as the user shows comprehension. Provide explanations on grammar structures, highlight key rules, and offer guidance on improving Arabic grammar proficiency.",
      },
    ];

    if (sessionId && sessionConversations[sessionId]) {
      messages = [...sessionConversations[sessionId]];
    }

    messages.push({ role: "user", content: prompt });
    sessionConversations[sessionId] = messages;

    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const botMessage = gptResponse.data.choices[0].message.content;
    sessionConversations[sessionId].push({
      role: "assistant",
      content: botMessage,
    });

    return res.status(200).json({
      message: "Success",
      response: botMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
