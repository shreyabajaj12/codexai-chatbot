import { ChatGroq } from "@langchain/groq"
import { ChatGoogle } from "@langchain/google";
import dotenv from "dotenv"
import { ChatOpenRouter } from "@langchain/openrouter";


dotenv.config()
console.log("api key", process.env.GROQ_API_KEY)
const groq = new ChatGroq({
    
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
})
const gemini = new ChatGoogle("gemini-2.5-flash");
const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens:2500
});

export const getModel=async(agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        
        case "search":
            return groq;
        
        case "coding":
            return openRouter;

        case "search":
            return groq;

        default:
            return groq;
    }
}
