const express = require('express');
const router = express.Router();
const User = require('../model/User'); 
const Transaction = require('../model/Transaction');
const Product = require('../model/Product')
const {Grocery, Electronic, Utility, Clothing} = require('../model/Categories');

// POST route to create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, age, gender, city, preferences } = req.body;
        const newUser = new User({
            name,
            email,
            age,
            gender,
            city,
            preferences
        });
        await newUser.save();
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve all Users
router.get('/users', async (req, res) => {
    try {
        // Retrieve all Users from the database
        const Users = await User.find();

        res.json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to retrieve a user by email
router.get('/getData/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add sample data
router.post('/add-transaction', async (req, res) => {
    try {
        const sampleData = req.body; // Assuming req.body contains an array of sample data
        // Insert sample data into the database
        await Transaction.insertMany(sampleData);
        console.log(sampleData);
        res.status(201).json({ message: 'Sample data added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve all transactions
router.get('/transactions', async (req, res) => {
    try {
        // Retrieve all transactions from the database
        const transactions = await Transaction.find();

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to add data for Electronic
router.post('/electronic/add', async (req, res) => {
    try {
        const { productId, category, city } = req.body;
        const newElectronic = new Electronic({ productId, category, city });
        await newElectronic.save();
        res.status(201).json(newElectronic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve data for Electronic
router.get('/electronic', async (req, res) => {
    try {
        const electronics = await Electronic.find();
        res.json(electronics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add data for Utility
router.post('/utility/add', async (req, res) => {
    try {
        const { productId, gender, city } = req.body;
        const newUtility = new Utility({ productId, gender, city })
        await newUtility.save();
        res.status(201).json(newUtility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve data for Utility
router.get('/utility', async (req, res) => {
    try {
        const utilities = await Utility.find();
        res.json(utilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add data for Grocery
router.post('/grocery/add', async (req, res) => {
    try {
        const { productId, type } = req.body;
        const newGrocery = new Grocery({ productId, type });
        await newGrocery.save();
        res.status(201).json(newGrocery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve data for Grocery
router.get('/grocery', async (req, res) => {
    console.log("get grocery");
    try {
        const groceries = await Grocery.find();
        res.json(groceries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route to add data for Clothing
router.post('/clothing/add', async (req, res) => {
    try {
        const { productId, targetAudience, age, brand } = req.body;
        const newClothing = new Clothing({ productId, targetAudience, age, brand });
        await newClothing.save();
        res.status(201).json(newClothing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve data for Clothing
router.get('/clothing', async (req, res) => {
    try {
        const clothing = await Clothing.find();
        res.json(clothing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to add a new product
router.post('/products', async (req, res) => {
    try {
        const {
            name,
            category,
            subcategory,
            price,
            description,
            imageUrl,
            piecesRemaining,
            sales,
            discount,
            rating,
            features
        } = req.body;

        const newProduct = new Product({
            name,
            category,
            subcategory,
            price,
            description,
            imageUrl,
            piecesRemaining,
            sales,
            discount,
            rating,
            features
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a specific product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a product by ID
router.patch('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
