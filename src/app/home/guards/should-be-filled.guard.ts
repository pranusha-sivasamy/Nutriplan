import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentLeave } from 'src/app/auth/guards/unsaved-changes.guard';

@Injectable({
  providedIn: 'root',
})
export class ShouldBeFilledGuard implements CanDeactivate<CanComponentLeave> {
  async canDeactivate(component: CanComponentLeave) {
    if (await component.canLeave()) {
      return true;
    }
    return false;
  }
}
