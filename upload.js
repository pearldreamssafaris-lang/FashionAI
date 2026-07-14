// =================================
// FashionAI Upload System
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




// Elements

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




// Storage

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
// Analyze Clothing
// ================================


analyzeBtn.addEventListener(
"click",
async()=>{


if(!selectedImage){


alert(
"Please choose a clothing photo first 👗"
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



clothingData =
await analyzeClothing(
image
);




resultCard.style.display =
"block";





result.innerHTML = `


<div>

👕 <b>Type:</b>

${clothingData.type || "Unknown"}

</div>


<br>


<div>

🎨 <b>Color:</b>

${clothingData.primaryColor || "Unknown"}

</div>



<br>


<div>

🧵 <b>Material:</b>

${clothingData.material || "Unknown"}

</div>



<br>


<div>

✨ <b>Style:</b>

${clothingData.style || "Unknown"}

</div>



<br>


<div>

🎯 <b>Occasion:</b>

${clothingData.occasion || "Unknown"}

</div>


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
error
);



resultCard.style.display=
"block";



result.innerHTML=

`
❌ AI could not analyze this image.

Please try again.
`;



analyzeBtn.innerHTML =

"🤖 Analyze With FashionAI";


analyzeBtn.disabled=false;


}



});







// ================================
// Save To Wardrobe
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


await saveClothing({

...clothingData,

image:selectedImage

});



alert(
"❤️ Saved successfully to your wardrobe"
);



}


catch(error){


console.error(error);


alert(
"Could not save clothing"
);


}



});
