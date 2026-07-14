// =================================
// FashionAI IndexedDB Storage
// database.js
// =================================


const DATABASE_NAME = "FashionAI_DB";

const DATABASE_VERSION = 1;


let db = null;




// ================================
// Open Database
// ================================


export function openDatabase(){


return new Promise((resolve,reject)=>{


if(db){

resolve(db);

return;

}



const request =
indexedDB.open(
DATABASE_NAME,
DATABASE_VERSION
);



request.onupgradeneeded = (event)=>{


const database =
event.target.result;



// Wardrobe storage

if(
!database.objectStoreNames.contains(
"wardrobe"
)
){


database.createObjectStore(
"wardrobe",
{
keyPath:"id",
autoIncrement:true
}
);


}



// Favorites storage

if(
!database.objectStoreNames.contains(
"favorites"
)
){


database.createObjectStore(
"favorites",
{
keyPath:"id",
autoIncrement:true
}
);



}



// Outfit history storage

if(
!database.objectStoreNames.contains(
"outfits"
)
){


database.createObjectStore(
"outfits",
{
keyPath:"id",
autoIncrement:true
}
);



}



};





request.onsuccess = ()=>{


db =
request.result;


resolve(db);


};





request.onerror = ()=>{


reject(
request.error
);


};



});


}






// ================================
// Save Clothing
// ================================


export function saveClothing(item){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



const clothing = {

...item,

createdAt:
new Date().toISOString()

};




const request =
store.add(
clothing
);




request.onsuccess = ()=>{


resolve(true);


};




request.onerror = ()=>{


reject(
request.error
);


};



});


});


}






// ================================
// Get Wardrobe
// ================================


export function getWardrobe(){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"wardrobe",
"readonly"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.getAll();



request.onsuccess = ()=>{


resolve(
request.result
);


};



request.onerror = ()=>{


reject(
request.error
);


};



});


});


}






// ================================
// Delete Clothing
// ================================


export function deleteClothing(id){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



store.delete(id);



transaction.oncomplete = ()=>{


resolve(true);


};



transaction.onerror = ()=>{


reject(false);


};



});


});


}






// ================================
// Save Favorite Outfit
// ================================


export function saveFavorite(outfit){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"favorites",
"readwrite"
);



const store =
transaction.objectStore(
"favorites"
);



store.add({

...outfit,

createdAt:
new Date().toISOString()

});



transaction.oncomplete=()=>{


resolve(true);


};



transaction.onerror=()=>{


reject(false);


};



});


});


}






// ================================
// Get Favorites
// ================================


export function getFavorites(){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"favorites",
"readonly"
);



const store =
transaction.objectStore(
"favorites"
);



const request =
store.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>{


reject(false);


};



});


});


}






// ================================
// Save Generated Outfit History
// ================================


export function saveOutfit(outfit){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"outfits",
"readwrite"
);



const store =
transaction.objectStore(
"outfits"
);



store.add({

...outfit,

createdAt:
new Date().toISOString()

});



transaction.oncomplete=()=>{


resolve(true);


};



transaction.onerror=()=>{


reject(false);


};



});


});


}






// ================================
// Get Outfit History
// ================================


export function getOutfits(){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"outfits",
"readonly"
);



const store =
transaction.objectStore(
"outfits"
);



const request =
store.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>{


reject(false);


};



});


});


}
// ================================
// Save Chat History
// ================================

export function saveChat(question, answer){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"history",
"readwrite"
);



const store =
transaction.objectStore(
"history"
);



store.add({

question,

answer,

createdAt:
new Date().toISOString()

});



transaction.oncomplete=()=>{

resolve(true);

};



transaction.onerror=()=>{

reject(false);

};



});


});


}




// ================================
// Get Chat History
// ================================

export function getChatHistory(){


return openDatabase()

.then(()=>{


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(
"history",
"readonly"
);



const store =
transaction.objectStore(
"history"
);



const request =
store.getAll();



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(false);

};



});


});


}
