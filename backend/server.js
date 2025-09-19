const express = require('express');
const cors = require('cors');
const WhatsAppService = require('./services/whatsappService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize WhatsApp service
const whatsappService = new WhatsAppService();
const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || '918605941731';

// Route to handle booking form submission
app.post('/api/booking', async (req, res) => {
  try {
    const formData = req.body;
    
    // Send WhatsApp message to admin
    const result = await whatsappService.sendBookingNotification(formData, ADMIN_WHATSAPP_NUMBER);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Booking request submitted and admin notified via WhatsApp!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send WhatsApp notification',
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process booking request' 
    });
  }
});

// Route to handle individual test booking
app.post('/api/book-test', async (req, res) => {
  try {
    const testData = req.body;
    
    // Send WhatsApp message to admin
    const result = await whatsappService.sendTestBookingNotification(testData, ADMIN_WHATSAPP_NUMBER);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Test booking submitted and admin notified via WhatsApp!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send WhatsApp notification',
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Error processing test booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process test booking request' 
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});