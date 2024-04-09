

require('dotenv').config();
require('dotenv').config({ path: '.env.development' });

const generateEmailTemplate = (name, date) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
        }
        .footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px 20px;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="cid:logo@ecotracker" alt="ECOTRACKER Logo" style="vertical-align: middle;" />
        <h1>ECOTRACKER - Save the Future</h1>
    </div>
    <div class="content">
        <h2>Waste Disposal Reminder</h2>
        <p>Hello,</p>
        <p>Just a friendly reminder about your upcoming waste disposal schedule.</p>
        <p>Please be ready to dispose of your waste according to your selected categories. It's important for keeping our community clean and green.</p>
        <p>Thank you for doing your part in waste management.</p>
        <a href="http://www.yourwebsite.com/schedule" class="button">View Schedule</a>
    </div>
    <div class="footer">
        <p>© 2024 ECOTRACKER. All rights reserved.</p>
    </div>
</body>
</html>
`;

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const ApiCredential = require('../models/ApiCredential');
const mongoose = require('mongoose');

console.log("MongoDB URI: ", 'mongodb+srv://zenith:Zenith123@cluster0.i2uby.mongodb.net/EcoTracker_db?retryWrites=true&w=majority'); 

const sendWasteDisposalReminder = async (userEmail, userName, scheduleDate) => {
    const emailTemplate = generateEmailTemplate(userName, scheduleDate);

    try {
        // The retrieval of Mailgun credentials is now correctly placed inside an async function
        const mailgunCredentials = await ApiCredential.findOne({ serviceProvider: 'Mailgun' });
        if (!mailgunCredentials) {
            console.error('Mailgun credentials not found');
            return;
        }

        const apiKey = mailgunCredentials.apiKey;
        const password = mailgunCredentials.password; 

        console.log("api ", apiKey)

        console.log("apipws ", password)
        
        const mg = mailgun.client({ username: apiKey, key: password });

        mg.messages.create('sandboxfcaf96278def4413a3a215ab48b0b811.mailgun.org', {
            from: 'merakib007@gmail.com',
            to: userEmail,
            subject: "Waste Disposal Reminder",
            html: emailTemplate
        })
        .then(msg => console.log(msg)) 
        .catch(err => console.log(err)); 

    } catch (error) {
        console.error('Error sending waste disposal reminder:', error);
    }
};

mongoose.connect('mongodb+srv://zenith:Zenith123@cluster0.i2uby.mongodb.net/EcoTracker_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
    sendWasteDisposalReminder('ecotracker526@gmail.com', 'Ecotracker Team', '2024-05-15');
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
  });
