// =================================
// FashionAI Gemini Connection
// Vercel Version
// =================================


const GEMINI_URL = "/api/gemini";



export async function askGemini(prompt, image=null){


try{


const body = {

prompt: prompt

};



// Add image if available

if(image){

body.image = image;

}




const response = await fetch(
GEMINI_URL,
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body: JSON.stringify(body)

}

);





if(!response.ok){

throw new Error(
"Gemini API Error: " + response.status
);

}





const data =
await response.json();





if(data.error){

throw new Error(
data.error
);

}





return data.result;



}

catch(error){


console.error(
"FashionAI Error:",
error
);


throw error;


}


}
