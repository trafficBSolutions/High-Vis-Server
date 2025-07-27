const express = require('../models/express');
const transporter = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';
const submitExpress = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            vehicleType,
            jobDate,
            payment,
            address,
            note
        } = req.body;
        const newUser = await express.create({
            name,
            email,
            phone,
            vehicleType,
            jobDate,
            payment,
            address,
            note
        });
        
        const mailOptions = {
            from: 'High Visibility Detailing <tbsolutions9@gmail.com>',
            to: email,
            bcc: [{ name: 'High Visibility Detailing', address: myEmail },
               ],
            subject: 'EXPRESS DETAILING JOB',
            html: `
            <html>
              <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #e7e7e7; color: #000;">
                <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
                  <h1 style="text-align: center; background-color: rgb(192, 211, 52),; padding: 15px; border-radius: 6px;">EXPRESS DETAILING JOB</h1>
                  
                  <p>Hi <strong>${name}</strong>,</p>
                  Your job has been submitted! <br>
                  If you have any questions or concerns regarding your job, please call (706) 506-1888.</p>
          
                  <h3>Summary:</h3>
                  <ul>
                    <li><strong>Customer:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Vehicle Type:</strong> ${vehicleType}</li>
                    <li><strong>Paying By:</strong> ${payment}</li>
                    <li><strong>Job Address:</strong> ${address}</li>
                  </ul>
                  <h3>Additional Info:</h3>
                  <p>${note}</p>
          
                  <p style="font-size: 14px;">High Visibility Detailing Phone: (706) 506-1888<br><a href="https://www.highvisibilitydetailing.com/">www.highvisibilitydetailing.com</a></p>
                </div>
              </body>
            </html>
            `
          };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email notification:', error);
            } else {
                console.log('Email notification sent:', info.response);
            }
        });

        const response = {
            message: 'Express submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };
        
        res.status(201).json(response);
        
    } catch (error) {
        console.error('Error submitting express:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitExpress
};