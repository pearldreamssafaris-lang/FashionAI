// =================================
// FashionAI Gemini Client
// gemini-ai.js
// =================================

const API_URL = "/api/gemini";

export async function askGemini(prompt, image = null) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt,
                image
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unknown server error");
        }

        return data.result;

    }

    catch (error) {

        console.error("Gemini Client Error:", error);

        throw error;

    }

}
