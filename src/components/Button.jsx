import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  to, 
  onClick, 
  disabled = false, 
  type = 'button',
  download,
  target,
  rel,
  className = '',
  ...props 
}) => {
  // Base styles that all buttons share
  const baseStyles = 'inline-flex items-center justify-center gap-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
  
  // Variant styles
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    white: 'bg-white text-primary-500 hover:bg-gray-50'
  }
  
  // Size styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-lg'
  }
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
  
  // Combine all styles
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`
  
  // If it's a React Router Link
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    )
  }
  
  // If it's an external link
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        download={download}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    )
  }
  
  // If it's a regular button
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
