const axios = require('axios');

class WhatsAppService {
  constructor() {
    // WhatsApp Business API Configuration
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || 'your_access_token';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || 'your_phone_number_id';
    this.apiVersion = 'v17.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  // Send WhatsApp message using Business API
  async sendMessage(phoneNumber, message) {
    try {
      const url = `${this.baseUrl}/${this.phoneNumberId}/messages`;
      
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message
        }
      };

      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        messageId: response.data.messages[0].id,
        data: response.data
      };
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Format phone number (remove +, spaces, and ensure it starts with country code)
  formatPhoneNumber(phone) {
    return phone.replace(/[\s+]/g, '').replace(/^0/, '91');
  }

  // Create booking form message
  createBookingMessage(formData) {
    const { name, phone, address, testType, customTestType } = formData;
    const finalTestType = testType === 'other' ? customTestType : testType;
    
    return `🏥 *New Test Booking Request*

👤 *Patient Details:*
• Name: ${name}
• Phone: ${phone}
• Address: ${address}

🧪 *Test Requested:*
• Test Type: ${finalTestType}

📅 *Booking Time:* ${new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

Please contact the patient as soon as possible.`;
  }

  // Create individual test booking message
  createTestBookingMessage(testData) {
    const { name, price } = testData;
    
    return `🏥 *New Test Booking Request*

🧪 *Test Details:*
• Test Name: ${name}
• Price: ${price}

📅 *Booking Time:* ${new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

Please contact the patient for further details.`;
  }

  // Send booking notification to admin
  async sendBookingNotification(formData, adminNumber) {
    const message = this.createBookingMessage(formData);
    const formattedNumber = this.formatPhoneNumber(adminNumber);
    return await this.sendMessage(formattedNumber, message);
  }

  // Send test booking notification to admin
  async sendTestBookingNotification(testData, adminNumber) {
    const message = this.createTestBookingMessage(testData);
    const formattedNumber = this.formatPhoneNumber(adminNumber);
    return await this.sendMessage(formattedNumber, message);
  }
}

module.exports = WhatsAppService;
