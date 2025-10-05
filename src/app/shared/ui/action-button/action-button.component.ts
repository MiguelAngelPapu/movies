import { Component, input } from '@angular/core';

@Component({
  selector: 'action-button',
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent {
  text = input<string | undefined>(undefined);
  style = input<string>('primary');
  icon = input<string>('');
}
