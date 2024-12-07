import { type Request, type Response } from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';

dotenv.config();

interface InstructionData {
    ingredients: string[];
    readyInMinutes: number;
    servings: number;
    instructions: string;
}


// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI | undefined;

if (apiKey) {
    // Initialize the OpenAI model if the API key is provided
    model = new OpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo'});
} else {
    console.error('OPENAI_API_KEY is not configured.')
}

// Create a new prompt template for formatting prompts
const promptTemplate = new PromptTemplate({
    template: 
        `{information} \n Answer the following question provided by the user, referencing the recipe information for context. 
        Please format your response using Markdown for clarity:\n \n{content}`,
    inputVariables: ['content', 'information'],
});

// Create a new prompt template for formatting prompts
const formatPrompt = async (text: string, recipeInstructions: InstructionData): Promise<string> => {
    return await promptTemplate.format({ content: text, information: recipeInstructions });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (input: string): Promise<string> => {
    try {
        if (model) {
            return await model.invoke(input);
        }
        return 'No OpenAI API key provided. Unable to provide a response.';
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Handle the POST request to provide a response to the user's question
export const askAssistant = async (req: Request, res: Response): Promise<void> => {
    const userText: string = req.body.question;
    const recipeInformation: InstructionData = req.body.recipeDetails;

    try {
        if (!userText) {
            res.status(400).json({ error: 'Please provide text in the request body.'});
            return;
        }

        if (!recipeInformation) {
            res.status(400).json({ error: 'Please provide recipe information in the request body.' });
            return;
        }

        const formattedPrompt: string = await formatPrompt(userText, recipeInformation);
        const result: any = await promptFunc(formattedPrompt);
        res.json({ prompt: userText, formattedPrompt, result });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};