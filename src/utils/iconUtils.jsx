import { 
  Code, 
  Palette, 
  Smartphone, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter,
  Heart,
  ArrowUp,
  ArrowRight,
  Download,
  Send,
  ExternalLink,
  Filter,
  Menu,
  X,
  Calendar,
  Award,
  Server,
  Layers,
  Database,
  Zap,
  FileText,
  Globe
} from 'lucide-react'

export const iconMap = {
  Code,
  Palette,
  Smartphone,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Heart,
  ArrowUp,
  ArrowRight,
  Download,
  Send,
  ExternalLink,
  Filter,
  Menu,
  X,
  Calendar,
  Award,
  Server,
  Layers,
  Database,
  Zap,
  FileText,
  Globe
}

export const getIcon = (iconName, className = "w-6 h-6") => {
  const IconComponent = iconMap[iconName]
  return IconComponent ? <IconComponent className={className} /> : null
}

export const getIconComponent = (iconName) => {
  const IconComponent = iconMap[iconName]
  return IconComponent || Code // fallback to Code icon if not found
}
