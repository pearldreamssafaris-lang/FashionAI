// =================================
// FashionAI Google Authentication
// =================================


import {
auth
}
from "./firebase.js";


import {

GoogleAuthProvider,

signInWithPopup,

signOut,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const provider = new GoogleAuthProvider();



// Google Login

const googleButton =
document.getElementById("googleLogin");


if(googleButton){


googleButton.addEventListener(
"click",
async()=>{


try{


const result =
await signInWithPopup(
auth,
provider
);



const user =
result.user;



console.log(
"Welcome",
user.displayName
);



window.location.href =
"home.html";



}

catch(error){


console.log(
error.message
);


alert(
"Login failed"
);


}


});


}





// Guest Login

const guestButton =
document.getElementById("guestLogin");



if(guestButton){


guestButton.onclick=()=>{


window.location.href =
"home.html";


};


}





// Check user status

onAuthStateChanged(
auth,
(user)=>{


if(user){


console.log(
"User:",
user.displayName
);


}


});
