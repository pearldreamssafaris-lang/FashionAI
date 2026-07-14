// =================================
// FashionAI Chat History
// =================================


const HISTORY_KEY = "fashionAI_history";



export function saveHistory(question, answer){


    const history =
    JSON.parse(
        localStorage.getItem(HISTORY_KEY)
    ) || [];



    history.push({

        question,

        answer,

        date:
        new Date().toLocaleString()

    });



    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );


}





export function getHistory(){


    return JSON.parse(

        localStorage.getItem(HISTORY_KEY)

    ) || [];


}





export function clearHistory(){


    localStorage.removeItem(
        HISTORY_KEY
    );


}
