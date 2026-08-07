import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCjH9YWE08dUemHNNdgmmm4YMc4224zDgI",
});

const main = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:
      // "Generate a short question everybody can answer about ingress the game. Multiple choice answers. dont explain ingress",
      "Generate a short question about math everybody can answer . Multiple choice answers.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "A well-formed, insightful question.",
          },
          answer: {
            type: Type.STRING,
            description: "the letter of the right answer.",
          },
        },
        required: ["question", "answer"],
      },
    },
  });
  console.log(response.text);
};

void main();
