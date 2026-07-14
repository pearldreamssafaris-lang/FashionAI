// =================================
// FashionAI Hybrid Upload System
// upload.js
// =================================

console.log("✅ Upload JS loaded");



import {
saveClothing
}
from "./database.js";



import {
analyzeClothing
}
from "./clothing-ai.js";





// ================================
// Elements
// ================================


const imageInput =
document.getElementById(
"imageInput"
);



const preview =
document.getElementById(
"preview"
);



const analyzeBtn =
document.getElementById(
"analyzeBtn"
);



const resultCard =
document.getElementById(
"resultCard"
);



const result =
document.getElementById(
"result"
);



const saveBtn =
document.getElementById(
"saveBtn"
);







let selectedImage = null;

let clothingData = null;







// ================================
// Image Preview
// ================================


imageInput.addEventListener(
"change",
()=>{


const file =
imageInput.files[0];



if(!file)
return;



selectedImage=file;



const reader =
new FileReader();



reader.onload=(event)=>{


preview.src =
event.target.result;


preview.style.display =
"block";


};



reader.readAsDataURL(file);



});










// ================================
// Hybrid AI Analysis
// ================================


analyzeBtn.addEventListener(
"click",
async()=>{


if(!selectedImage){


alert(
"Please select a clothing image 👗"
);


return;


}




analyzeBtn.innerHTML =

"🤖 FashionAI analyzing...";



analyzeBtn.disabled=true;






try{


const reader =
new FileReader();



reader.onload=async(event)=>{


const image =
event.target.result;




// Hybrid AI
// Local + Gemini


clothingData =

await analyzeClothing(
image
);






resultCard.style.display =
"block";





result.innerHTML = `


<h3>
✨ FashionAI Result
</h3>


<p>
👕 <b>Type:</b>
${clothingData.type || "Unknown"}
</p>


<p>
📂 <b>Category:</b>
${clothingData.category || "General Wear"}
</p>


<p>
🎨 <b>Primary Color:</b>
${clothingData.primaryColor || "Unknown"}
</p>


<p>
🎨 <b>Secondary Color:</b>
${clothingData.secondaryColor || "None"}
</p>


<p>
🧵 <b>Material:</b>
${clothingData.material || "Unknown"}
</p>


<p>
✨ <b>Style:</b>
${clothingData.style || "Unknown"}
</p>


<p>
🎯 <b>Occasion:</b>
${clothingData.occasion || "Flexible"}
</p>



<p>
🤖 <b>Analyzed By:</b>
${clothingData.analyzedBy || "Hybrid FashionAI"}
</p>


`;





analyzeBtn.innerHTML =

"🤖 Analyze With FashionAI";


analyzeBtn.disabled=false;



};



reader.readAsDataURL(
selectedImage
);



}

catch(error){


console.error(
"Upload Error:",
error
);



resultCard.style.display =
"block";



result.innerHTML =

`
❌ FashionAI could not analyze this image.
Please try again.
`;



analyzeBtn.innerHTML =

"🤖 Analyze With FashionAI";


analyzeBtn.disabled=false;


}



});









// ================================
// Save To IndexedDB Wardrobe
// ================================


saveBtn.addEventListener(
"click",
async()=>{


if(!clothingData){


alert(
"Analyze the clothing first 👗"
);


return;


}





try{


const wardrobeItem = {


...clothingData,



// Save image

image:selectedImage,



// Ensure sorting fields exist

category:

clothingData.category ||
"General Wear",



occasion:

clothingData.occasion ||
"Flexible",



style:

clothingData.style ||
"Everyday",



matchingItems:

clothingData.matchingItems ||
[],



// Date saved

createdAt:

new Date().toISOString()


};





await saveClothing(
wardrobeItem
);





alert(
"❤️ Saved to FashionAI Wardrobe"
);





console.log(
"Saved:",
wardrobeItem
);



}





catch(error){


console.error(
"Save Error:",
error
);



alert(
"❌ Could not save clothing"
);



}



});
