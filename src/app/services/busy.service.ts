import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor() { }

  async thisIsABlacboxYouCannotChange(n: number): Promise<number> {
    await this.delay(n % 5 * 1000);
    console.log('hard', n);
    return n;
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }
}
