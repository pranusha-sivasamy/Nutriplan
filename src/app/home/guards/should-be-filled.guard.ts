import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentLeave } from 'src/app/auth/guards/unsaved-changes.guard';

@Injectable({
  providedIn: 'root',
})
export class ShouldBeFilledGuard implements CanDeactivate<CanComponentLeave> {
  canDeactivate(component: CanComponentLeave) {
    if (component.canLeave()) {
      return true;
    }
    return false;
  }
}
