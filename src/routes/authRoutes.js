const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.send("Handle Supertokens Registration");
});

router.post('/login', (req, res) => {
    res.send("Handle Supertokens Login");
});

module.exports = router;
