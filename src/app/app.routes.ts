import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuilderComponent } from './pages/builder/builder.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'builder', component: BuilderComponent },
    { path: 'templates', loadComponent: () => import('@/pages/templates/templates.component').then(m => m.TemplatesComponent) },
    { path: 'login', loadComponent: () => import('@/pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'sign-up', loadComponent: () => import('@/pages/sign-up/sign-up.component').then(m => m.SignUpComponent) },
    { path: 'home', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }