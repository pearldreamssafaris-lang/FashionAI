import {
getWardrobe
}
from "./database.js";



const grid =
document.getElementById(
"wardrobeGrid"
);



const search =
document.getElementById(
"searchWardrobe"
);



let clothes=[];




// Load wardrobe

async function loadWardrobe(){


clothes =
await getWardrobe();


displayClothes(
clothes
);


}





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



card.innerHTML=`

<div class="clothing-icon">

👕
</div>


<h3>
${item.type || "Clothing"}
</h3>


<p>
${item.primaryColor || ""}
</p>


<span>
${item.style || "Style"}
</span>


`;



grid.appendChild(card);


});


}






// Search


search.addEventListener(
"input",
()=>{


const value =
search.value.toLowerCase();



const filtered =
clothes.filter(item=>

JSON.stringify(item)
.toLowerCase()
.includes(value)

);



displayClothes(
filtered
);


});





// Outfit Generator button

document
.getElementById("generateBtn")
.onclick=()=>{


window.location.href=
"outfits.html";


};





loadWardrobe();
