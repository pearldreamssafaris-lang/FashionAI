// ======================================
// FashionAI Wardrobe Page
// Wardrobe.js
// ======================================


import {

loadWardrobe,

searchClothes,

filterByCategory

}

from "./wardrobe-manager.js";





const grid =

document.getElementById(
"wardrobeGrid"
);



const search =

document.getElementById(
"searchWardrobe"
);




let clothes=[];





// ================================
// Load Wardrobe
// ================================


async function startWardrobe(){


clothes =

await loadWardrobe();



displayClothes(
clothes
);



}







// ================================
// Display Clothes
// ================================


function displayClothes(items){



grid.innerHTML="";




if(items.length===0){


grid.innerHTML=`

<p>
Your wardrobe is empty 👗
</p>

`;

return;

}





items.forEach(item=>{



const card =

document.createElement(
"div"
);



card.className =

"wardrobe-item";





card.innerHTML=

`

<div class="clothing-icon">

👗

</div>



<h3>

${item.type || "Clothing"}

</h3>



<p>

🎨 ${item.primaryColor || "Unknown"}

</p>



<p>

✨ ${item.style || "Unknown"}

</p>



<p>

📂 ${item.category || "General Wear"}

</p>



<span>

🎯 ${item.occasion || "Flexible"}

</span>


`;





grid.appendChild(card);



});



}








// ================================
// Search
// ================================


search.addEventListener(

"input",

()=>{


const results =

searchClothes(
search.value
);



displayClothes(
results
);



});








// ================================
// Category Buttons
// ================================


// Example:
// add buttons with these IDs:
// officeBtn
// casualBtn
// partyBtn


const categories = {


officeBtn:"Office Wear",

casualBtn:"Casual Wear",

partyBtn:"Party Wear",

travelBtn:"Travel Wear",

eventBtn:"Event Wear"


};




Object.keys(categories)
.forEach(button=>{


const element =

document.getElementById(
button
);



if(element){


element.onclick=()=>{


displayClothes(

filterByCategory(

categories[button]

)

);


};


}



});








// ================================
// Outfit Generator
// ================================


document

.getElementById(
"generateBtn"
)

.onclick=()=>{


window.location.href=

"outfits.html";


};








startWardrobe();
