import { browser, element, by } from 'protractor';
import { SamplePage } from './sample.po';
import { MaterialDataPickerPO } from './material.datapicker.po';
import * as moment from 'moment';
import { MaterialSelectPO } from './material.select.po';

const po = new SamplePage();
const datapicker = new MaterialDataPickerPO();
const select = new MaterialSelectPO();

describe('Protractor Tutorial Page', function() {
  it('should have a title', async () => {
    await po.navigateTo();
    await po.valid();
    expect(po.calculate(1, 2)).toEqual('3');
  });

  describe('material data pciker', () => {
    beforeEach(async () => {
      await datapicker.navigateTo();
      await datapicker.valid();
    });

    const expPtn = async (m: moment.Moment) => {
      await datapicker.selectDataPicker(
        datapicker.datapickerOpen,
        m.year(),
        m.month(),
        m.date(),
      );
      const result = await datapicker.datapickerImput.getAttribute('value');
      expect(result).toBe(m.format('M/D/YYYY'));
    };

    it('now + 5 days', async () => expPtn(moment().add(5, 'd')));
    it('now - 5 days', async () => expPtn(moment().subtract(5, 'd')));
    it('now + 1 months', async () => expPtn(moment().add(1, 'M')));
    it('now - 1 months', async () => expPtn(moment().subtract(1, 'M')));
    it('now + 1 years', async () => expPtn(moment().add(1, 'y')));
    it('now - 1 years', async () => expPtn(moment().subtract(1, 'y')));
  });

  it('material select', async () => {
    await select.navigateTo();
    await select.valid();
    // await select.scrollToElement(select.select)
    await select.selectPulldownText(select.select, 'Pizza');
    expect(select.text).toContain('Pizza');
  });
});
