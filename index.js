
import OpenAI from "openai"; 

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});


// Getting user Language Selection
const translateBtn = document.getElementById('translate-btn')

let targetLang = "French"

const radioGroup = document.getElementById('radio-group');

// This waits for any change inside the fieldset
radioGroup.addEventListener('change', () => {
  const selected = document.querySelector('#radio-group input:checked');
  
  if (selected) {
    targetLang = selected.value;
    // You can now use this value to update your UI or variables
  }
});

translateBtn.addEventListener('click', translateText)

async function translateText(e) {
  // Prevent default form submission
    e.preventDefault();

    const textArea = document.getElementById('user-input')

    const text = textArea.value.trim()

    if(!text) return

    try {

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

    displayText(response.choices[0].message.content)

  } catch(error) {
    
    console.log(error)
    displayText('Can you try again please!')
  }
    
}


function displayText(content) {
  const translatedText = document.getElementById('translated-text')
  const selectedLang = document.getElementById('selected-lang')
  translatedText.innerHTML = `
    <h2>Your translation</h2>
    <p class="translate-textarea">${content}</p>
    <button class="btn" id="start-btn">Start Over</button>
  `
  translatedText.classList.remove('hide')
  selectedLang.classList.add('hide')
}


// Start over functionallity.
document.addEventListener('click', (e) => {
  // This finds the button even if you click a child element inside it
  const startBtn = e.target.closest('#start-btn');

  if (startBtn) {
    e.preventDefault()
    
  const translatedText = document.getElementById('translated-text')
  const selectedLang = document.getElementById('selected-lang')

  translatedText.classList.add('hide')
  selectedLang.classList.remove('hide')
  }
})



//translateText()
