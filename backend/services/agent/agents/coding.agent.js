import { getModel } from "../config/llmModels.js"

export const coding = async (state) => {
    const intentLlm = await getModel("intent")
    const llm = await getModel("coding")
    const intentRes = await intentLlm.invoke(`
        you are an intent classifier.

        Reture ONLY one of these values.

        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION
        DEBUGGING
        OPTIMIZATION
        CONVERSION
        DOCUMENTATION

        User Request:
        ${state.prompt}
        `)
    const intent = intentRes.content
    if (intent == "CODE_GENERATION") {
        const prompt = `
           You are an expert frontend developer.

Generate a complete production-ready project.

========================
RESPONSE FORMAT
========================

Return ONLY a single valid JSON object.

Do not output markdown.

Do not output code fences.

Do not output explanations.

Do not output any text before or after the JSON.

The response MUST be parsable by JSON.parse().

========================
JSON SCHEMA
========================

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

========================
IMPORTANT
========================

The value of every "content" field MUST be a valid JSON string.

This means:

- Escape every double quote using \"
- Escape every backslash using \\
- Escape every newline using \n
- Never include raw newlines inside JSON strings.
- Never leave strings unterminated.
- Never output invalid JSON.

Pretend your output will immediately be passed to JSON.parse(). If JSON.parse() would fail, your response is incorrect.

========================
PROJECT RULES
========================

Default technologies:

- HTML
- CSS
- JavaScript

Use React/Vue/Next/Tailwind ONLY if explicitly requested.

========================
HTML
========================

Generate a complete index.html including:

- <!DOCTYPE html>
- html
- head
- body

Reference:

<link rel="stylesheet" href="style.css">

<script src="script.js"></script>

Never inline CSS.

Never inline JavaScript.

========================
CSS
========================

Place all CSS in style.css.

No <style> tags.

Use:

- CSS Variables
- Responsive layout
- Flexbox/Grid
- Modern UI
- Good spacing
- Hover animations

========================
JAVASCRIPT
========================

Place all JavaScript in script.js.

No <script> tags.

No ES modules.

No import/export.

All functions should work immediately.

========================
IMAGES RULES
========================

Always use REAL, publicly accessible image URLs.

Never use placeholder images.

Never use example.com.

Never use localhost URLs.

Never invent image URLs.

Prefer images from:

- https://images.unsplash.com
- https://source.unsplash.com
- https://images.pexels.com
- https://cdn.pixabay.com


========================
FORMATTING RULES
========================

The "content" field of every file MUST preserve the original formatting.

Write code exactly as a developer would write it in a source file.

Requirements:

- Use proper indentation (4 spaces or 2 spaces consistently).
- Preserve all line breaks.
- Every HTML tag should be on its own line.
- Every CSS rule should be on separate lines.
- Every JavaScript statement should be on its own line.
- Do NOT minify code.
- Do NOT compress code into one line.
- Do NOT remove whitespace.
- Generate human-readable source code.
- Escape characters correctly for JSON.

Example:

{
  "name": "script.js",
  "content": "function add(a, b) {\n    return a + b;\n}\n\nconsole.log(add(2, 3));"
}

The generated code should look exactly like a real source file after JSON.parse().

========================
HTML ATTRIBUTES
========================

Always use double quotes for HTML attributes.

Example:

onclick=\"appendToDisplay('7')\"

NOT

onclick='appendToDisplay('7')'

========================
QUALITY
========================

- Complete project
- No TODOs
- No placeholders
- No syntax errors
- Production-ready

User request:

${state.prompt} `
           
        const res = await llm.invoke(prompt)
        const cleaned = res.content
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/i, "")
            .trim();

        const data = JSON.parse(cleaned)
        console.log("Coding Agent Return:", {
            aiResponse: "Code generated successfully",
            artifacts: [
                {
                id: Date.now(),
                type: "Project",
                title: state.prompt,
                files: data.files || []
                }
            ]
            });
        return {
            ...state,
            aiResponse: "Code generated successfully",
            artifacts: [
                {
                    id: Date.now(),
                    type: "Project",
                    files: data.files || [],
                    title:state.prompt
                }
            ]
        }
    }

    const res = await llm.invoke(`
        The user's request is:

        never generate project files.

        use headings like:
        # overview
        # explanation
        # problems
        # improvements
        # best practices
        # optimized code (if needed)

        user request:
        ${state.prompt}
        `)
    const data = res.content


    return {
        ...state,
        aiResponse: data,
        artifacts: []
    }

}