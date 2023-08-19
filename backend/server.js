const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

const port = 8080;
const dbUri = "mongodb+srv://dananu986:132@cluster0.mbvbumz.mongodb.net/";

app.use(cors());
app.use(express.json());

///login
app.post('/login', async (req, res) => {
    const { email, password} = req.body;

    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('AiKassa');
      const users = db.collection('users');

      const user = await users.findOne({ email });  

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = user.password === password;

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ _id: user._id, email: user.email, name: user.name, phone: user.phone }, "token");

      res.json({ token, name: user.name, phone: user.phone });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //register
  app.post('/register', async (req, res) => {
    const { email, password, name, phone } = req.body;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('AiKassa');
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
        return res.status(401).json({ error: 'User already exists' });
    }

    const result = await users.insertOne({ email, password, name, phone });

    const token = jwt.sign({ _id: result.insertedId, email, name, phone }, "token");
 
    res.json({ token });
  });

  //add categories
  app.post('/categories', async (req, res) => {
    const { category } = req.body;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('AiKassa');
    const categories = db.collection('Categories');

    const result = await categories.insertOne({ category });

    const token = jwt.sign({ _id: result.insertedId, category }, "token");
 
    res.json({ token });
  });

  //show categories
  app.get('/categories', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('AiKassa');
      const categories = db.collection('Categories');
  
      const data = await categories.find({}).toArray();
  
      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
  });

  function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
    return res.status(401).json({ error: 'Необходимо авторизоваться' });
    }
    
    try {
    const decodedToken = jwt.verify(token, 'token');
    req.userId = decodedToken._id;
    next();
    } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Неверный токен' });
    }
  }

  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));