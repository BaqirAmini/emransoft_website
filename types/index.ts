export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  slogan: string
  features: string[]
  icon: string
  color: string
  gradient: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface Statistic {
  id: string
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}
