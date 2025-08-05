const service = require('../models/service');
const transporter = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'highvisibilitydetailing@gmail.com';
const submitService = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            vehicleType,
            make,
            model,
            color,
            services,
            notes,
        } = req.body;
const photos = req.files && req.files['photos']
  ? req.files['photos'].map(file => ({
      filename: file.originalname,
      path: `./files/${file.filename}`
    }))
  : [];

const Photos = photos.length > 0 ? photos[0].path : null; // Save first photo filename to DB
  const parsedServices = Array.isArray(services)
  ? services
  : typeof services === 'string' && services.length > 0
    ? [services]
    : [];
const serviceUser = await service.create({
  name,
  email,
  phone,
  vehicleType,
  make,
  model,
  color,
  services: parsedServices,
  notes,
  photos: Photos
});
const mailOptions = {
  from: 'High Visibility Detailing <highvisibilitydetailing@gmail.com>',
  to: email,
  bcc: [{ name: 'High Visibility Detailing', address: myEmail }],
  subject: 'JOB REQUEST',
  html: `
<html>
  <body style="font-family:sans-serif;padding:10px;">
    <div>
      <h1>JOB REQUEST</h1>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your job has been submitted!<br>
      If you have any questions or concerns regarding your job, please call (706) 506-1888.</p>

      <h3>Summary:</h3>
      <ul>
        <li><strong>Customer:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Vehicle Type:</strong> ${vehicleType}</li>
        <li><strong>Make:</strong> ${make}</li>
        <li><strong>Model:</strong> ${model}</li>
        <li><strong>Color:</strong> ${color}</li>
      </ul>

      <h3>Services Needed:</h3>
<ul>
  ${parsedServices.length > 0
    ? parsedServices.map(service => `<li>${service}</li>`).join('')
    : '<li>No services listed</li>'}
</ul>


      <h3>Additional Info:</h3>
      <p>${notes}</p>

      <p style="font-size: 14px;">High Visibility Detailing<br>Phone: (706) 506-1888<br><a href="https://www.highvisibilitydetailing.com/">www.highvisibilitydetailing.com</a></p>
    </div>
  </body>
</html>
`,
  attachments: photos
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
            serviceUser: serviceUser // Include the newUser object in the response
        };
        
        res.status(201).json(response);
        
    } catch (error) {
        console.error('Error submitting express:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitService
};
