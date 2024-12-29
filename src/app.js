const express = require('express');
const SuperTokens = require('supertokens-node');
const { middleware, errorHandler } = require('supertokens-node/framework/express');
const Session = require('supertokens-node/recipe/session');
const EmailPassword = require('supertokens-node/recipe/emailpassword');
require('dotenv').config();

SuperTokens.init({
    framework: 'express',
    supertokens: {
        connectionURI: 'https://try.supertokens.io',
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
        appName: 'User-Service',
        apiDomain: 'http://localhost:8080',
        websiteDomain: 'http://localhost:8080',
    },
    recipeList: [
        EmailPassword.init(),
        Session.init(),
    ],
});

const app = express();
app.use(express.json());
app.use(middleware());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User-Service running on port ${PORT}`));
const db = require('./db');

app.get('/db/status', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ status: 'success', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
