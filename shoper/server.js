const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'bookforfun',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.use(bodyParser.json());
const publicPath = path.join(__dirname, 'sign up');
app.use(express.static(publicPath));

app.post('/register', async (req, res) => {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.storePassword, 10);
    const verificationCode = crypto.randomBytes(20).toString('hex');

    const insertQuery = `INSERT INTO users (U_name, U_surnae, U_gender, U_smoke, U_phone, U_email, U_userName, U_password, U_verificationCode, U_verificationTimestamp, U_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)`;
    
    db.query(insertQuery, [
        userData.userName,
        userData.userLastName,
        userData.genderOptions,
        userData.smokeOptions,
        userData.userPhoneNumber,
        userData.userEmail,
        userData.userUserName,
        hashedPassword,
        verificationCode,
    ], (err, results) => {
        if (err) {
            console.error('Error inserting user data:', err);
            return res.json({ success: false, message: 'Registration failed. Please try again.' });
        }

        sendVerificationEmail(userData.userEmail, verificationCode);
        return res.json({ success: true, message: 'Registration successful. Check your email for verification.' });
    });
});

app.get('/verify', async (req, res) => {
    const verificationCode = req.query.code;
    const verificationResult = await verifyVerificationCode(verificationCode);

    if (verificationResult.success) {
        const updateQuery = `UPDATE users SET U_verified = 1 WHERE U_verificationCode = ?`;
        db.query(updateQuery, [verificationCode], (err, results) => {
            if (err) {
                console.error('Error updating user verification status:', err);
                res.send('Error verifying your email. Please try again.');
            } else {
                res.send('Email verification successful. You can now login.');
            }
        });
    } else {
        res.send(verificationResult.message);
    }
});

async function verifyVerificationCode(verificationCode) {
    const userQuery = `SELECT * FROM users WHERE U_verificationCode = ?`;
    const [user] = await db.promise().query(userQuery, [verificationCode]);

    if (user.length === 0) {
        return { success: false, message: 'Invalid verification code.' };
    }

    const tokenExpiryTime = 24 * 60 * 60 * 1000; // 24 hours
    const currentTime = new Date().getTime();
    const tokenTime = new Date(user[0].U_verificationTimestamp).getTime();

    if (currentTime - tokenTime > tokenExpiryTime) {
        return { success: false, message: 'Verification code has expired. Please request a new one.' };
    }

    return { success: true };
}

function sendVerificationEmail(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email
        to: email,
        subject: 'Email Verification',
        html: `
            <p>Thank you for registering. Please click the link below to verify your email:</p>
            <a href="http://localhost:${port}/verify?code=${verificationCode}">Verify Email</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
