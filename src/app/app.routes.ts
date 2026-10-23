import { Routes } from '@angular/router';
export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Maximiliano Marigno · Software Developer'},
  {path: 'proyectos/:id', loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)},
  {path: 'descripcion/:id', loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)},
  {path: 'proyectos', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: {section: 'trabajos'}},
  {path: 'certificados', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: {section: 'formacion'}},
  {path: 'contacto', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: {section: 'contacto'}},
  {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Página no encontrada · Maximiliano Marigno'},
];
