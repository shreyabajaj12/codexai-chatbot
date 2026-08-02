import { addMessage } from "../config/memory.js";
import { graph } from "../graph/graph.js"
import axios from "axios";

export const agent =async (req ,res)=>{
    try {
        const {prompt,conversationId,agent}=req.body
        
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"user",content:prompt
        })
        const result=await graph.invoke({
            prompt,conversationId,agent
        })
        console.log(result)
        const response =result?.aiResponse
        await addMessage(conversationId,"user",prompt)
        await addMessage(conversationId,"assistant",response)
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"assistant",content:response,images:result?.images,artifacts:result?.artifacts
        })
        return res.status(200).json({
            answer: response,
            images:result?.images,
            artifacts:result?.artifacts
        })
    } catch (error) {
console.error(error);
    return res.status(500).json({
        message: error.message,
    });    }
}