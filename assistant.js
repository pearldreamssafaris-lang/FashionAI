import {
askGemini
}
from "./gemini-ai.js";



const input =
document.getElementById(
"userMessage"
);


const send =
document.getElementById(
"sendBtn"
);


const chat =
document.getElementById(
"chatBox"
);





function addMessage(text,type){


const div =
document.createElement(
"div"
);


div.className =
type;


div.innerHTML =
text;


chat.appendChild(div);


chat.scrollTop =
chat.scrollHeight;


}






send.onclick =
async()=>{


const message =
input.value.trim();



if(!message)
return;



addMessage(

"👤 " + message,

"user-message"

);



input.value="";



addMessage(

"🤖 FashionAI is thinking...",

"ai-message thinking"

);





try{


const reply =
await askGemini(

`
You are FashionAI,
a professional personal stylist.

Answer this fashion question:

${message}

`

);



document
.querySelector(".thinking")
.remove();



addMessage(

"🤖 " + reply,

"ai-message"

);



}


catch(error){



document
.querySelector(".thinking")
.remove();



addMessage(

"🤖 Sorry, I couldn't connect right now.",

"ai-message"

);



}



};
