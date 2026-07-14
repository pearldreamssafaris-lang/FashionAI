// ======================================
// FashionAI Hybrid Gemini API
// api/gemini.js
// ======================================


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





        const parts = [

            {

                text: prompt

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


function fashionFallback(prompt = "") {


    const question =
    prompt.toLowerCase();





    if (
        question.includes("wear") ||
        question.includes("outfit")
    ) {


        return (

        "✨ FashionAI Smart Style Suggestion:\n\n" +

        "For a beautiful everyday look, try a balanced outfit:\n\n" +

        "👗 Top: A clean blouse, shirt, or fitted top.\n" +

        "👖 Bottom: Well-fitted trousers, skirt, or elegant jeans.\n" +

        "👠 Shoes: Choose shoes that match the occasion.\n" +

        "💎 Accessories: Add a statement bag, watch, or gold jewelry.\n\n" +

        "Colors that always work well together:\n" +

        "🤎 Beige + Gold\n" +

        "💙 Blue + White\n" +

        "🖤 Black + Gold\n\n" +

        "Make sure your outfit matches your confidence and personality."

        );


    }






    if (
        question.includes("color") ||
        question.includes("colour")
    ) {


        return (

        "🎨 FashionAI Color Advice:\n\n" +

        "Neutral colors are easy to style:\n" +

        "• Beige\n" +
        "• White\n" +
        "• Black\n" +
        "• Navy\n\n" +

        "Add gold or orange accents for a luxurious fashion look."

        );


    }






    return (

    "✨ FashionAI is currently in Smart Mode.\n\n" +

    "I can help you with outfits, colors, occasions, and styling ideas. " +

    "Try asking: 'What should I wear for a wedding?' or " +

    "'How do I style a black dress?'"

    );


}
