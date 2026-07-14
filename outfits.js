// ======================================
// FashionAI Clothing AI Analyzer
// clothing-ai.js
// ======================================


import {
    askGemini
}
from "./gemini-ai.js";





export async function analyzeClothing(image){


    const prompt = `

You are FashionAI, a professional fashion stylist.

Analyze this clothing image.

Return ONLY valid JSON.

Do not use markdown.
Do not add explanations.

Use exactly this format:

{
"type":"",
"category":"",
"primaryColor":"",
"secondaryColor":"",
"material":"",
"style":"",
"occasion":"",
"matchingItems":[]
}

`;




    try {



        const response = await askGemini(
            prompt,
            image
        );




        // Remove possible markdown if Gemini adds it

        const cleanResponse =
        response
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();





        const clothingData =
        JSON.parse(cleanResponse);





        return {


            ...clothingData,


            analyzedBy:
            "FashionAI Gemini Vision"


        };




    }



    catch(error){


        console.error(
            "Clothing AI Error:",
            error
        );



        return {


            type:"Unknown",

            category:"Unknown",

            primaryColor:"Unknown",

            secondaryColor:"Unknown",

            material:"Unknown",

            style:"Unknown",

            occasion:"Unknown",

            matchingItems:[],


            analyzedBy:
            "AI Error"


        };



    }


}
