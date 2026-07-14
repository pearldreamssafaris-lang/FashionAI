import {
saveWardrobe
}
from "./indexedDB.js";



export async function addClothing(item){


await saveWardrobe({

name:item.name,

category:item.category,

color:item.color,

occasion:item.occasion,

image:item.image


});


console.log(
"Saved to FashionAI wardrobe"
);


}
