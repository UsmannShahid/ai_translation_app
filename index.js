
import OpenAI from "openai"; 

const targetLang = "French"
const text = "Hello, how are you?"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Required for Vite/frontend projects
});

// To answer your earlier question about the model:
// You define the model here when you make the call:
async function translateText() {
    const response = await openai.chat.completions.create({
        model: "gpt-5-nano", // This is where the model goes!
        messages: [{ 
            role: "system", 
            content: `You are an expert multilingual translator specializing in English, French, Spanish, and Japanese. Your goal is to provide translations that are not just linguistically accurate but culturally and contextually appropriate.

            Guidelines:

            Nuance: Identify and adapt idioms rather than translating literally.

            Grammar: Adhere to the formal grammar rules of the target language (e.g., RAE for Spanish, Académie Française for French).

            Japanese Specifics: Pay strict attention to Keigo (honorifics). Default to 'Desu/Masu' (polite) unless otherwise specified.

            Formatting: Preserve all Markdown, HTML tags, and placeholders (e.g., {user_name}).`,

            role: "user",
            content: `Translate the following text into ${targetLang}: "${text}"`
            }],
        
    });
    console.log(response.choices[0].message.content);
}

translateText()
