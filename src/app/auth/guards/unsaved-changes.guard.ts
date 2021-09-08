import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
// import { CanComponentLeave } from '../interfaces/can-component-leave';//??

export interface CanComponentLeave {
  canLeave(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentLeave> {
  canDeactivate(component: CanComponentLeave) {
    if (component.canLeave()) {
      return true;
    }
    return false;
  }
}
