import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';
interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions:  Schema.Types.ObjectId[],
}

// Schema to create thought  model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
        type:String,
        required:true,
        maxlength: 280,
      },
    createdAt: {
        type: Date,
        default: Date.now // Sets the default value to the current date and time
      },
    username: {
      type:String,
      required:true,
     },
     reactions: [reactionSchema],
    
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters:true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount').get(function(){
  return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

export default Thought;
