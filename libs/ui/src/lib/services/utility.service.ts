import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {
  }

  public static clearSubscriptions(subscriptions: Subscription[]): void {
    subscriptions.forEach(
      (subscription) => {
        if (!subscription) {
          return true;
        }

        subscription.unsubscribe();
      },
    );

    subscriptions.fill(null);
  }

  public static convertStringToInputDate(dateString: string): string {
    const d = new Date(Date.parse(dateString));
    const year = d.getFullYear();
    const month = (
      '0' + (
      d.getMonth() + 1
      )
    ).slice(-2);
    const date = (
      '0' + d.getDate()
    ).slice(-2);

    return `${year}-${month}-${date}`;
  }

  public static convertStringToInputTime(dateString: string): string {
    const d = new Date(Date.parse(dateString));
    const hour = (
      '0' + (
        d.getHours()
      )
    ).slice(-2);
    const minute = (
      '0' + (
        d.getMinutes()
      )
    ).slice(-2);

    return `${hour}:${minute}`;
  }

  public static convertDateToInputDate(d: Date): string {
    const year = d.getFullYear();
    const month = (
      '0' + (
      d.getMonth() + 1
      )
    ).slice(-2);
    const date = (
      '0' + d.getDate()
    ).slice(-2);

    return `${year}-${month}-${date}`;
  }

  public static convertDateToInputDateTime(d: Date): string {
    const year = d.getFullYear();
    const month = (
      '0' + (
      d.getMonth() + 1
      )
    ).slice(-2);
    const date = (
      '0' + d.getDate()
    ).slice(-2);

    const hour = (
      '0' + (
        d.getHours()
      )
    ).slice(-2);
    const minute = (
      '0' + (
        d.getMinutes()
      )
    ).slice(-2);

    return `${year}-${month}-${date} ${hour}:${minute}`;
  }

  public isJSON(value: string): boolean {
    if (/^\s*$/.test(value)) { return false; }
    value = value.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    value = value.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    value = value.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (
      /^[\],:{}\s]*$/
    ).test(value);
  }
}
