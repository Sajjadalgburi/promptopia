import { Schema, model, models } from "mongoose";

// Define the User schema with specific validation rules and requirements
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"], // Ensure email is unique with a custom error message
    required: [true, "Email is required!"], // Make email a required field with a custom error message
  },
  username: {
    type: String,
    required: [true, "Username is required!"], // Make username a required field with a custom error message
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, // Regex to ensure username is 8-20 characters long, alphanumeric, and doesn't start/end with special characters
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!", // Custom error message for invalid username format
    ],
  },
  image: {
    type: String, // Optional field for storing user profile image URL
  },
});

// In a traditional Express server, the server is always running, so we can directly create the model:
// const User = model('User', UserSchema);
// However, in a Next.js environment, the server is not always running. Models are created when an API route is hit.
// To avoid redefining the model multiple times, we check if it already exists in the 'models' object.

// If the 'User' model already exists in the 'models' object, use it. Otherwise, create a new model.
const User = models.User || model("User", UserSchema);

export default User;
