const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: 'harishradhakrishnan2001@gmail.com', // Replace with your email
    pass: 'ssiwtjazojsleqad' // Replace with your password or app password
  }
});

// Enrollment form submission endpoint
app.post('/api/enroll', async (req, res) => {
  try {
    const { course, formData } = req.body;
    
    // Prepare referral sources text
    const referralSources = Object.entries(formData.referralSources)
      .filter(([_, checked]) => checked)
      .map(([source]) => source)
      .join(', ');
    
    // Prepare email content
    const mailOptions = {
      from: 'harishradhakrishnan2001@gmail.com',
      to: 'harishradhakrishnan2001@gmail.com', // Replace with the recipient's email
      subject: `New Enrollment: ${course.name} Course`,
      html: `
        <h2>New Enrollment Request</h2>
        <p><strong>Course:</strong> ${course.name}</p>
        <p><strong>Student Name:</strong> ${formData.studentName}</p>
        <p><strong>Age:</strong> ${formData.age}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
        <p><strong>Location:</strong> ${formData.location}</p>
        <p><strong>Referral Source:</strong> ${referralSources || 'None selected'}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Enrollment submitted successfully' });
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    res.status(500).json({ success: false, message: 'Failed to submit enrollment' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Prepare email content
    const mailOptions = {
      from: 'harishradhakrishnan2001@gmail.com',
      to: 'harishradhakrishnan2001@gmail.com', // Replace with the recipient's email
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    // After your sendMail call
const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});