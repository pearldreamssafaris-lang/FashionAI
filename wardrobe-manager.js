// ======================================
// FashionAI Hybrid Wardrobe Manager
// ======================================


import {

getWardrobe,

saveClothing,

deleteClothing

}

from "./database.js";



import {

analyzeClothing

}

from "./clothing-ai.js";





let wardrobe=[];





// Load wardrobe from IndexedDB

export async function loadWardrobe(){


wardrobe =
await getWardrobe();


return wardrobe;


}







// Add clothing using Hybrid AI

export async function addClothing(image){



const analysis =

await analyzeClothing(image);





const item={


...analysis,


image:image,


createdAt:

new Date().toISOString()


};





await saveClothing(item);



return item;


}







// Search wardrobe

export function searchClothes(
keyword=""
){


return wardrobe.filter(item=>


JSON.stringify(item)

.toLowerCase()

.includes(

keyword.toLowerCase()

)


);


}







// Filter by AI category

export function filterByCategory(
category
){


return wardrobe.filter(item=>


item.category === category


);


}







// Get clothes for occasion

export function clothesForOccasion(
occasion
){


return wardrobe.filter(item=>


item.occasion
?.toLowerCase()
.includes(

occasion.toLowerCase()

)


);


}







// Delete clothing

export async function removeClothing(id){


await deleteClothing(id);



wardrobe =

wardrobe.filter(

item=>item.id!==id

);


}







// Generate outfit

export function generateOutfit(
occasion
){



const clothes =

clothesForOccasion(
occasion
);



return {


occasion,


items:

clothes.slice(0,3),


message:

`FashionAI created a ${occasion} outfit`

};


}
