// ======================================
// FashionAI Wardrobe Sorting Engine
// api/wardrobe-engine.js
// ======================================


export function sortClothing(description = "") {


const text =
description.toLowerCase();



let result = {


category:"General Wear",

occasion:"Flexible",

style:"Everyday"

};





// Office

if(
text.includes("blazer") ||
text.includes("suit") ||
text.includes("formal") ||
text.includes("shirt") ||
text.includes("trouser") ||
text.includes("business") ||
text.includes("office")
){

result = {

category:"Office Wear",

occasion:"Work / Business",

style:"Professional"

};

}





// Wedding/Event

else if(
text.includes("gown") ||
text.includes("dress") ||
text.includes("heels") ||
text.includes("elegant") ||
text.includes("wedding") ||
text.includes("ceremony")
){

result = {

category:"Event Wear",

occasion:"Wedding / Special Event",

style:"Elegant"

};

}





// Casual

else if(
text.includes("jeans") ||
text.includes("t-shirt") ||
text.includes("tshirt") ||
text.includes("hoodie") ||
text.includes("sneaker") ||
text.includes("casual")
){

result = {

category:"Casual Wear",

occasion:"Daily Wear",

style:"Relaxed"

};

}





// Travel

else if(
text.includes("jacket") ||
text.includes("coat") ||
text.includes("boots") ||
text.includes("travel")
){

result = {

category:"Travel Wear",

occasion:"Travel",

style:"Comfortable"

};

}





// Sport

else if(
text.includes("sport") ||
text.includes("gym") ||
text.includes("shorts") ||
text.includes("leggings")
){

result = {

category:"Sport Wear",

occasion:"Exercise",

style:"Active"

};

}





// Party

else if(
text.includes("party") ||
text.includes("night") ||
text.includes("club") ||
text.includes("glitter")
){

result = {

category:"Party Wear",

occasion:"Entertainment",

style:"Glamorous"

};

}





return result;


}
