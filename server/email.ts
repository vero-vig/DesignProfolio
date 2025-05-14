import { MailService } from '@sendgrid/mail';
import { ContactMessage } from '@shared/schema';

// Initialize SendGrid with API key
const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

// Function to send contact form submissions via email
export async function sendContactFormEmail(contactMessage: ContactMessage): Promise<boolean> {
  try {
    // Format the email content
    const emailContent = `
Name: ${contactMessage.name}
Email: ${contactMessage.email}
Subject: ${contactMessage.subject}

Message:
${contactMessage.message}
    `;
    
    // Create HTML version
    const htmlContent = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${contactMessage.name}</p>
<p><strong>Email:</strong> ${contactMessage.email}</p>
<p><strong>Subject:</strong> ${contactMessage.subject}</p>
<h3>Message:</h3>
<p>${contactMessage.message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Send email using SendGrid
    await mailService.send({
      to: contactMessage.recipient || 'veronica.vignoni@gmail.com', // Default recipient if not specified
      from: 'veronica.vignoni@gmail.com', // Using your email as sender (must be verified in SendGrid)
      subject: `Portfolio Contact: ${contactMessage.subject}`,
      text: emailContent,
      html: htmlContent,
    });
    
    console.log(`Email sent successfully to ${contactMessage.recipient}`);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    
    // Log detailed SendGrid error information if available
    if (error.response) {
      console.error('SendGrid error details:');
      console.error('Status code:', error.response.statusCode);
      console.error('Headers:', error.response.headers);
      console.error('Response body:', error.response.body);
    }
    
    return false;
  }
}