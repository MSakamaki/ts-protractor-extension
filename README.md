# typescript extension class for ptoractor


## base page object class

use

```typescript

import { BasePageObject } from 'ts-protractor-extension';

export class SamplePage extends BasePageObject {
  constructor() {
    super('http://juliemr.github.io/protractor-demo/');
  }
}

const po = new SamplePage();

beforeEach(() => po.navigateTo());

it('test', function() {
  expect(...).toEqual(...);
});

```

## material page object base class

use

```typescript

import { AngularMaterialPO } from 'ts-protractor-extension';

export class SamplePage extends AngularMaterialPO {
  constructor() {
    super('http://juliemr.github.io/protractor-demo/');
  }
}

```

## see [exmaple](./example)
