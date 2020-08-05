import { Injectable } from '@angular/core';
import * as Immutable from 'immutable';
import { TreoNavigationItem } from '../../@treo/components/navigation';
import {
  authenticatedDefaultNavigation,
  authenticatedHorizontalNavigation,
  compactNavigation,
  defaultNavigation,
  futuristicNavigation,
  horizontalNavigation,
} from '../data/navigation.data';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {
  }

  public getNavigationConfig(isAuthenticated: boolean = false): { [key: string]: TreoNavigationItem[] } {
    return {
      compact: Immutable.List(compactNavigation).toArray(),
      default: isAuthenticated
               ? Immutable.List(authenticatedDefaultNavigation).toArray()
               : Immutable.List(defaultNavigation).toArray(),
      futuristic: Immutable.List(futuristicNavigation).toArray(),
      horizontal: isAuthenticated
                  ? Immutable.List(authenticatedHorizontalNavigation).toArray()
                  : Immutable.List(horizontalNavigation).toArray(),
    };
  }
}
