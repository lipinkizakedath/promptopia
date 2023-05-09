import mongoose, { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  prompt: {
    type: String,
    requireed: [true, 'Prompt cannot be empty!'],
  },
  tag: {
    type: String,
    requireed: [true, 'Tag cannot be empty!'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
