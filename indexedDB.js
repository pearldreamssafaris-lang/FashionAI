// ======================================
// FashionAI IndexedDB Storage
// ======================================


const DB_NAME = "FashionAI_DB";

const DB_VERSION = 1;


const STORES = {

    WARDROBE:"wardrobe",

    HISTORY:"history",

    OUTFITS:"outfits"

};




// Open Database

export function openDatabase(){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
DB_NAME,
DB_VERSION
);



request.onupgradeneeded =
(event)=>{


const db =
event.target.result;



if(!db.objectStoreNames.contains(
STORES.WARDROBE
)){


db.createObjectStore(
STORES.WARDROBE,
{
keyPath:"id",
autoIncrement:true
}
);


}




if(!db.objectStoreNames.contains(
STORES.HISTORY
)){


db.createObjectStore(
STORES.HISTORY,
{
keyPath:"id",
autoIncrement:true
}
);


}




if(!db.objectStoreNames.contains(
STORES.OUTFITS
)){


db.createObjectStore(
STORES.OUTFITS,
{
keyPath:"id",
autoIncrement:true
}
);


}



};





request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}






// Save Wardrobe Item

export async function saveWardrobe(item){


const db =
await openDatabase();



const transaction =
db.transaction(
STORES.WARDROBE,
"readwrite"
);



transaction
.objectStore(
STORES.WARDROBE
)
.add({

name:item.name,

category:item.category,

color:item.color,

occasion:item.occasion,

image:item.image,

date:
new Date()

});



}






// Get Wardrobe

export async function getWardrobe(){


const db =
await openDatabase();



return new Promise(
(resolve,reject)=>{


const request =
db.transaction(
STORES.WARDROBE,
"readonly"
)
.objectStore(
STORES.WARDROBE
)
.getAll();



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}






// Save Chat History

export async function saveChat(
question,
answer
){


const db =
await openDatabase();



db.transaction(
STORES.HISTORY,
"readwrite"
)
.objectStore(
STORES.HISTORY
)
.add({

question,

answer,

date:
new Date()

});


}







// Get Chat History

export async function getChatHistory(){


const db =
await openDatabase();



return new Promise(
(resolve,reject)=>{


const request =
db.transaction(
STORES.HISTORY,
"readonly"
)
.objectStore(
STORES.HISTORY
)
.getAll();



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};


});


}
