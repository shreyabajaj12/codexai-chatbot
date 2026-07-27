import { getModel } from "../config/llmModels.js"

export const chat=async (state) => {
    const llm =await getModel("chat")
    const systemPrompt =`you are codexai, an intelligent ai assistant.

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
    const response =await llm.invoke([{
        "role":"system",
        "content":systemPrompt
    },
    {
        "role":"human",
        "content":state.prompt
    }
])

    return {
        ...state,
        aiResponse: response.content
    }
}