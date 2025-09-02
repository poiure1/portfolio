import React from 'react'
import { ArrowRight, Download, Code, Palette } from 'lucide-react'
import portfolioData from '../data/portfolioData.json'
import { getIcon } from '../utils/iconUtils'
import Button from '../components/Button'

const Home = () => {
  const { personal, technologies, sections, socialLinks } = portfolioData

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pb-24 lg:pb-32 bg-gradient-to-br from-primary-50 via-white to-accent/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="space-y-10 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  {/* Hi, I'm{' '} */}
                  <span className="text-primary-500">{personal.name}</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl text-gray-600 font-medium">
                  {personal.title}
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {personal.bio}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button to="/portfolio/projects" variant="primary" size="md">
                  View My Work <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  href={personal.resumeUrl} 
                  variant="secondary" 
                  size="md"
                  download
                >
                  <Download className="w-5 h-5" /> Download Resume
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-6 pt-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.platform}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-primary-500 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {getIcon(social.icon, "w-6 h-6")}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end animate-fade-in-up">
              <div className="relative">
                <div className="w-80 h-80 bg-primary-400 rounded-full p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden">
                    <img 
                      src={personal.profileImage || "src/assets/images/profile.jpg"} 
                      alt={`${personal.name} - Profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center animate-bounce">
                  <Code className="w-8 h-8 text-primary-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center animate-bounce delay-300">
                  <Palette className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
              {sections.technologies.title}
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {technologies.map((tech, index) => (
              <span 
                key={tech}
                className="bg-white px-8 py-4 rounded-full shadow-md font-medium text-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary-200 text-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8">
            {sections.cta.title}
          </h3>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {sections.cta.subtitle}
          </p>
          <Button 
            to="/portfolio/contact" 
            variant="white" 
            size="xl"
          >
            {sections.cta.buttonText} <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home
