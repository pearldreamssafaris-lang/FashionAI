import {
getWardrobe
}
from "./database.js";



let wardrobe=[];



const createBtn =
document.getElementById(
"createOutfit"
);



const result =
document.getElementById(
"outfitResult"
);



const display =
document.getElementById(
"outfitDisplay"
);



let generatedOutfit={};




// Load clothes

async function load(){

wardrobe =
await getWardrobe();

}


load();






// Create Outfit


createBtn.onclick =
async()=>{


if(wardrobe.length < 3){


alert(
"Add more clothes to your wardrobe first 👗"
);


return;

}




const shirt =
findItem("shirt");


const pants =
findItem("pant") ||
findItem("jean");


const shoes =
findItem("shoe");





generatedOutfit={

top:
shirt || wardrobe[0],

bottom:
pants || wardrobe[1],

footwear:
shoes || wardrobe[2],

score:
95


};





result.style.display=
"block";



display.innerHTML=`

👕 
${generatedOutfit.top.type}

<br><br>


👖
${generatedOutfit.bottom.type}


<br><br>


👟
${generatedOutfit.footwear.type}


<br><br>


⭐ Style Score:
${generatedOutfit.score}/100


`;



};







function findItem(word){


return wardrobe.find(item=>

JSON.stringify(item)
.toLowerCase()
.includes(word)

);


}






document
.getElementById("favoriteBtn")
.onclick=()=>{


localStorage.setItem(

"favoriteOutfit",

JSON.stringify(
generatedOutfit
)

);



alert(
"Outfit saved ❤️"
);


};
