import { by, element, ElementFinder } from 'protractor';
import * as moment from 'moment';
import { BasePageObject } from './basePO';

/**
 * angular material parent page object class
 * https://material.angular.io/
 */
export class AngularMaterialPO extends BasePageObject {
  constructor(protected url: string) {
    super(url);
  }

  /**
   * select pulldown
   * @param {ElementFineder} pulldownElement element
   * @param {string} targetText pulldown text
   */
  async selectPulldownText(pulldownElement: ElementFinder, targetText: string) {
    const selectOptonsFirst = this.byCSS(
      '.cdk-overlay-pane .mat-option:first-child',
    );
    const selectOptionAll = this.byCssAll('.cdk-overlay-pane .mat-option');

    await super.valid([pulldownElement]);
    await pulldownElement.click();
    await super.valid([selectOptonsFirst]);
    await super.visible([selectOptonsFirst]);

    const selected = selectOptionAll.filter(elem =>
      elem.getText().then(text => text === targetText),
    );

    if (await selected.count()) {
      await selected.first().click();
    } else {
      throw new Error(
        '[selectPulldownText] The specified pulldown does not exist',
      );
    }
    return super.inValid([selectOptonsFirst]);
  }

  /**
   * change datapicker contentsa
   * @param datapickerElement data picker element
   * @param year target year
   * @param month target month
   * @param day target day
   */
  async selectDataPicker(
    datapickerElement: ElementFinder,
    year: number,
    month: number,
    day: number,
  ) {
    const target = moment({
      year: year,
      month: month,
      day: day,
    });

    await super.valid([datapickerElement]);
    await datapickerElement.click();
    const popDatepicker = element(by.css('.mat-datepicker-popup'));
    const currentDATE = await popDatepicker
      .element(by.css('.mat-calendar-body-today'))
      .getText();
    const getCurDt = async () => {
      return moment(
        `${await popDatepicker
          .element(by.css('[aria-label="Choose month and year"]'))
          .getText()} ${currentDATE}`,
        'MMM YYYY D',
      );
    };

    await super.valid([popDatepicker]);

    const popDpPeriod = popDatepicker.element(
      by.css('.mat-calendar-period-button'),
    );
    const popDpPrev = popDatepicker.element(
      by.css('.mat-calendar-previous-button'),
    );
    const popDpNext = popDatepicker.element(
      by.css('.mat-calendar-next-button'),
    );
    await super.valid([popDpPeriod, popDpPrev, popDpNext]);

    const monthView = popDatepicker.element(by.css('mat-month-view'));
    const isMonth = await monthView.isPresent();
    if (!isMonth) {
      await popDpPeriod.click();
    }

    let curDT = await getCurDt();

    while (curDT.format('YYYYMM') !== target.format('YYYYMM')) {
      if (target.isAfter(curDT, 'month')) {
        await popDpNext.click();
      } else {
        await popDpPrev.click();
      }
      curDT = await getCurDt();
    }

    await monthView
      .all(by.css('table > tbody > tr > .mat-calendar-body-cell'))
      .filter(elem => {
        return elem.getText().then(txt => {
          const dexp = /[0-9]+/.exec(txt);
          if (dexp) {
            return dexp.pop() === target.date().toString();
          }
          return false;
        });
      })
      .each(elem => {
        if (elem) {
          elem.click();
        }
      });
    return super.inValid([monthView]);
  }
}
