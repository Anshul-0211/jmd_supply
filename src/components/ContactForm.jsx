import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS send with proper template parameters
      const result = await emailjs.send(
        'service_ig6x33h',
        'template_pcydbuy',
        {
          user_name: formData.name,
          user_email: formData.email,
          user_subject: formData.subject,
          user_message: formData.message,
        },
        'Wpd227aRe2nu99L-V'
      );

      console.log('✅ Email sent successfully:', result.text);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('❌ Failed to send email:');
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      console.error('Full error:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your Phone Number here..."
            rows="5"
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transform hover:scale-[1.02] transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            ✓ Message sent successfully! We'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            ✗ Failed to send message. Please try again or contact us directly.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm; 