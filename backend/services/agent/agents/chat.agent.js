import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"

export const chat = async (state) => {
    const llm = await getModel("chat")
    const history = await getMemory(state.conversationId)

    const searchContext =state.searchResults?`
    "Web Search Results:
    ${JSON.stringify(state.searchResults)}`:""

    const systemPrompt = `you are codexai, an intelligent ai assistant.
    ${searchContext}

    If searchContext exists:
    - use search results to answer.
    - do not mention internal tools.

    Rules:
    - for simple questions, greetings, and short queries, respond naturally in plain text.
    - for technical, education, coding, or detailed topics, use clean Markdown.
    
    Formatting:
    - use # for the titles and ## for the sections.
    - leave a blank line after headings.
    - use bullet points for lists.
    - use numbered lists fro steps.
    - use fenced code blocks with language tags for code.
    - keep paragraphs short and readable.
    - never write headings and content on the same line.
    - never generate large walls of text.
    
    `
    const messages = [
        new SystemMessage(systemPrompt)

    ]
    if (history) {
        console.log(JSON.stringify(history, null, 2));
        history.forEach(msg => {
            if (msg.role == "user") {
                messages.push(new HumanMessage(msg.content))
            }
            else {
                messages.push(new AIMessage(msg.content))
            }
        })
    }
    messages.push(new HumanMessage(state.prompt))
    console.log(messages)

    const response = await llm.invoke(messages)

    return {
        ...state,
        aiResponse: response.content
    }
}