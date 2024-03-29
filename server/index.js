import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js"
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// add to post routes /posts ===> localhost:5000/posts/...
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL="mongodb://0.0.0.0:27017/socialMedia";
//"mongodb+srv://mernApp:mernApp123@cluster0.bc8nqr2.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000 ;
  
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));