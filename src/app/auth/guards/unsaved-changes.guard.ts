import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentLeave {
  canLeave(): Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentLeave> {
  async canDeactivate(component: CanComponentLeave) {
    if (await component.canLeave()) {
      return true;
    }
    return false;
  }
}
