// =================================
// FashionAI Hybrid Analyzer
// =================================


import {
askGemini
}
from "./gemini-ai.js";


import {
localAnalyze
}
from "./local-fashion-ai.js";




export async function analyzeClothing(image){



// 1. Local analysis first

const localResult =
localAnalyze(image);





// 2. Cloud AI enhancement


const prompt = `

You are FashionAI.

Analyze this clothing image.

Return ONLY JSON.

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



try{


const aiResult =
await askGemini(
prompt,
image
);



const cloudResult =
JSON.parse(
aiResult
);



// Combine results

return {


...localResult,


...cloudResult,


analyzedBy:
"Hybrid FashionAI"


};



}

catch(error){


// If internet fails,
// use offline result


return {


...localResult,


type:"Unknown",

primaryColor:"Unknown",

style:"Unknown",

analyzedBy:
"Offline FashionAI"


};


}


}
