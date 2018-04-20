import { element, by } from 'protractor';
import { AngularMaterialPO } from '../dist';

export class MaterialSelectPO extends AngularMaterialPO {
  public selectExample = element(by.css('select-overview-example'));
  public select = this.selectExample.element(by.css('mat-select'));
  public selectText = this.select.element(by.css('.mat-select-value'));

  constructor() {
    super('https://material.angular.io/components/select/overview');
  }

  valid() {
    return super.valid([this.selectExample, this.select]);
  }

  get text() {
    return this.selectText.getText();
  }
}
