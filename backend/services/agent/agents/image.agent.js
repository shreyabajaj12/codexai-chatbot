import axios from "axios"
import { getModel } from "../config/llmModels.js"
import { uploadToS3 } from "./utils/uploadToS3.js"
import { getFromS3 } from "./utils/getFromS3.js"

export const image=async (state) => {
    // try{
    const llm=await getModel("image")
    const res=await llm.invoke(`
        Act as an elite Prompt Engineer specializing in generative AI art models (Midjourney v6, Flux.1, DALL-E 3). Your task is to transform basic user ideas into hyper-detailed, mathematically and artistically structured image prompts.

When I give you a concept, you must analyze it and output a response using this exact schema:

---
###  [CONCEPT TITLE]
**Expanded Narrative:** [A 2-sentence vivid, cinematic description establishing the mood and narrative of the scene]

###  ENGINE 1: FLUX / DALL-E 3 (Natural Language Format)
[Write a dense, descriptive paragraph. Use natural language but highly specific vocabulary. Focus heavily on text rendering requirements if any, spatial layout, material physics, and anatomical correctness. Avoid fluff words like "photorealistic" or "hyper-realistic"; instead, describe the physical textures, skin pores, fabric weaves, and lighting paths that *imply* realism.]

###  ENGINE 2: MIDJOURNEY V6 (Tokenized Format)
[Subject description], [hyper-specific material textures], [exact environment and background elements], [cinematic lighting type, e.g., Rembrandt lighting, volumetric god rays], [camera gear & settings, e.g., shot on Hasselblad H6D-100c, 50mm lens, f/2.8, shutter speed 1/250, ISO 100], [color grading palette, e.g., muted earthy tones, teal and orange anamorphic look] --ar 16:9 --stylize 250 --v 6.0

###  NEGATIVE PROMPT MATRIX
[List 5-7 elements or styles that must be avoided to prevent common AI hallucinations or cliches relevant to this specific image type]
---

Guidelines for your generation:
1. LIGHTING FIRST: Always define the light source, color temperature, and how it interacts with surfaces.
2. NO CLICHES: Do not use generic words like "beautiful," "stunning," or "4K." Use technical terms like "subsurface scattering," "micro-textures," and "chromatic aberration."
3. COMPOSITION: Specify the camera angle (e.g., low-angle hero shot, Dutch angle, macro extreme close-up).

Acknowledge this framework and ask me for my first concept.
Return only the image prompt.
User Request:
        ${state.prompt}
`)
const prompt=res.content.trim()

const imageUrl=`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

const imageRes=await axios.get(imageUrl,{responseType:"arraybuffer"})
const buffer=Buffer.from(imageRes.data)
const filename=`image-${Date.now()}.png`

await uploadToS3(filename,buffer,"image/png")
const downloadUrl=await getFromS3(filename,60*60*24)

return {
  ...state,
  aiResponse: `
✅ Image Generated Successfully

![Generated Image](${downloadUrl})

**Download:** [Click here](${downloadUrl})

> Link expires in 24 hours.
`
}
//     }
//     catch(error){
//         return{
//     ...state,
//     aiResponse:`
//     # Failed to generate image
//     `
// }
    // }
}