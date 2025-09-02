import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import portfolioData from '../data/portfolioData.json'
import Button from '../components/Button'

const ProjectDetail = () => {
  const { id } = useParams()
  const { projects } = portfolioData
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const project = projects.find(p => p.id === parseInt(id))
  
  // Handle multiple images - fallback to single image if images array doesn't exist
  const projectImages = project?.images || [project?.image].filter(Boolean)
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === projectImages.length - 1 ? 0 : prev + 1
    )
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectImages.length - 1 : prev - 1
    )
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Button to="/projects" variant="primary">
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className=" bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <Link 
            to="/portfolio/projects"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {(project.categories || [project.category]).map((category, index) => (
              <span 
                key={index}
                className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          
          {project.description && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {project.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <Button 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
            )}
            {project.demo && (
              <Button 
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Project Image Slider */}
      <section className=" bg-primary-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full relative">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[3/2]">
                <img 
                  src={projectImages[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-auto h-full object-cover mx-auto"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/1200x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                  }}
                />
                
                {/* Navigation arrows - only show if more than 1 image */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image indicators - only show if more than 1 image */}
              {projectImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-white text-gray-700 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/portfolio/projects/${relatedProject.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedProject.title}
                    </h4>
                    <div className="flex gap-1">
                      {(relatedProject.categories || [relatedProject.category]).slice(0, 2).map((cat, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
