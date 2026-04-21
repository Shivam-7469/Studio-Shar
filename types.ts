
export enum PageType {
  HOME = 'home',
  ABOUT = 'about',
  PROJECTS = 'projects',
  SERVICES = 'services',
  CONTACT = 'contact'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}
