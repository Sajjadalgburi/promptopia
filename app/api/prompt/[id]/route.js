import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";

// GET to read
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found...", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch the prompts", { status: 500 });
  }
};

// PATCH to update

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    // find the existing prompt
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found...", { status: 404 });

    // set the old prompt text and tag to the new ones grabbed from the request
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // save the new prompt into the models/database
    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Could not update the prompts", { status: 500 });
  }
};

// DELETE

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Could not delete the prompts", { status: 500 });
  }
};
