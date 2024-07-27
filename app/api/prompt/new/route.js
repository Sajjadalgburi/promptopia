import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    // we are saving the prompt values into the newly created prompt model by passing those values in
    const newPrompt = new Prompt({ creator: userId, tag, prompt });

    // saving the new instance of the prompt into the database
    await newPrompt.save();

    // returing the prompt as a string and sending back a response of 201
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Faild to create a new prompt!", { status: 400 });
  }
};
