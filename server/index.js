// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// // const UserModel = require('./models/Users')
// const UserModel = require('./models/Users')

// const app = express()
// app.use(cors())
// app.use(express.json())


// mongoose.connect("mongodb://127.0.0.1:27017/crud")

// app.get('/', (req, res) => {
//     UserModel.find({})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.get('/getUser/:id', (req, res) =>{
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.put('/updateUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id: id}, {
//         name: req.body.name, 
//         email: req.body.email, 
//         age: req.body.age})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.delete('/deleteUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id: id})
//     .then(res => res.json(res))
//     .catch(err => res.json(err))
// })

// app.post("/createUser", (req, res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.listen(3001, () => {
//     console.log("Server is Running")
// })


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());



// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get all users
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

// Get user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// Update user by ID
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age, city, date } = req.body;

    UserModel.findByIdAndUpdate(id, {
        name,
        email,
        age,
        city,
        date
    }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err));
});

// Delete user by ID
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: "User deleted successfully" }))
        .catch(err => res.status(500).json(err));
});

// Create new user
app.post("/createUser", (req, res) => {
    const { name, email, age, city, date } = req.body;

    UserModel.create({
        name,
        email,
        age,
        city,
        date
    })
        .then(newUser => res.json(newUser))
        .catch(err => res.status(500).json(err));
});

// Start server
app.listen(3001, () => {
    console.log("✅ Server is Running on http://localhost:3001");
});
