'use strict';

describe('Edibles E2E Tests:', function () {
  describe('Test Edibles page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/edibles');
      expect(element.all(by.repeater('edible in edibles')).count()).toEqual(0);
    });
  });
});
