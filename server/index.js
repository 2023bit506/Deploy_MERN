const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();

// CORS configuration to allow specific frontend origin (e.g., production frontend URL)
app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"], // Replace with your actual frontend URL
    methods: ["POST", "GET", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers for security
    credentials: true
}));

app.use(express.json());

// Ping route for testing server
app.get("/ping", (req, res) => {
    res.json("Hello");
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

// Get all users
app.get('/getUsers', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => {
            console.error("❌ Error fetching users:", err);
            res.status(500).json({ message: "Error fetching users", error: err.message });
        });
});

// Get user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => {
            console.error(`❌ Error fetching user with ID ${id}:`, err);
            res.status(500).json({ message: `Error fetching user with ID ${id}`, error: err.message });
        });
});

// Update user by ID
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age, city, date } = req.body;

    UserModel.findByIdAndUpdate(id, { name, email, age, city, date }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => {
            console.error(`❌ Error updating user with ID ${id}:`, err);
            res.status(500).json({ message: `Error updating user with ID ${id}`, error: err.message });
        });
});

// Delete user by ID
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: "User deleted successfully" }))
        .catch(err => {
            console.error(`❌ Error deleting user with ID ${id}:`, err);
            res.status(500).json({ message: `Error deleting user with ID ${id}`, error: err.message });
        });
});

// Create new user
app.post("/createUser", (req, res) => {
    const { name, email, age, city, date } = req.body;

    UserModel.create({ name, email, age, city, date })
        .then(newUser => res.json(newUser))
        .catch(err => {
            console.error("❌ Error creating user:", err);
            res.status(500).json({ message: "Error creating user", error: err.message });
        });
});

// Start server
app.listen(3001, () => {
    console.log("✅ Server is Running on http://localhost:3001");
});
