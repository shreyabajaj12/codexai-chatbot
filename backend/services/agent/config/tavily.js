import {TavilySearch} from "@langchain/tavily"

export const searchTool = new TavilySearch({
    max_results:5,
    topic:"general",
   includeImages:true
});