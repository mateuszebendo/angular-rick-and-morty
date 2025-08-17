import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertEnum } from 'src/app/enums/alert-enum';
import { Alert } from 'src/app/models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);

  $alert = this.alertSubject.asObservable();

  constructor() { }

  showSuccessAlert(message: string): void {
    this.alertSubject.next({ message, type: AlertEnum.Success })
  }

  showErrorAlert(message: string): void {
    this.alertSubject.next({ message, type: AlertEnum.Danger })
  }

  showWarningAlert(message: string): void{ 
    this.alertSubject.next({ message, type: AlertEnum.Warning })
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}
