import React from 'react'
import { Download, MapPin, Calendar, Award } from 'lucide-react'
import portfolioData from '../data/portfolioData.json'
import Button from '../components/Button'
import AnimatedSection from '../components/AnimatedSection'

const About = () => {
  const { about, personal } = portfolioData

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  About <span className="text-primary-500">Me</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {about.intro}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {about.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personal.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available for freelance</span>
                  </div>
                </div>
                
                <Button 
                  href={personal.resumeUrl} 
                  variant="primary" 
                  size="md"
                  download
                >
                  <Download className="w-5 h-5" /> Download Resume
                </Button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeInRight" delay={200}>
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={personal.profileImage || "src/assets/images/profile.jpg"} 
                    alt="Profile" 
                    className="rounded-2xl shadow-2xl w-80 h-96 object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-400 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {about.skills.map((skillSet, index) => (
              <AnimatedSection 
                key={skillSet.category}
                animation="scaleIn"
                delay={index * 150}
                className="bg-white rounded-2xl px-8 pb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-primary-200"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {skillSet.category}
                  </h3>
                </div>
                <div className="space-y-3">
                  {skillSet.items.map((skill) => (
                    <div 
                      key={skill} 
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 group/item"
                    >
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 group-hover/item:scale-125 transition-transform duration-200"></div>
                      <span className="text-gray-700 font-medium group-hover/item:text-primary-700 transition-colors duration-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My journey in the world of development and the experiences that shaped me.
            </p>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            {about.timeline.map((item, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInLeft"
                delay={index * 200}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index !== about.timeline.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200"></div>
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <span className="text-sm font-medium text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-primary-600 font-medium mb-2">{item.company}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
