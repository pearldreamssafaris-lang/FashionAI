// =================================
// FashionAI Gemini Connection
// =================================


const WORKER_URL =
"https://YOUR-WORKER-URL.workers.dev/";



export async function askGemini(prompt,image=null){


try{


const body={

prompt:prompt

};



// Add image if available

if(image){


body.image=image;


}



const response =
await fetch(
WORKER_URL,
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:
JSON.stringify(body)

}

);



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


console.log(
"FashionAI Error:",
error
);


throw error;


}


}
