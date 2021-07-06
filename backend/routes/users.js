const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


router.post("/register", async (req, res) => {
    try {
        // console.log(req.body);
        let { email, password, confirmPassword, displayName } = req.body;

        if (!email || !password || !displayName) {
            return res.status(400).json({ msg: "Enter empty field." });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password must be atleast 5 characters long." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Password and Confirm-Password Not Matched." });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }
        const newUser = new User({
            email,
            password,
            displayName,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(404).send(e);
    }
});


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Enter empty field." });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." });
        }
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid password." });
        }

        const token = jwt.sign({ id: user._id }, "abcdefghijklmnoopqrstuvwxyz");
        console.log("token: ", token);

        res.status(201).json({ token, user });
    } catch (e) {
        res.status(404).send(e);
    }
});


router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.body.token;
        if (!token){
            return res.status(400).json({msg: "No authentication token, access denied"});
        }
        const verified = jwt.verify(token, "abcdefghijklmnoopqrstuvwxyz");
        if (!verified){
            return res.status(400).json({msg: "Token verification failed, authorization denied"});
        } 
        const user = await User.findById(verified.id);
        if (!user){
            return res.status(400).json({msg: "Invalid Token, No user found"});
        } 
        // console.log(user);
        return res.status(201).json({msg: "Valid token", user});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const user = await User.find();
    res.status(201).json(user);
});

module.exports = router;