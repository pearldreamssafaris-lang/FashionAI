// =================================
// FashionAI IndexedDB Storage
// database.js
// =================================

const DATABASE_NAME = "FashionAI_DB";
const DATABASE_VERSION = 2;

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

// Wardrobe
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

// Favorites
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

// Outfits
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

// Chat History
if(
!database.objectStoreNames.contains(
"history"
)
){

database.createObjectStore(
"history",
{
keyPath:"id",
autoIncrement:true
}
);

}

};

request.onsuccess = ()=>{
db = request.result;
resolve(db);
};

request.onerror = ()=>{
reject(request.error);
};

});

}

// ================================
// Save Clothing
// ================================

export async function saveClothing(item){

await openDatabase();

return new Promise((resolve,reject)=>{

const transaction =
db.transaction(
"wardrobe",
"readwrite"
);

const store =
transaction.objectStore(
"wardrobe"
);

const request =
store.add({

...item,

createdAt:
new Date().toISOString()

});

request.onsuccess=()=>resolve(true);
request.onerror=()=>reject(request.error);

});

}

// ================================
// Get Wardrobe
// ================================

export async function getWardrobe(){

await openDatabase();

return new Promise((resolve,reject)=>{

const request =
db.transaction(
"wardrobe",
"readonly"
)
.objectStore(
"wardrobe"
)
.getAll();

request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(request.error);

});

}

// ================================
// Delete Clothing
// ================================

export async function deleteClothing(id){

await openDatabase();

return new Promise((resolve,reject)=>{

const transaction =
db.transaction(
"wardrobe",
"readwrite"
);

transaction
.objectStore(
"wardrobe"
)
.delete(id);

transaction.oncomplete=()=>resolve(true);
transaction.onerror=()=>reject(false);

});

}

// ================================
// Save Favorite
// ================================

export async function saveFavorite(outfit){

await openDatabase();

return new Promise((resolve,reject)=>{

const transaction =
db.transaction(
"favorites",
"readwrite"
);

transaction
.objectStore(
"favorites"
)
.add({

...outfit,

createdAt:
new Date().toISOString()

});

transaction.oncomplete=()=>resolve(true);
transaction.onerror=()=>reject(false);

});

}

// ================================
// Get Favorites
// ================================

export async function getFavorites(){

await openDatabase();

return new Promise((resolve,reject)=>{

const request =
db.transaction(
"favorites",
"readonly"
)
.objectStore(
"favorites"
)
.getAll();

request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(false);

});

}

// ================================
// Save Outfit History
// ================================

export async function saveOutfit(outfit){

await openDatabase();

return new Promise((resolve,reject)=>{

const transaction =
db.transaction(
"outfits",
"readwrite"
);

transaction
.objectStore(
"outfits"
)
.add({

...outfit,

createdAt:
new Date().toISOString()

});

transaction.oncomplete=()=>resolve(true);
transaction.onerror=()=>reject(false);

});

}

// ================================
// Get Outfit History
// ================================

export async function getOutfits(){

await openDatabase();

return new Promise((resolve,reject)=>{

const request =
db.transaction(
"outfits",
"readonly"
)
.objectStore(
"outfits"
)
.getAll();

request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(false);

});

}

// ================================
// Save Chat History
// ================================

export async function saveChat(question,answer){

await openDatabase();

return new Promise((resolve,reject)=>{

const transaction =
db.transaction(
"history",
"readwrite"
);

transaction
.objectStore(
"history"
)
.add({

question,

answer,

createdAt:
new Date().toISOString()

});

transaction.oncomplete=()=>resolve(true);
transaction.onerror=()=>reject(false);

});

}

// ================================
// Get Chat History
// ================================

export async function getChatHistory(){

await openDatabase();

return new Promise((resolve,reject)=>{

const request =
db.transaction(
"history",
"readonly"
)
.objectStore(
"history"
)
.getAll();

request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(false);

});

}
