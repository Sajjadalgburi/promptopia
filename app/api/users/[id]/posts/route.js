import { connectToDB } from "@database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch the prompts", { status: 500 });
  }
};
