import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyDr8jViz2kBKnbr0DpYGZlthCPW7d_J_Po";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function run() {
  try {
    const result = await model.generateContent("Hello, world!");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
