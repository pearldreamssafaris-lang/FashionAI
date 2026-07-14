// FashionAI Wardrobe Manager
// Controls searching, filtering, favorites, editing and deleting


import {

getAllClothes,
deleteClothing,
updateClothing

}

from "./local-database.js";





let wardrobe = [];





// ===============================
// Load wardrobe from phone database
// ===============================

export async function loadWardrobe(){


wardrobe =
await getAllClothes();


return wardrobe;


}






// ===============================
// Get current wardrobe
// ===============================

export function getWardrobe(){


return wardrobe;


}






// ===============================
// Search wardrobe
// ===============================

export function searchWardrobe(keyword){


if(!keyword){

return wardrobe;

}



keyword =
keyword.toLowerCase();



return wardrobe.filter(item=>{


return (

item.category?.toLowerCase()
.includes(keyword)


||

item.color?.toLowerCase()
.includes(keyword)


||

item.style?.toLowerCase()
.includes(keyword)


||

item.material?.toLowerCase()
.includes(keyword)


||

item.season?.toLowerCase()
.includes(keyword)


||

item.occasion?.toLowerCase()
.includes(keyword)

);


});


}







// ===============================
// Filter wardrobe
// ===============================

export function filterWardrobe(filters){


return wardrobe.filter(item=>{


let match = true;



if(filters.category){


match =
match &&
item.category?.toLowerCase()
===
filters.category.toLowerCase();


}




if(filters.color){


match =
match &&
item.color?.toLowerCase()
===
filters.color.toLowerCase();


}





if(filters.style){


match =
match &&
item.style?.toLowerCase()
===
filters.style.toLowerCase();


}





if(filters.favorite){


match =
match &&
item.favorite === true;


}



return match;


});


}







// ===============================
// Toggle favorite
// ===============================

export async function toggleFavorite(id){


const item =
wardrobe.find(
clothing=>clothing.id===id
);



if(!item){

return;

}



item.favorite =
!item.favorite;



await updateClothing(
id,
{

favorite:item.favorite

}

);



return item;


}








// ===============================
// Get favorites
// ===============================

export function getFavorites(){


return wardrobe.filter(item=>

item.favorite === true

);


}








// ===============================
// Edit clothing
// ===============================

export async function editClothing(
id,
changes
){


const updated =
await updateClothing(
id,
changes
);



wardrobe =
wardrobe.map(item=>{


if(item.id===id){


return updated;


}


return item;


});



return updated;


}








// ===============================
// Delete clothing
// ===============================

export async function removeClothing(id){


await deleteClothing(id);



wardrobe =
wardrobe.filter(item=>

item.id !== id

);



return true;


}








// ===============================
// Wardrobe Statistics
// ===============================

export function getWardrobeStats(){



const stats={


total: wardrobe.length,


favorites:
wardrobe.filter(
item=>item.favorite
).length,


colors:{},


categories:{}


};





wardrobe.forEach(item=>{


if(item.color){


stats.colors[item.color] =
(stats.colors[item.color] || 0)+1;


}



if(item.category){


stats.categories[item.category] =
(stats.categories[item.category] || 0)+1;


}



});





return stats;


}
