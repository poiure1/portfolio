import React from 'react'
import { Heart, ArrowUp } from 'lucide-react'
import portfolioData from '../data/portfolioData.json'
import { getIcon } from '../utils/iconUtils'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { personal, navigation, socialLinks, contact } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 ">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">{navigation.brand}</h3>
            <p className="text-gray-400 leading-relaxed">
              {personal.bio}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {getIcon(social.icon, "w-5 h-5")}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {navigation.links.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>{contact.location}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            {/* <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for work
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © {currentYear} {personal.name}
            </p>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-2 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
