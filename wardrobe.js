// =================================
// FashionAI Wardrobe Display
// Wardrobe.js
// =================================


import {
getWardrobe
}
from "./database.js";



import {
organizeClothing
}
from "./wardrobe-engine.js";




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
// Load wardrobe
// ================================


async function loadWardrobe(){


try{


clothes =
await getWardrobe();



displayClothes(
clothes
);



}

catch(error){


console.error(
"Cannot load wardrobe:",
error
);



}


}









// ================================
// Display clothes
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



const category =

organizeClothing(item);





const card =

document.createElement(
"div"
);



card.className =
"wardrobe-item";





card.innerHTML = `


<div class="clothing-icon">

👕
</div>



<h3>

${item.type || "Clothing"}

</h3>



<p>

🎨 Color:

${item.primaryColor || "Unknown"}

</p>



<p>

✨ Style:

${item.style || "Unknown"}

</p>



<p>

📂 Category:

${category.category}

</p>



<span>

🎯 ${category.occasion}

</span>


`;





grid.appendChild(card);



});



}








// ================================
// Search wardrobe
// ================================


search.addEventListener(

"input",

()=>{


const value =

search.value.toLowerCase();




const filtered =

clothes.filter(item =>


JSON.stringify(item)

.toLowerCase()

.includes(value)


);



displayClothes(
filtered
);



});







// ================================
// Generate Outfit
// ================================


document
.getElementById(
"generateBtn"
)
.onclick=()=>{


window.location.href =
"outfits.html";


};








loadWardrobe();
