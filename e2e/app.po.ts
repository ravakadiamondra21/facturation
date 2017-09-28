import { browser, element, by } from 'protractor';

export class PoseidonPage {
  navigateTo() {
    return browser.get('/');
  }
}
