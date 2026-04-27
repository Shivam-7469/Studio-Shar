import React from 'react';
import { Home, User, Briefcase, Settings, Mail, Star, Layers, Map, Compass, Palette, Maximize } from 'lucide-react';
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Ethereal Villa',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600',
    description: 'A study in light and transparency, merging interior boundaries with the Mediterranean horizon.'
  },
  {
    id: '2',
    title: 'Monolith Workspace',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    description: 'Minimalist corporate environment focusing on cognitive clarity and structural elegance.'
  },
  {
    id: '3',
    title: 'Azure Loft',
    category: 'Boutique',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600',
    description: 'An urban sanctuary crafted with organic materials and custom-engineered stone textures.'
  },
  {
    id: '4',
    title: 'Symmetry Residence',
    category: 'Residential',
    imageUrl: 'https://i.im.ge/eB869G/a.kjla.jpg',
    description: 'Balanced geometries meeting tactile warmth in the heart of the city.'
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Residential Interior Design',
    description: 'Tailored living environments that reflect personal narratives through refined aesthetics.',
    icon: 'Home'
  },
  {
    title: 'Commercial & Office Interiors',
    description: 'Strategic spaces designed to foster productivity, brand identity, and human connection.',
    icon: 'Briefcase'
  },
  {
    title: 'Space Planning',
    description: 'Optimizing spatial flow and architectural logic to maximize functionality and comfort.',
    icon: 'Maximize'
  },
  {
    title: 'Furniture & Material Selection',
    description: 'Curating a palette of high-end materials and bespoke furniture to define character.',
    icon: 'Palette'
  },
  {
    title: 'Turnkey Interior Solutions',
    description: 'End-to-end management from concept visualization to final realization and styling.',
    icon: 'Layers'
  },
  {
    title: 'Styling & Décor Consultation',
    description: 'The final layer of artistry, selecting objects that complete the atmosphere.',
    icon: 'Star'
  }
];
