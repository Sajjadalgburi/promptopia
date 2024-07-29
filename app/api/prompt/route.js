import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    const prompt = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch the prompts", { status: 500 });
  }
};
