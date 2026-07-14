// FashionAI Outfit History Controller


import {

openDatabase,
getOutfitHistory,
toggleFavoriteOutfit

}

from "./local-database.js";





// Open local database

await openDatabase();





const grid =
document.getElementById(
"historyGrid"
);






// Load outfit history

const outfits =
await getOutfitHistory();






// Empty history

if(outfits.length === 0){


grid.innerHTML = `


<div class="card">


<h3>
No outfits yet ✨
</h3>


<p>
Generate your first FashionAI outfit.
</p>


</div>


`;



}

else{



outfits
.reverse()
.forEach(outfit=>{



const card =
document.createElement(
"div"
);



card.className =
"stat-card";






const date =
new Date(
outfit.date
)
.toLocaleDateString();







card.innerHTML = `


<h3>

✨ FashionAI Look

</h3>



<p>

👕 Top:

${outfit.top?.color || ""}

${outfit.top?.category || ""}

</p>





<p>

👖 Bottom:

${outfit.bottom?.color || ""}

${outfit.bottom?.category || ""}

</p>





<p>

👟 Shoes:

${outfit.shoes?.color || "None"}

</p>





<p>

🎉 Occasion:

${outfit.occasion || "Casual"}

</p>





<p>

⭐ Rating:

${outfit.rating || "Not rated"}

</p>





<p>

📅 Created:

${date}

</p>





<p>

💡

${outfit.reason || ""}

</p>





<button class="favoriteOutfit">

${outfit.favorite ? "❤️ Saved" : "🤍 Save Look"}

</button>



`;









// Favorite button


card
.querySelector(
".favoriteOutfit"
)
.onclick = async()=>{


const updated =
await toggleFavoriteOutfit(
outfit.id
);




outfit.favorite =
updated.favorite;




card
.querySelector(
".favoriteOutfit"
)
.innerHTML =

outfit.favorite

?

"❤️ Saved"

:

"🤍 Save Look";



};







grid.appendChild(card);



});



}
