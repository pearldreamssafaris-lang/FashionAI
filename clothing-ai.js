// =================================
// FashionAI Hybrid Clothing Analyzer
// clothing-ai.js
// =================================


import {
    askGemini
}
from "./gemini-ai.js";


import {
    localAnalyze
}
from "./local-fashion-ai.js";




// =================================
// Main Analyzer
// =================================

export async function analyzeClothing(image){


console.log(
"🤖 Hybrid FashionAI Started"
);



// =================================
// 1. Local Fashion AI
// Always works offline
// =================================


let localResult;


try{


localResult =
localAnalyze(image);



console.log(
"LOCAL RESULT:",
localResult
);



}

catch(error){


console.log(
"Local AI error:",
error
);



localResult = {


type:"Unknown",

category:"General Wear",

primaryColor:"Unknown",

secondaryColor:"",

material:"Unknown",

style:"Everyday",

occasion:"Flexible",

matchingItems:[]


};


}







// =================================
// 2. Gemini AI Enhancement
// =================================


try{


const prompt = `

You are FashionAI.

Analyze this clothing image.

Return ONLY JSON.

No markdown.
No explanation.

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





const response =

await askGemini(

prompt,

image

);






// Clean Gemini response

const clean =

response

.replace(
"```json",
""
)

.replace(
"```",
""
)

.trim();





const cloudResult =

JSON.parse(
clean
);





console.log(
"GEMINI RESULT:",
cloudResult
);







// Combine both AI systems

return {


...localResult,


...cloudResult,



analyzedBy:

"Hybrid FashionAI + Gemini"



};






}

catch(error){



console.log(

"⚠️ Gemini unavailable - Using Offline FashionAI"

);





// =================================
// Offline fallback
// =================================


return {


...localResult,


category:

localResult.category ||

"General Wear",



occasion:

localResult.occasion ||

"Flexible",



style:

localResult.style ||

"Everyday",



matchingItems:

localResult.matchingItems ||

[],



analyzedBy:

"Offline Hybrid FashionAI"



};



}



}
