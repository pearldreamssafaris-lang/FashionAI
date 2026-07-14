// =================================
// FashionAI Gemini Connection
// =================================

const WORKER_URL =
"https://fashion-ai-silk.vercel.app/api/gemini";


export async function askGemini(prompt, image=null){


try{


const body = {

prompt: prompt

};



if(image){

body.image = image;

}



const response = await fetch(

WORKER_URL,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

}

);



const data = await response.json();



if(data.error){

throw new Error(data.error);

}



return data.result;



}

catch(error){

console.log(
"FashionAI Error:",
error
);


throw error;

}


}
