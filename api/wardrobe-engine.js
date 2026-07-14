// ======================================
// FashionAI Wardrobe Sorter
// ======================================


export function sortClothing(item){


const text =
item.toLowerCase();



if(
text.includes("suit") ||
text.includes("blazer") ||
text.includes("shirt") ||
text.includes("trouser") ||
text.includes("formal")
){

return {

category:"Office Wear",

icon:"💼",

occasion:"Work / Business"

};

}



if(
text.includes("dress") ||
text.includes("gown") ||
text.includes("heels") ||
text.includes("jewelry")
){

return {

category:"Event Wear",

icon:"💍",

occasion:"Wedding / Party"

};

}



if(
text.includes("jeans") ||
text.includes("tshirt") ||
text.includes("sneaker") ||
text.includes("hoodie")
){

return {

category:"Casual Wear",

icon:"🌿",

occasion:"Daily Wear"

};

}



if(
text.includes("jacket") ||
text.includes("coat") ||
text.includes("boots")
){

return {

category:"Travel Wear",

icon:"✈️",

occasion:"Travel"

};

}



return {

category:"General Wear",

icon:"👗",

occasion:"Flexible"

};


}
