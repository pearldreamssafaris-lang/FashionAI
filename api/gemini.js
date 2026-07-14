// ======================================
// FashionAI Hybrid Gemini API
// api/gemini.js
// ======================================
import { generateFashionAdvice } from "./fashion-engine.js";

export default async function handler(req, res) {


    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);



    if (req.method !== "POST") {

        return res.status(405).json({

            error: "Only POST requests allowed"

        });

    }



    try {


        const {
            prompt,
            image

        } = req.body || {};



        if (!prompt) {

            return res.status(400).json({

                error: "Missing prompt"

            });

        }





        // Check API key

        if (!process.env.GEMINI_API_KEY) {


            return res.status(200).json({

                result: fashionFallback(prompt)

            });


        }





        const fashionAdvice =
generateFashionAdvice(prompt);



const parts = [

{

text:

`
You are FashionAI, a professional stylist.

First consider this fashion plan:

${fashionAdvice}


Now answer the customer question:

${prompt}

Give a detailed personalized outfit recommendation.
`

}

];






        // Add image if uploaded

        if (image) {


            const base64Image = image.replace(

                /^data:image\/\w+;base64,/,

                ""

            );



            const mimeType =

            image.match(

                /^data:(.*?);base64/

            )?.[1] || "image/jpeg";




            parts.push({

                inlineData: {

                    mimeType: mimeType,

                    data: base64Image

                }

            });


        }







        const geminiResponse = await fetch(


            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="

            + process.env.GEMINI_API_KEY,


            {


                method: "POST",


                headers: {

                    "Content-Type":
                    "application/json"

                },


                body: JSON.stringify({

                    contents: [

                        {

                            parts: parts

                        }

                    ]

                })


            }


        );






        const data = await geminiResponse.json();






        console.log(
            "GEMINI STATUS:",
            geminiResponse.status
        );






        // Gemini quota/error fallback

        if (!geminiResponse.ok) {


            console.log(
                "Using FashionAI fallback mode"
            );



            return res.status(200).json({

                result:
                fashionFallback(prompt)

            });


        }







        const result =

        data
        ?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;






        return res.status(200).json({

            result:

            result ||

            fashionFallback(prompt)


        });







    } catch(error) {



        console.error(
            "SERVER ERROR:",
            error.message
        );



        return res.status(200).json({

            result:
            fashionFallback()

        });



    }



}






// ======================================
// FashionAI Offline Styling Assistant
// ======================================


// ======================================
// FashionAI Offline Knowledge Engine
// ======================================

function fashionFallback(prompt = "") {

    const question = prompt.toLowerCase();


    const answers = [

        {
            keys:["office","work","job","interview","business"],
            answer:`
💼 FashionAI Office Style:

For a professional look:

👩 Women:
- Blazer with blouse
- Elegant trousers or pencil skirt
- Simple jewelry
- Closed heels or flats

👨 Men:
- Shirt and trousers
- Blazer or suit
- Formal shoes

Best colors:
🤎 Beige
🖤 Black
💙 Navy
🤍 White

Your outfit should look confident and professional.
`
        },


        {
            keys:["wedding","marriage","ceremony"],
            answer:`
💍 FashionAI Wedding Style:

Choose an elegant outfit:

👗 Dresses, jumpsuits, classy skirts
✨ Satin, silk, chiffon fabrics
💎 Gold or silver accessories

Beautiful colors:
Champagne, gold, blue, pink, emerald.

Dress beautifully while respecting the occasion.
`
        },


        {
            keys:["casual","weekend","daily","everyday"],
            answer:`
🌿 FashionAI Casual Style:

Try:

👕 Comfortable tops
👖 Jeans or relaxed trousers
👟 Sneakers or flats
👜 Simple accessories

Colors:
White, beige, denim blue, earth tones.
`
        },


        {
            keys:["party","night","club","birthday"],
            answer:`
✨ FashionAI Party Style:

Try:

👗 Statement dresses
💎 Bold accessories
👠 Stylish heels
👜 A beautiful handbag

Popular colors:
Black, gold, red, silver.
`
        },


        {
            keys:["travel","trip","airport"],
            answer:`
✈️ FashionAI Travel Style:

Comfort meets style:

- Comfortable trousers
- Light jacket
- Sneakers
- Crossbody bag
- Simple layers

Choose breathable fabrics.
`
        },


        {
            keys:["black dress"],
            answer:`
🖤 Styling a Black Dress:

Match it with:

💎 Gold jewelry for luxury
🤍 White accessories for elegance
❤️ Red lipstick for confidence
👠 Heels for a glamorous look.
`
        },


        {
            keys:["blue","navy"],
            answer:`
💙 Blue Fashion Tips:

Blue matches beautifully with:

🤍 White
🤎 Beige
✨ Gold
🖤 Black

Navy blue is excellent for professional outfits.
`
        },


        {
            keys:["color","colour","match"],
            answer:`
🎨 FashionAI Color Guide:

Beautiful combinations:

🤎 Beige + Gold
💙 Blue + White
🖤 Black + Gold
💚 Green + Gold
🧡 Orange + Beige

Choose colors that match your personality.
`
        },


        {
            keys:["shoes","shoe"],
            answer:`
👠 FashionAI Shoe Guide:

Office:
- Loafers
- Closed heels
- Formal shoes

Casual:
- Sneakers
- Flats

Events:
- Heels
- Elegant shoes

Choose shoes based on your outfit and occasion.
`
        },


        {
            keys:["accessories","jewelry","jewellery"],
            answer:`
💎 FashionAI Accessories:

Complete your look with:

- Earrings
- Watches
- Necklaces
- Handbags
- Belts
- Sunglasses

Keep accessories balanced.
`
        },


        {
            keys:["dress","outfit","wear"],
            answer:`
👗 FashionAI Outfit Advice:

Tell me your occasion:

💼 Office
💍 Wedding
🌿 Casual
✨ Party
✈️ Travel

I will suggest a suitable outfit.
`
        },


        {
            keys:["body","shape","size"],
            answer:`
✨ FashionAI Body Styling:

Choose clothes that make you comfortable.

Tips:
- Wear correct fitting clothes
- Highlight your favorite features
- Choose colors you love
- Confidence makes every outfit better.
`
        },


        {
            keys:["trend","trending","fashion"],
            answer:`
🌟 FashionAI Trend Advice:

Modern fashion focuses on:

- Clean designs
- Quality basics
- Neutral colors
- Statement accessories
- Personal style.
`
        },


        {
            keys:["summer","hot"],
            answer:`
☀️ Summer Style:

Choose:

- Light fabrics
- Cotton dresses
- Loose shirts
- Sandals
- Bright colors

Stay comfortable and stylish.
`
        },


        {
            keys:["winter","cold"],
            answer:`
❄️ Cold Weather Style:

Try:

- Jackets
- Coats
- Sweaters
- Boots
- Layered outfits
`
        }

    ];



    for (let item of answers) {

        for (let key of item.keys) {

            if(question.includes(key)) {

                return item.answer;

            }

        }

    }



    // Unknown questions

    return `
🤖 FashionAI:

I don't know that style question yet, but I am still learning.

You can ask me about:

👗 Outfits
💼 Office wear
💍 Wedding style
✨ Party looks
🎨 Color matching
👠 Shoes
💎 Accessories
🌟 Fashion trends

Try asking:
"What should I wear to work?"
"How do I style a black dress?"
"What colors match beige?"
`;

}
