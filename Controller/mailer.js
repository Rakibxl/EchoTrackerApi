
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

require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const sendWasteDisposalReminder = async (userEmail, userName, scheduleDate) => {
  const emailTemplate = generateEmailTemplate(userName, scheduleDate);

  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '39945a7e65c12f714f76f6fcda0ecb10-4c205c86-13b4d9f9'});

  mg.messages.create('sandboxfcaf96278def4413a3a215ab48b0b811.mailgun.org', {
      from: 'merakib007@gmail.com',
      to: userEmail,
      subject: "Waste Disposal Reminder",
      html: emailTemplate
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error
};

// Example usage
sendWasteDisposalReminder('rahmed89@my.centennialcollege.ca', 'Recipient Name', '2024-05-15');