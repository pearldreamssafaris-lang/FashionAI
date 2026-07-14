// ======================================
// FashionAI Gemini Vision API
// api/gemini.js
// ======================================


export default async function handler(req, res) {


    console.log("BODY:", req.body);



    // Only allow POST

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



        console.log("PROMPT:", prompt);
        console.log("IMAGE RECEIVED:", !!image);



        if (!process.env.GEMINI_API_KEY) {


            return res.status(500).json({

                error: "Missing GEMINI_API_KEY"

            });


        }



        if (!prompt) {


            return res.status(400).json({

                error: "Missing prompt"

            });


        }



        const parts = [

            {

                text: prompt

            }

        ];



        // Add image

        if (image) {


            const base64Image =
            image.replace(
                /^data:image\/\w+;base64,/,
                ""
            );



            const mimeMatch =
            image.match(
                /^data:(.*?);base64/
            );



            const mimeType =
            mimeMatch
            ? mimeMatch[1]
            : "image/jpeg";



            parts.push({

                inlineData: {

                    mimeType: mimeType,

                    data: base64Image

                }

            });


        }




        console.log("Sending request to Gemini");



        const response = await fetch(

            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
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





        const data =
        await response.json();



        console.log(
            "GEMINI RESPONSE:",
            JSON.stringify(data)
        );





        if (data.error) {


            return res.status(500).json({

                error:
                data.error.message

            });


        }





        const result =

        data
        ?.candidates
        ?. [0]
        ?.content
        ?.parts
        ?. [0]
        ?.text;





        return res.status(200).json({

            result:
            result || "No AI response"

        });





    } catch(error) {



        console.error(
            "SERVER ERROR:",
            error
        );



        return res.status(500).json({

            error:
            error.message

        });


    }


}
