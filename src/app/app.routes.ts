import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProyectsComponent } from './pages/proyects/proyects.component';
import { CertificatedComponent } from './pages/certificated/certificated.component';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { DescripcionComponent } from './pages/descripcion/descripcion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyectos', component: ProyectsComponent },
  { path: 'certificados', component: CertificatedComponent },
  { path: 'contacto', component: ContactMeComponent },
  { path: 'descripcion/:id', component: DescripcionComponent },
  { path: '**', redirectTo: '' },
];
