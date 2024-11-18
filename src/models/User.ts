import { Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string,
  email: string,
  thoughts:  Schema.Types.ObjectId[],
  friends: Schema.Types.ObjectId[],
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type:String,
      unique:true,
      required:true,
      trim:true,
     },
    email:  {
      type:String,
      unique:true,
      required:true,
      match: [/.+@.+\..+/, 'Please enter a valid email address.'] // Regular expression for email validation
     },
    thoughts: [{
      type:Schema.Types.ObjectId,
      ref:"Thought"
    }],
    friends: [{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount').get(function(){
  return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);

export default User;
