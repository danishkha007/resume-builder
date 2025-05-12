import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroductionComponent } from '../../layout/introduction/introduction.component';
import { OfferComponent } from '../../layout/offer/offer.component';
import { TemplatesComponent } from '../../layout/templates/templates.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, IntroductionComponent, OfferComponent, TemplatesComponent, RouterModule],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
