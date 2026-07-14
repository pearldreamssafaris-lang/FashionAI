// ======================================
// FashionAI Hybrid Gemini API
// api/gemini.js
// ======================================

import { 
generateFashionAdvice 
} from "./fashion-engine.js";


import {
sortClothing
} from "./wardrobe-engine.js";





export default async function handler(req,res){



console.log("METHOD:",req.method);

console.log("BODY:",req.body);




if(req.method !== "POST"){


return res.status(405).json({

error:"Only POST requests allowed"

});


}





try{


const {

prompt,

image

}=req.body || {};





if(!prompt){


return res.status(400).json({

error:"Missing prompt"

});


}






// ================================
// Offline mode if no key
// ================================


if(!process.env.GEMINI_API_KEY){


return res.status(200).json({

result:
fashionFallback(prompt)

});


}





const fashionPlan =

generateFashionAdvice(prompt);






const parts=[


{

text:

`
You are FashionAI.

You are a professional personal stylist.

Fashion plan:

${fashionPlan}


Customer question:

${prompt}


Give a beautiful personalized fashion answer.

Include:
- outfit ideas
- colors
- accessories
- shoes
- styling tips

`

}


];







// Image support


if(image){


const base64Image =

image.replace(

/^data:image\/\w+;base64,/,

""

);




const mimeType =

image.match(

/^data:(.*?);base64/

)?.[1]

||

"image/jpeg";





parts.push({


inlineData:{


mimeType,

data:base64Image


}


});


}








// ================================
// Gemini Request
// ================================


const geminiResponse =

await fetch(

"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="

+

process.env.GEMINI_API_KEY,

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},



body:JSON.stringify({


contents:[

{

parts

}

]


})


}



);








const data =

await geminiResponse.json();





console.log(

"GEMINI STATUS:",

geminiResponse.status

);





console.log(

"GEMINI RESPONSE:",

data

);









// ================================
// Gemini failed
// Use offline FashionAI
// ================================


if(!geminiResponse.ok){



return res.status(200).json({

result:

fashionFallback(prompt)

});


}









const result =

data
?.candidates?.[0]
?.content?.parts?.[0]
?.text;






let wardrobe=null;



if(image){


wardrobe =

sortClothing(

result || prompt

);


}







return res.status(200).json({

result:

result ||

fashionFallback(prompt),


wardrobe


});






}

catch(error){


console.error(

"SERVER ERROR:",

error

);



return res.status(200).json({

result:

fashionFallback(prompt)

});


}



}









// ======================================
// FashionAI Offline Knowledge Engine
// ======================================


function fashionFallback(prompt=""){



const question =

prompt.toLowerCase();






if(

question.includes("office") ||

question.includes("work") ||

question.includes("interview")

){


return `

💼 FashionAI Office Style:


👩 Women:

• Blazer
• Elegant blouse
• Tailored trousers
• Pencil skirt
• Closed heels


👨 Men:

• Shirt
• Formal trousers
• Blazer
• Formal shoes


Colors:

🤎 Beige

💙 Navy

🖤 Black

🤍 White


Look professional and confident.

`;

}





if(

question.includes("wedding") ||

question.includes("ceremony")

){


return `

💍 FashionAI Wedding Style:


Choose:

👗 Elegant dress

✨ Satin or silk

💎 Jewelry

👠 Beautiful heels


Colors:

Gold

Champagne

Blue

Pink

Emerald


Be elegant and comfortable.

`;

}







if(

question.includes("party") ||

question.includes("birthday")

){


return `

✨ FashionAI Party Look:


Try:

👗 Statement dress

💎 Accessories

👠 Heels

👜 Stylish handbag


Colors:

Black

Gold

Red

Silver

`;

}







if(

question.includes("casual") ||

question.includes("daily") ||

question.includes("weekend")

){


return `

🌿 FashionAI Casual Style:


Try:

👕 Comfortable top

👖 Jeans

👟 Sneakers

👜 Simple accessories


Style:

Relaxed but fashionable.

`;

}








if(

question.includes("wear") ||

question.includes("outfit") ||

question.includes("dress")

){


return `

👗 FashionAI Outfit Suggestion:


Tell me:

• Occasion
• Weather
• Your preferred style


I can create:

💼 Office outfits

💍 Wedding outfits

✨ Party looks

🌿 Casual styles

✈️ Travel outfits

`;

}






return `

🤖 FashionAI:


I am still learning that style question.


I can help with:

👗 Outfit ideas

💼 Office wear

💍 Weddings

✨ Parties

🎨 Color matching

👠 Shoes

💎 Accessories


Try:

"What should I wear to work?"

"How do I style a black dress?"

`;

}
