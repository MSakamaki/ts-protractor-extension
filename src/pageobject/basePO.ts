import {
  browser,
  by,
  element,
  ElementFinder,
  ElementArrayFinder,
  ExpectedConditions,
} from 'protractor';
import { promise } from 'selenium-webdriver';

const Config = {
  ELEMENT_SEARCH_WAIT: 5000,
};
const EC = ExpectedConditions;

export class BasePageObject {
  get URL() {
    return this.url;
  }

  constructor(protected url: string) {}

  /**
   * navigate constractor url
   */
  navigateTo() {
    return browser.get(this.URL);
  }

  /**
   * exists Element
   * @param element check element
   * @param errorMessage error message
   */
  exists(
    elm: ElementFinder,
    errorMessage: string = `element not found`,
  ): promise.Promise<ElementFinder> {
    return browser
      .wait(EC.presenceOf(elm), Config.ELEMENT_SEARCH_WAIT, errorMessage)
      .then(() => elm);
  }

  /**
   * check to element clickd
   */
  protected btnClick(btn: ElementFinder): promise.Promise<void> {
    return this.exists(btn).then(elm => elm.click());
  }

  /** wait page rendaling */
  protected valid(elms: ElementFinder[]): promise.Promise<{}> {
    return promise.all(
      elms.map(elm => {
        return browser.wait(
          EC.presenceOf(elm),
          Config.ELEMENT_SEARCH_WAIT,
          'element invalid',
        );
      }),
    );
  }

  /** wait page not rendaling */
  protected inValid(elms: ElementFinder[]): promise.Promise<{}> {
    return promise.all(
      elms.map(elm => {
        return browser.wait(
          EC.not(EC.presenceOf(elm)),
          Config.ELEMENT_SEARCH_WAIT,
          'element invalid',
        );
      }),
    );
  }

  /** Make sure the page is rendered and valid. */
  protected validAll(elms: ElementArrayFinder): promise.Promise<{}> {
    return elms.map(elm => {
      if (elm) {
        return browser.wait(
          EC.presenceOf(elm),
          Config.ELEMENT_SEARCH_WAIT,
          'element invalid',
        );
      }
      return promise.rejected('element unidefined!');
    });
  }

  /** Verify that the page is rendered, valid, and operational. */
  protected visible(elms: ElementFinder[]): promise.Promise<{}> {
    return promise.all(
      elms.map(elm => {
        return browser.wait(
          EC.visibilityOf(elm),
          Config.ELEMENT_SEARCH_WAIT,
          'element invalid',
        );
      }),
    );
  }

  /** Verify that the page is rendered, valid, and operational. */
  protected visibleAll(elms: ElementArrayFinder): promise.Promise<{}> {
    return elms.map((elm: ElementFinder) => {
      return browser.wait(
        EC.visibilityOf(elm),
        Config.ELEMENT_SEARCH_WAIT,
        'element invalid',
      );
    });
  }

  /**
   * Alias of element(by.css('xxxx'))
   */
  protected byCSS(selector: string, parentElm?: ElementFinder): ElementFinder {
    if (parentElm) {
      return parentElm.element(<any>by.css(selector));
    } else {
      return element(<any>by.css(selector));
    }
  }

  /**
   * Alias of element.all(by.css('xxxx'))
   * @param selector cssセレクタ
   */
  protected byCssAll(
    selector: string,
    parentElm?: ElementFinder,
  ): ElementArrayFinder {
    if (parentElm) {
      return parentElm.all(<any>by.css(selector));
    } else {
      return element.all(<any>by.css(selector));
    }
  }

  /**
   * Scroll to a specific element.
   * @param {ElementFinder} elm scroll element
   * @param {String} scrollBody Uniquely obtainable selectors to scroll
   * @example
   * // promise chain.
   *   .then(()=> kacTest.po.iaasOrder.network.scrollToElement(element, '.main'))
   *
   * @return {Promise}
   */
  public scrollToElement(elm: ElementFinder, scrollBody = 'body') {
    return elm
      .isPresent()
      .then(() => elm.getLocation())
      .then(position => {
        return browser.executeScript(
          `var body = document.querySelector("${scrollBody}");var scrollHeight = Math.min(${
            position.y
          }, body.scrollHeight); body.scrollTop = scrollHeight`,
        );
      });
  }

  /** select mouse focus */
  public onMouseFocus(elm: ElementFinder) {
    return browser
      .actions()
      .mouseMove(elm)
      .perform();
  }
}
