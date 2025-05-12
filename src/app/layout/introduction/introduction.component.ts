import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  imports: [RouterModule],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class IntroductionComponent {
}
