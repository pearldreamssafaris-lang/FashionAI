// ======================================
// FashionAI Hybrid Fashion Engine
// api/fashion-engine.js
// ======================================


export function generateFashionAdvice(
    occasion = ""
){


const today =
new Date();


const day =
today.toLocaleDateString(
    "en-US",
    {
        weekday:"long"
    }
);



let style = "";



const dailyStyle = {

Monday:
"💼 Monday: Start strong with professional outfits like blazers, shirts, trousers and elegant dresses.",

Tuesday:
"✨ Tuesday: Smart casual style with comfortable but polished clothing.",

Wednesday:
"🌿 Wednesday: Balanced style with elegant and comfortable pieces.",

Thursday:
"🎨 Thursday: Creative fashion day. Add colors, patterns and statement accessories.",

Friday:
"🌟 Friday: Professional during the day and stylish for evening plans.",

Saturday:
"☀️ Saturday: Relaxed fashion with casual dresses, jeans and comfortable shoes.",

Sunday:
"🤍 Sunday: Elegant casual style with soft colors and comfortable fabrics."

};



style =
dailyStyle[day];





const choice =
occasion.toLowerCase();



if(choice.includes("office") ||
choice.includes("work")){


style += `

💼 Office Outfit:

👔 Blazer
👗 Blouse or shirt
👖 Tailored trousers
👠 Closed shoes
💎 Simple accessories

Colors:
Black, navy, beige and white.
`;

}



else if(choice.includes("wedding")){


style += `

💍 Wedding Outfit:

👗 Elegant dress
✨ Luxury fabric
💎 Gold/silver jewelry
👠 Heels

Colors:
Champagne, gold, emerald, blue.
`;

}



else if(choice.includes("party")){


style += `

✨ Party Outfit:

👗 Statement outfit
💎 Bold accessories
👠 Stylish shoes

Colors:
Black, red, gold or silver.
`;

}



else {


style += `

👗 General Outfit:

Choose:
- A stylish top
- Matching bottom
- Suitable shoes
- Accessories that complete your look.
`;

}



return style;


}
