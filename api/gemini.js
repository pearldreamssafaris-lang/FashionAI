// ======================================
// FashionAI Gemini API
// api/gemini.js
// ======================================


export default async function handler(req, res) {


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



        console.log("PROMPT:", prompt);

        console.log(
            "IMAGE RECEIVED:",
            Boolean(image)
        );



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





        // Add image if available

        if (image) {


            const base64Image =

            image.replace(

                /^data:image\/\w+;base64,/,

                ""

            );



            const mimeType =

            image.match(

                /^data:(.*?);base64/

            )?.[1] || "image/jpeg";




            parts.push({

                inline_data: {

                    mime_type: mimeType,

                    data: base64Image

                }

            });


        }






        console.log(
            "Sending request to Gemini..."
        );





        const geminiResponse = await fetch(


            "https://generativelanguages.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="

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
        await geminiResponse.json();





        console.log(

            "GEMINI RESPONSE:",

            JSON.stringify(
                data,
                null,
                2
            )

        );





        if (!geminiResponse.ok) {


            return res.status(
                geminiResponse.status
            ).json({

                error:

                data.error?.message ||

                "Gemini request failed"

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

            "No AI response"

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
