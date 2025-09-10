import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import portfolioData from '../data/portfolioData.json'
import Button from '../components/Button'
import AnimatedSection from '../components/AnimatedSection'

const ProjectDetail = () => {
  const { id } = useParams()
  const { projects } = portfolioData
  
  const project = projects.find(p => p.id === parseInt(id))
  
  // Handle multiple images - fallback to single image if images array doesn't exist
  const projectImages = project?.images || [project?.image].filter(Boolean)
  
  // Calculate pagination layout based on number of images
  const paginationConfig = useMemo(() => ({
    maxVisibleBullets: Math.min(projectImages.length, 5), // Limit visible bullets
    bulletSize: projectImages.length > 8 ? 36 : 48,
    bulletHeight: projectImages.length > 8 ? 24 : 32,
    containerMaxWidth: Math.min(projectImages.length * 56, 400),
    showScrollHint: projectImages.length > 5 // Show scroll indicators
  }), [projectImages.length])
  
  // Add hover effects and sliding functionality to pagination bullets
  useEffect(() => {
    const addInteractiveEffects = () => {
      const paginationContainer = document.querySelector('.swiper-pagination')
      
      // Clear any existing event listeners by replacing bullets with clones
      const existingBullets = document.querySelectorAll('.pagination-bullet')
      existingBullets.forEach(bullet => {
        bullet.replaceWith(bullet.cloneNode(true))
      })
      
      // Re-select after cloning to remove old listeners
      const cleanBullets = document.querySelectorAll('.pagination-bullet')
      
      cleanBullets.forEach((bullet) => {
        // Hover effects
        bullet.addEventListener('mouseenter', () => {
          bullet.style.opacity = '1'
          bullet.style.borderColor = 'rgba(255,255,255,0.5)'
          bullet.style.transform = 'scale(1.05)'
        })
        
        bullet.addEventListener('mouseleave', () => {
          if (!bullet.classList.contains('swiper-pagination-bullet-active')) {
            bullet.style.opacity = '0.7'
            bullet.style.borderColor = 'transparent'
            bullet.style.transform = 'scale(1)'
          }
        })
        
        // Click to scroll bullet into view
        bullet.addEventListener('click', () => {
          if (paginationContainer && projectImages.length > paginationConfig.maxVisibleBullets) {
            const containerRect = paginationContainer.getBoundingClientRect()
            const scrollLeft = bullet.offsetLeft - (containerRect.width / 2) + (bullet.offsetWidth / 2)
            
            paginationContainer.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            })
          }
        })
      })
      
      // Add wheel scrolling support
      if (paginationContainer && projectImages.length > paginationConfig.maxVisibleBullets) {
        paginationContainer.addEventListener('wheel', (e) => {
          e.preventDefault()
          paginationContainer.scrollLeft += e.deltaY > 0 ? 50 : -50
        })
        
        // Add touch scrolling indicators
        let isScrolling = false
        paginationContainer.addEventListener('scroll', () => {
          isScrolling = true
          paginationContainer.style.boxShadow = '0 0 20px rgba(255,255,255,0.1)'
          
          clearTimeout(isScrolling)
          isScrolling = setTimeout(() => {
            paginationContainer.style.boxShadow = 'none'
          }, 150)
        })
      }
    }
    
    // Add effects after ensuring Swiper is initialized
    const timer = setTimeout(addInteractiveEffects, 200)
    return () => clearTimeout(timer)
  }, [project.id, projectImages, paginationConfig]) // Added project.id as dependency
  
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
          <AnimatedSection animation="fadeInUp">
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
          </AnimatedSection>
        </div>
      </section>

      {/* Project Image Slider */}
      <section className=" bg-primary-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <AnimatedSection animation="scaleIn" delay={200}>
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[3/2] overflow-hidden bg-gray-100">
                  <Swiper
                    key={project.id} // Force recreation when project changes
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                      prevEl: '.swiper-button-prev-custom',
                      nextEl: '.swiper-button-next-custom',
                    }}
                    pagination={{
                      clickable: true,
                      dynamicBullets: projectImages.length > 5,
                      dynamicMainBullets: 3,
                      renderBullet: (index, className) => {
                        const image = projectImages[index];
                        const { bulletSize, bulletHeight } = paginationConfig;
                        return `<div class="${className} pagination-bullet" style="
                          width: ${bulletSize}px;
                          height: ${bulletHeight}px;
                          border-radius: 6px;
                          background-image: url('${image}');
                          background-size: cover;
                          background-position: center;
                          background-repeat: no-repeat;
                          opacity: 0.7;
                          cursor: pointer;
                          border: 2px solid transparent;
                          transition: all 0.3s ease;
                          margin: 0 ${projectImages.length > 8 ? 2 : 4}px;
                          display: inline-block;
                          flex-shrink: 0;
                        "></div>`;
                      },
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    loop={projectImages.length > 1}
                    className={`w-full h-full swiper-with-custom-pagination ${
                      projectImages.length > 8 ? 'many-images' : 
                      projectImages.length > 5 ? 'moderate-images' : 
                      'few-images'
                    }`}
                  >
                    {projectImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/1200x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  Custom Navigation Arrows
                  {projectImages.length > 1 && (
                    <>
                      <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full transition-all duration-300 opacity-60 hover:opacity-100 z-10">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full transition-all duration-300 opacity-60 hover:opacity-100 z-10">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Technologies */}
            <AnimatedSection animation="fadeInUp" delay={100}>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Related Projects</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <AnimatedSection
                  key={relatedProject.id}
                  animation="fadeInUp"
                  delay={index * 150}
                >
                  <Link
                    to={`/portfolio/projects/${relatedProject.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden block h-full"
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
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
