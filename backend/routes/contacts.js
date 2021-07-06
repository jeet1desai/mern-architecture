const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Contact = require("../models/contactModel");


router.post("/", async (req, res) => {
    try {
        let { name, email, phone } = req.body;
        if (!email || !name || !phone) {
            return res.status(400).json({ msg: "Enter empty field." });
        }
        const existingContact = await Contact.findOne({ email: email });
        if (existingContact) {
            return res.status(400).json({ msg: "This email already exists." });
        }
        if (phone.length < 10 || phone.length > 10) {
            return res.status(400).json({ msg: "The phone must be 10 digit." });
        }
        const newContact = new Contact({
            name,
            email,
            phone,
        });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let { name, email, phone } = req.body;
        if (!email || !name || !phone) {
            return res.status(400).json({ msg: "Enter empty field." });
        }
        if (phone.length < 10 || phone.length > 10) {
            return res.status(400).json({ msg: "The phone must be 10 digit." });
        }
        
        const updateContact = await Contact.findByIdAndUpdate(id, {
            name,
            email,
            phone
        }, {new: true});
        res.status(201).json(updateContact);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const deleteContact = await Contact.findByIdAndRemove(id);
        res.status(201).json(deleteContact);
    } catch (e) {
        res.status(404).send(e);
    }
});



router.get("/", async (req, res) => {
    try {
        const contact = await Contact.find();
        res.status(201).json(contact);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;