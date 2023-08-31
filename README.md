
# Express-Mongo Starter Template
This is a starter template with examples for beginners who are learning MongoDB with express & mongoose.
## Installation
After cloning the project, install the node_modules using.
```bash
  npm install
```
To run the project,
```bash
  npm run dev
```
## Project Structure
```lua
express-mongo-starter/
|-- controllers/
|   |-- comments.ts
|   |-- posts.ts
|   |-- users.ts
|-- models/
|   |-- commentSchema.ts
|   |-- postSchema.ts    
|   |-- userSchema.ts
|-- node_modules/
|-- package.json
|-- package-lock.json
|-- server.ts
```
## Examples

#### **SCHEMA**

**Import Statements** 
```javascript
import mongoose, { Document, Schema } from 'mongoose';
```
Here, you're importing the necessary modules from Mongoose. The mongoose module provides methods for working with MongoDB, while the Document and Schema types are used to define the structure of your data.

**Defining the Interface:**
```javascript
interface User extends Document {
    name: string,
    username: string,
    password: string,
    created_at: Date,
}
```

You're defining an interface *User* that extends the *Document* type. This interface represents the structure of a document in your MongoDB collection. Each field in the interface corresponds to a field in the MongoDB document.

**Creating a Schema:**

```javascript
const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now }
});
```

Here, you're creating a Mongoose schema named *userSchema* using the Schema constructor. The schema defines the structure of the documents in the MongoDB collection. Each field in the schema corresponds to a property in the User interface you defined earlier. The type property specifies the data type of the field, and additional options such as required, unique, and default are provided as necessary.

**Creating a Model:**

```javascript
export default mongoose.model<User>('User', userSchema);
```

The mongoose.model function is used to create a model named *User* based on the *userSchema* you defined. The model provides an interface for interacting with the MongoDB collection associated with this schema. The first argument *User* is the name of the collection in the database, and the second argument is the schema you want to use for this collection. The model is exported as the default export of the module.

```javascript
import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
    name: string,
    username: string,
    password: string,
    created_at: Date,
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<User>('User', userSchema);
```

#### **CONTROLLER**

**Import Statements:**

```javascript
import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userSchema';
```

Here, you're importing necessary modules. Router from Express creates a modular, mountable route handler, *Request* and *Response* are types from Express for handling HTTP requests and responses, mongoose is used for MongoDB operations, and User is the model you've defined earlier.

**Creating a Router:**

```javascript
const users = Router();
```

You're creating an Express router instance named *users*. This allows you to define routes for the /users path.

**Creating a User (POST Route):**

```javascript
users.post("/", async (req: Request, res: Response) => {
    const { name, username, password } = req.body;

    try {
        const user = new User({ name, username, password });
        const savedUser = await user.save();

        res.status(201).json({
            "message": "User data has been saved!",
            "data": savedUser
        });

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong!",
            "error": error.message
        });
    }
});
```

This code defines a POST route for creating a new user. When a POST request is made to the /users route, the request's body is expected to contain *name*, *username*, and *password*. Inside the route handler:

- A new User object is created using the provided data.
- The save() method is called on the user object to save it to the database.
- If the user is saved successfully, a JSON response with a 201 status code and a   success message is sent, along with the saved user data.
- If an error occurs during the save operation, a JSON response with a 502 status code and an error message is sent.