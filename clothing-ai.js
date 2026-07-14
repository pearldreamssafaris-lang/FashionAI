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
// Analyze Clothing Image
// =================================


export async function analyzeClothing(image){



// 1. Offline analysis first

let localResult = {

type:"Unknown",

category:"General Wear",

primaryColor:"Unknown",

secondaryColor:"Unknown",

material:"Unknown",

style:"Unknown",

occasion:"Flexible",

matchingItems:[]

};



try{


localResult =
localAnalyze(image)
||
localResult;


}

catch(error){


console.log(
"Local AI unavailable"
);


}






// 2. Gemini Enhancement


const prompt = `

You are FashionAI, a professional clothing stylist.

Analyze this clothing image.

Return ONLY valid JSON.

Do not add markdown.

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


Category must be one of:

Office Wear
Casual Wear
Event Wear
Party Wear
Travel Wear
Sport Wear
General Wear


`;





try{


const aiResult =

await askGemini(
prompt,
image
);





const cloudResult =

typeof aiResult === "string"

?

JSON.parse(aiResult)

:

aiResult;






return {


...localResult,


...cloudResult,


analyzedBy:

"Hybrid FashionAI"



};




}

catch(error){



console.log(

"Using Offline FashionAI"

);




return {


...localResult,


analyzedBy:

"Offline FashionAI"


};



}


}
