// ======================================
// FashionAI Hybrid Fashion Engine
// ======================================


export function generateFashionAdvice(
    occasion = "",
    day = ""
){


const today =
new Date();



const currentDay =
day ||
today.toLocaleDateString(
"en-US",
{
weekday:"long"
}
);



const styles = {


Monday:`
💼 Monday Professional Look

Start the week strong:

👔 Blazer
👗 Elegant blouse/dress
👖 Tailored trousers
👠 Formal shoes

Colors:
Navy, black, beige, white.
`,


Tuesday:`
✨ Tuesday Smart Casual

Try:

👕 Stylish top
👖 Quality trousers or jeans
👟 Clean sneakers/flats
`,


Wednesday:`
🌿 Wednesday Balanced Style

Mix comfort and elegance:

- Midi dress
- Smart trousers
- Simple accessories
`,


Thursday:`
🎨 Thursday Creative Style

Show personality:

- Unique colors
- Statement accessories
- Fashion details
`,


Friday:`
🌟 Friday Style

Work to evening:

- Smart outfit
- Elegant shoes
- Statement bag/jewelry
`,


Saturday:`
☀️ Saturday Relaxed Style

Perfect for:

- Casual outings
- Shopping
- Friends

Try:
- Comfortable dresses
- Jeans
- Sneakers
`,


Sunday:`
🤍 Sunday Elegant Casual

Relaxed but polished:

- Light colors
- Comfortable fabrics
- Minimal accessories
`

};



let answer =
styles[currentDay];



if(
occasion.toLowerCase()
.includes("office")
){

answer += `

💼 Office Recommendation:

Choose:
- Blazer
- Formal trousers
- Closed shoes
- Simple accessories.
`;

}



if(
occasion.toLowerCase()
.includes("wedding")
){

answer += `

💍 Wedding Recommendation:

Choose:
- Elegant dress
- Gold accessories
- Heels
- Luxury fabrics.
`;

}



if(
occasion.toLowerCase()
.includes("party")
){

answer += `

✨ Party Recommendation:

Choose:
- Statement outfit
- Bold accessories
- Stylish shoes.
`;

}



return answer;


}
