import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { BuilderComponent } from './pages/builder/builder.component';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'builder', component: BuilderComponent },
    { path: 'resume', component: ResumeFormComponent },
    { path: 'templates', component: TemplatePreviewComponent },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
];