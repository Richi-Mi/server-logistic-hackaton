

import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { IamAuthenticator } from 'ibm-watson/auth'; 


const watsonxService = WatsonXAI.newInstance({
    version: '2024-05-31', 
    serviceUrl: Bun.env.WATSON_AI_URL,
    authenticator: new IamAuthenticator({ apikey: Bun.env.WATSON_APIKEY })
});


export const sendPrompt = async (prompt: string) => {
    const response = await watsonxService.generateText({
        modelId: "ibm/granite-3-3-8b-instruct",
        projectId: Bun.env.WATSON_AI_PROJECT,
        input: prompt,
        parameters: {
            max_new_tokens: 1024
        }
    });
    
    
    return response.result.results[0].generated_text;
}