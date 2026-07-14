// ======================================
// FashionAI Gemini Vision API
// api/gemini.js
// ======================================

export default async function handler(req, res) {


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



        const parts = [
            {
                text: prompt
            }
        ];



        if(image){


            const base64 =
            image.replace(
                /^data:image\/\w+;base64,/,
                ""
            );



            const mime =
            image.match(
                /^data:(.*?);base64/
            )[1];



            parts.push({

                inlineData: {

                    mimeType: mime,

                    data: base64

                }

            });


        }



        const geminiResponse =
        await fetch(

            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="
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
                            parts
                        }

                    ]

                })

            }


        );



        const result =
        await geminiResponse.json();



        if(result.error){

            return res.status(500).json({

                error:
                result.error.message

            });

        }



        const text =
        result
        ?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;



        return res.status(200).json({

            result:
            text || "No response"

        });



    } catch(error){


        console.error(error);


        return res.status(500).json({

            error:
            error.message

        });


    }

}
