const grid =
document.getElementById(
"favoritesGrid"
);



let favorites =
JSON.parse(
localStorage.getItem(
"favoriteOutfits"
)
) || [];




function displayFavorites(){


grid.innerHTML="";



if(!favorites){


grid.innerHTML=
`

<p>
No favorites yet ❤️
</p>

`;

return;

}



grid.innerHTML=`

<div class="favorite-card">


<h3>

✨ Saved Outfit

</h3>


<p>

👕 ${favorites.top?.type || "Top"}

<br>

👖 ${favorites.bottom?.type || "Bottom"}

<br>

👟 ${favorites.footwear?.type || "Shoes"}

</p>



<button class="remove-btn">

Remove

</button>


</div>

`;





document
.querySelector(".remove-btn")
?.addEventListener(
"click",
()=>{


localStorage.removeItem(
"favoriteOutfit"
);


grid.innerHTML=
`

<p>
Removed ❤️
</p>

`;



});


}



displayFavorites();
