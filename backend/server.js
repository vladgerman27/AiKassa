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

    const user = await users.insertOne({ email, password, name, phone });

    const token = jwt.sign({ _id: user.insertedId, email, name, phone }, "token");
 
    res.json({ token });
  });

  //add categories
  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('AiKassa');
    const categories = db.collection('categories_item');

    const category = await categories.insertOne({ name });

    const token = jwt.sign({ _id: category.insertedId, name }, "token");
 
    res.json({ token });
  });

  //show categories
  app.get('/categories', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('AiKassa');
      const categories = db.collection('categories_item');
  
      const data = await categories.find({}).toArray();
  
      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
  });

  //add products
  app.post('/products', async (req, res) => {
    const { name, category, unit, cost, count, vendorСode, code, brand, barcode, describtion, note} = req.body;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('AiKassa');
    const products = db.collection('Products');

    const product = await products.insertOne({ name, category, unit, cost, count, vendorСode, code, brand, barcode, describtion, note });

    const token = jwt.sign({ _id: product.insertedId, name, category, unit, cost, count, vendorСode, code, brand, barcode, describtion, note }, "token");
 
    res.json({ token });
  });

  //show products
  app.get('/products', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('AiKassa');
      const products = db.collection('Products');
  
      const data = await products.find({}).toArray();
  
      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
  });

  //delete product
  app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('AiKassa');
    const products = db.collection('Products');

    try {
        const result = await products.deleteOne({ _id: new ObjectId(productId) });
        if (result.deletedCount === 1) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
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