import { element, by } from 'protractor';
import { AngularMaterialPO } from '../dist';

export class MaterialDataPickerPO extends AngularMaterialPO {
  public datapicker = element(by.css('datepicker-overview-example'));
  public datapickerImput = this.datapicker.element(
    by.css('.mat-input-element'),
  );
  public datapickerOpen = this.datapicker.element(
    by.css('button[aria-label="Open calendar"]'),
  );

  constructor() {
    super('https://material.angular.io/components/datepicker/overview');
  }

  valid() {
    return super.valid([
      this.datapicker,
      this.datapickerImput,
      this.datapickerOpen,
    ]);
  }
}
