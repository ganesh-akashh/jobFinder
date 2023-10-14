import express from "express"
import dotenv from "dotenv"

import OpenAI from "openai";
dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const instructionMessage = {
    role: "system",
    content: "Your name is JobFinder, a conversation companion specializing in job application and finding applications.You must only share related with job applying or job related information. Reply only in 3 lines"
}


router.post("/", async (req, res) => {
    try {
        const { messages } = await req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });
         return res.status(200).json(response.choices[0].message);
    } catch (error) {
        return res
            .status(500)
            .json({
                sucess: false,
                error:
                    error?.response?.data?.error?.message ||
                    "Something went wrong",
            })
    }
})

export default router