// WhatsApp Service Utility - Direct API Integration
export class WhatsAppService {
  constructor(apiBaseUrl = (import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5000')) {
    this.apiBaseUrl = apiBaseUrl;
    this.adminNumber = (import.meta?.env?.VITE_ADMIN_WHATSAPP_NUMBER || '918605941731');
  }

  // Send booking form data via WhatsApp API
  async  sendBookingNotification(formData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { 
          success: true, 
          message: 'Booking submitted and admin notified via WhatsApp!',
          messageId: result.messageId
        };
      } else {
        throw new Error(result.message || 'Failed to send WhatsApp notification');
      }
    } catch (error) {
      console.error('WhatsApp API Error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Send test booking notification via WhatsApp API
  async sendTestBookingNotification(testData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/book-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { 
          success: true, 
          message: 'Test booking submitted and admin notified via WhatsApp!',
          messageId: result.messageId
        };
      } else {
        throw new Error(result.message || 'Failed to send WhatsApp notification');
      }
    } catch (error) {
      console.error('WhatsApp API Error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Fallback method: Send via WhatsApp Web (if API fails)
  sendViaWhatsAppWeb(formData, type = 'booking') {
    let message = '';
    
    if (type === 'callback') {
      message = `📞 *Callback Request*

${formData.message}

📅 *Request Time:* ${formData.timestamp}

Please call back the patient as soon as possible.`;
    } else if (type === 'booking') {
      const { name, phone, address, testType, customTestType } = formData;
      const finalTestType = testType === 'other' ? customTestType : testType;
      
      message = `🏥 *New Test Booking Request*

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
    } else if (type === 'package') {
      message = `🏥 *New Package Booking Request*

📦 *Package Details:*
• Package Name: ${formData.name}
• Price: ${formData.price}
• Type: Health Package

📅 *Booking Time:* ${new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

Please contact the patient for package booking details.`;
    } else if (type === 'pathology_booking') {
      message = `🏥 *New Pathology Booking Request*

👤 *Patient Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Address: ${formData.address}

🧪 *Test Details:*
• Category: ${formData.testType}
• Test Name: ${formData.customTestType}
• Price: ${formData.testPrice}

📅 *Booking Time:* ${new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

Please contact the patient for pathology booking details.`;
    } else {
      message = `🏥 *New Test Booking Request*

🧪 *Test Details:*
• Test Name: ${formData.name}
• Price: ${formData.price}

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
    
    const adminNumber = this.adminNumber;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    return whatsappUrl;
  }

  // Check if backend API is available
  async checkApiHealth() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/health`);
      const result = await response.json();
      return result.status === 'Server is running!';
    } catch (error) {
      return false;
    }
  }
}

// Create default instance
export const whatsappService = new WhatsAppService();

// Export individual functions for easy use
export const sendBookingWhatsApp = (formData) => whatsappService.sendBookingNotification(formData);
export const sendTestBookingWhatsApp = (testData) => whatsappService.sendTestBookingNotification(testData);
