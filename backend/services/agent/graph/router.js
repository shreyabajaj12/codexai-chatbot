import { getModel } from "../config/llmModels.js"

export const router=async(state)=>{

    if(state.agent && state.agent!=="auto"){
        return {
            ... state,
            agent:state.agent
        }
    }

    const llm = await getModel("router")
    const prompt=`
    you are an agent router.
    available agent
    - chat
    - search
    - pdf
    - coding
    - ppt
    - image

    rules:
    chat:
    general conversation,
    explanantion,
    learning,
    questions.

    search:
    current events,
    latest inforamtion,
    news,
    recent development,
    internet lookup.

    coding:
    generate code,
    debug code,
    build projects,
    architecture,
    API design.

    pdf:
    question about generate PDFs
    or doucument context.

    ppt:
    questions about generate PPTs
    or ppt context

    image:
    generate image,
    ceate image

    return only one word:
    chat
    search
    coding
    pdf
    ppt
    image

    User  Query:
    ${state.prompt}
    `
    const response = await llm.invoke(prompt)

    return {
        ... state,
        agent:response.content.trim().toLowerCase()
    }
}