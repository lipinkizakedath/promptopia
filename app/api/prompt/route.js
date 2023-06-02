import { connectToDB } from '@util/database';
import Prompt from '@app/models/prompt';

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Something went wront', { status: 500 });
  }
};
