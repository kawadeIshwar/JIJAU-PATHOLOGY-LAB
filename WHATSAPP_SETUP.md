# WhatsApp Integration Setup Guide

This guide explains how to implement WhatsApp notifications for form submissions in the Jijau Pathology Laboratory website.

## 🚀 Quick Start (Simple Method)

The simplest method is already implemented and works immediately:

### How it works:
1. When a user submits the booking form, a WhatsApp message is automatically created
2. WhatsApp Web/App opens with a pre-filled message to the admin
3. Admin receives the message with all form details

### No setup required - it works out of the box!

## 📱 Advanced Setup (WhatsApp Business API)

For automated messaging without opening WhatsApp, you can use the WhatsApp Business API:

### Prerequisites:
1. WhatsApp Business Account
2. Facebook Business Account
3. WhatsApp Business API access

### Setup Steps:

#### 1. Get WhatsApp Business API Credentials
- Go to [Facebook Developers](https://developers.facebook.com/)
- Create a new app and add WhatsApp Business API
- Get your access token and phone number ID

#### 2. Configure Environment Variables
Create a `.env` file in the backend folder:
```env
WHATSAPP_TOKEN=your_whatsapp_business_api_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
ADMIN_WHATSAPP_NUMBER=918605941731
PORT=5000
```

#### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4. Start the Backend Server
```bash
npm start
```

#### 5. Update Frontend API Calls
Modify the frontend to use the backend API instead of direct WhatsApp links.

## 🔧 Configuration Options

### Change Admin WhatsApp Number
In `frontend/src/utils/whatsappService.js`:
```javascript
export const whatsappService = new WhatsAppService('your_admin_number');
```

### Customize Message Format
Edit the message templates in `whatsappService.js`:
- `createBookingMessage()` - For booking form submissions
- `createTestBookingNotification()` - For individual test bookings

## 📋 Message Templates

### Booking Form Message:
```
🏥 *New Test Booking Request*

👤 *Patient Details:*
• Name: [Patient Name]
• Phone: [Phone Number]
• Address: [Address]

🧪 *Test Requested:*
• Test Type: [Test Type]

📅 *Booking Time:* [Current Date/Time]

Please contact the patient as soon as possible.
```

### Individual Test Booking Message:
```
🏥 *New Test Booking Request*

🧪 *Test Details:*
• Test Name: [Test Name]
• Price: [Price]

📅 *Booking Time:* [Current Date/Time]

Please contact the patient for further details.
```

## 🛠️ Troubleshooting

### WhatsApp doesn't open
- Ensure the phone number format is correct (country code + number)
- Check if WhatsApp is installed on the device
- Try using WhatsApp Web as fallback

### Messages not formatted properly
- Check the message template in `whatsappService.js`
- Ensure special characters are properly encoded

### Backend API issues
- Verify environment variables are set correctly
- Check WhatsApp Business API credentials
- Ensure the phone number is verified in WhatsApp Business

## 🔒 Security Considerations

1. **Phone Number Privacy**: Never expose admin phone numbers in client-side code
2. **API Keys**: Keep WhatsApp Business API tokens secure
3. **Rate Limiting**: Implement rate limiting to prevent spam
4. **Validation**: Validate all form inputs before sending messages

## 📞 Support

For technical support or questions about the WhatsApp integration:
- Check the console for error messages
- Verify network connectivity
- Ensure all dependencies are installed correctly

## 🎯 Features Implemented

✅ **Form Submission Notifications**: Automatic WhatsApp messages for booking forms
✅ **Individual Test Bookings**: WhatsApp notifications for specific test bookings
✅ **Message Templates**: Professional, formatted messages with emojis
✅ **Error Handling**: Graceful fallbacks if WhatsApp fails
✅ **Responsive Design**: Works on desktop and mobile
✅ **Multiple Admin Numbers**: Easy to configure different admin numbers

## 🚀 Future Enhancements

- [ ] WhatsApp Business API integration
- [ ] Email notifications as backup
- [ ] SMS notifications
- [ ] Admin dashboard for managing notifications
- [ ] Automated responses
- [ ] Message scheduling
- [ ] Analytics and reporting
