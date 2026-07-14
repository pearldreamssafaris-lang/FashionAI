// ======================================
// FashionAI Gemini Vision API
// Vercel Serverless Function
// api/gemini.js
// ======================================


export default async function handler(req, res) {


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
        } = req.body;



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



        // Add image if uploaded

        if (image) {


            const base64Image =
                image.split(",")[1];


            const mimeType =
                image
                .split(",")[0]
                .match(/:(.*?);/)[1];



            parts.push({

                inline_data: {

                    mime_type: mimeType,

                    data: base64Image

                }

            });


        }





        const response = await fetch(

            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" 
            + process.env.GEMINI_API_KEY,

            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


                },


                body:JSON.stringify({

                    contents:[

                        {

                            parts:parts

                        }

                    ]

                })


            }


        );





        const data =
        await response.json();





        if(data.error){


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





    }

    catch(error){


        console.error(
            "Gemini Error:",
            error
        );


        return res.status(500).json({

            error:
            error.message

        });


    }



}
