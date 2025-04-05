require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Create Sample User endpoint
app.get('/create-sample-user', async (req, res) => {
    try {
        const sampleUser = new User({
            username: 'test',
            password: 'test123'
        });
        
        await sampleUser.save();
        res.json({ success: true, message: 'Sample user created successfully' });
    } catch (error) {
        console.error('Sample user creation error:', error);
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ success: false, message: 'Sample user already exists' });
        } else {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username, password });
        
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});