import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chat } from "../agents/chat.agent.js";
import { ppt } from "../agents/ppt.agent.js";
import { coding } from "../agents/coding.agent.js";
import { pdf } from "../agents/pdf.agent.js";
import { image } from "../agents/image.agent.js";
import { search } from "../agents/search.agent.js";

const workflow =new StateGraph(agentState)
workflow.addNode("router",router)
workflow.addNode("chat",chat)
workflow.addNode("search",search)
workflow.addNode("ppt",ppt)
workflow.addNode("pdf",pdf)
workflow.addNode("coding",coding)
workflow.addNode("image",image)
workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent) {
        case "chat":
            return "chat";

        case "search":
            return "search";
        
        case "pdf":
            return "pdf";

        case "ppt":
            return "ppt" ;

        case "coding":
            return "coding";

        case "image":
            return "image";

        default:
            return "chat";
    }
},{
    chat:"chat",
    search:"search",
    coding:"coding",
    pdf:"pdf",
    ppt:"ppt",
    image:"image"
})
workflow.addEdge("search","chat")
workflow.addEdge("chat", "__end__")
workflow.addEdge("ppt", "__end__")
workflow.addEdge("pdf", "__end__")
workflow.addEdge("coding", "__end__")
workflow.addEdge("image", "__end__")

export const graph=workflow.compile();
