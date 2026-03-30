
import OpenAI from "openai"; 



const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});



//const userLang = document.querySelector('#radio-group input[type="radio"]:checked')
const translateBtn = document.getElementById('translate-btn')

let targetLang = ""

const radioGroup = document.getElementById('radio-group');

// This waits for any change inside the fieldset
radioGroup.addEventListener('change', () => {
  const selected = document.querySelector('#radio-group input:checked');
  
  if (selected) {
    targetLang = selected.value;
    // You can now use this value to update your UI or variables
  }
});

const textArea = document.getElementById('user-input')

translateBtn.addEventListener('click', translateText)

async function translateText(e) {
  // Prevent default form submission
    e.preventDefault();

    const text = textArea.value

    const response = await openai.chat.completions.create({
        model: "gpt-5.4-nano", // This is where the model goes!
        messages: [{ 
            role: "system", 
            content: `You are an expert multilingual translator specializing in English, French, Spanish, and Japanese. Your goal is to provide translations that are not just linguistically accurate but culturally and contextually appropriate.

            Guidelines:

            Nuance: Identify and adapt idioms rather than translating literally.

            Grammar: Adhere to the formal grammar rules of the target language (e.g., RAE for Spanish, Académie Française for French).

            Japanese Specifics: Pay strict attention to Keigo (honorifics). Default to 'Desu/Masu' (polite) unless otherwise specified.

            Formatting: Preserve all Markdown, HTML tags, and placeholders (e.g., {user_name}).`},

            {
            role: "user",
            content: `Translate the following text into ${targetLang}: "${text}"`
            }]
        
    });
    console.log(response.choices[0].message.content);
}

//translateText()
