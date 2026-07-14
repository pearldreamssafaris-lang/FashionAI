// =================================
// FashionAI Home Controller
// home.js
// =================================


// Greeting

const greeting =
document.getElementById("greeting");


const hour =
new Date().getHours();


if(hour < 12){

greeting.innerHTML =
"Good Morning ☀️";

}

else if(hour < 18){

greeting.innerHTML =
"Good Afternoon 🌤";

}

else{

greeting.innerHTML =
"Good Evening 🌙";

}





// =================================
// Quick Actions Navigation
// =================================


document
.querySelectorAll(".action")
.forEach(action=>{


action.addEventListener(
"click",
()=>{


const page =
action.dataset.page;


window.location.href =
page;


});


});





// =================================
// Daily Fashion Quote
// =================================


const quotes=[


"Style is confidence you can wear.",


"Fashion changes, but your style remains.",


"Your outfit tells your story.",


"Elegance begins with confidence.",


"Beautiful clothes create beautiful moments."


];



const today =
new Date()
.getDate();



const quote =
document.getElementById("quote");



quote.innerHTML =
`"${quotes[today % quotes.length]}"`;






// =================================
// Bottom Navigation
// =================================


const navButtons =
document.querySelectorAll(
".bottom-nav button"
);



navButtons.forEach(
(button,index)=>{


button.addEventListener(
"click",
()=>{


if(index===1){

window.location.href =
"wardrobe.html";

}


if(index===2){

window.location.href =
"outfits.html";

}


if(index===3){

window.location.href =
"favorites.html";

}



});


});






// =================================
// Page Animation
// =================================


document
.querySelectorAll(
".weather-card,.outfit-card,.assistant-card,.feature"
)
.forEach(
(card,index)=>{


card.style.opacity="0";


setTimeout(()=>{


card.style.opacity="1";


},index*200);



});




console.log(
"✨ FashionAI Home Loaded"
);
