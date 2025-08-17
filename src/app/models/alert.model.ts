import { AlertEnum } from "../enums/alert-enum";

export interface Alert {
    message: string | null; 
    type: AlertEnum;
}
