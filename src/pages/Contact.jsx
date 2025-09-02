import React, { useState } from 'react'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import portfolioData from '../data/portfolioData.json'
import { getIcon } from '../utils/iconUtils'
import Button from '../components/Button'
import { emailConfig } from '../config/emailConfig'

const Contact = () => {
  const { contact, socialLinks } = portfolioData
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // EmailJS configuration
      const { serviceID, templateID, publicKey } = emailConfig
      
      // Check if EmailJS is configured
      if (!serviceID || !templateID || !publicKey) {
        throw new Error('EmailJS is not configured. Please update your credentials in src/config/emailConfig.js')
      }
      
      // Send email using EmailJS
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toISOString(),
          to_email: 'nattwadee.wutt@gmail.com', // Your email
        },
        publicKey
      )
      
      console.log('Email sent successfully:', result)
      alert('Thank you for your message! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Sorry, there was an error sending your message. Please try again or contact me directly at nattwadee.wutt@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Header Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {contact.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {contact.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send me a message
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Let's connect
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  I'm always interested in new opportunities, whether that's a job, 
                  freelance project, or just a chat about technology. Don't hesitate to reach out!
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary-400 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {getIcon(item.icon, "w-6 h-6")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 leading-none">{item.label}</p>
                      <p className="text-gray-900 font-medium leading-none -mt-1">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability Status
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
                  <span className="font-medium text-primary-600">Available for work</span>
                </div>
                <p className="text-primary-700 text-sm">
                  I'm currently available for freelance projects and full-time opportunities.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
