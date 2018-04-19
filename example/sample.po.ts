import { browser, element, by } from 'protractor';

import { BasePageObject } from '../dist';

export class SamplePage extends BasePageObject {
  public firstNumber = element(by.model('first'));
  public secondNumber = element(by.model('second'));
  public goButton = element(by.id('gobutton'));
  public latestResult = element(by.binding('latest'));

  constructor() {
    super('http://juliemr.github.io/protractor-demo/');
  }

  valid() {
    return super.valid([
      this.firstNumber,
      this.secondNumber,
      this.goButton,
      this.latestResult,
    ]);
  }

  public async calculate(fast: number, second: number) {
    await this.firstNumber.sendKeys(fast);
    await this.secondNumber.sendKeys(second);
    await super.btnClick(this.goButton);
    return this.latestResult.getText();
  }
}
