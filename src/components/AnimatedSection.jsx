import React from 'react'
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation'

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 600,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation(threshold, triggerOnce)
  const animationClasses = animationVariants[animation]

  return (
    <div
      ref={ref}
      className={`transition-all duration-${duration} ease-out ${
        isVisible ? animationClasses.visible : animationClasses.hidden
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
