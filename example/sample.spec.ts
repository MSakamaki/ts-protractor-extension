import { browser, element, by } from 'protractor';
import { SamplePage } from './sample.po';

describe('Protractor Tutorial Page', function() {
  const po = new SamplePage();

  beforeEach(() => po.navigateTo());

  it('should have a title', function() {
    expect(po.calculate(1, 2)).toEqual('3');
  });
});
