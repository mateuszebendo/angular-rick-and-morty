import { Component, Input, OnInit } from '@angular/core';
import { AlertEnum } from 'src/app/enums/alert-enum';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message" class="alert alert-{{ type.toString() }}" role="alert">
      {{ message }}
    </div>
  `,
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Input() type: AlertEnum = AlertEnum.Success;
}
