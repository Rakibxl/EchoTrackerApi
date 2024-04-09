require('dotenv').config();
const mongoose = require('mongoose');
// Correctly require the node-mailjet module
const mailjetLibrary = require('node-mailjet');

// This function will be corrected to use environment variables for Mailjet API credentials
async function initializeMailjet() {
    return mailjetLibrary.connect('e8d23cab3d9ccb3fb6a9374e3db85963', '5f2d5be91fc93b899fd90f73c8f75892');
}

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

let mailjet;

const sendWasteDisposalReminder = async (userEmail, userName, scheduleDate) => {
    const emailTemplate = generateEmailTemplate(userName, scheduleDate);
    // Ensure mailjet is initialized
    if (!mailjet) {
        mailjet = await initializeMailjet();
    }

    try {
        const response = await mailjet.post("send", {'version': 'v3.1'}).request({
            Messages: [{
                From: {
                    Email: "merakib007@gmail.com", // Ensure this email is verified with Mailjet
                    Name: "EcoTracker"
                },
                To: [{
                    Email: userEmail,
                    Name: userName
                }],
                Subject: "Waste Disposal Reminder",
                HTMLPart: emailTemplate
            }]
        });
        console.log("Email sent successfully!", response.body);
    } catch (error) {
        console.error('Error sending waste disposal reminder:', error);
    }
};

// Adjust your MongoDB URI as needed
mongoose.connect('mongodb+srv://zenith:Zenith123@cluster0.i2uby.mongodb.net/EcoTracker_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log("MongoDB Connected");
    mailjet = await initializeMailjet(); // Correctly initialize Mailjet here
    sendWasteDisposalReminder('ecotracker526@gmail.com', 'Ecotracker Team', '2024-05-15');
})
.catch(err => {
    console.error("MongoDB Connection Error:", err);
});
