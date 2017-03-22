import { AngularQueryBuilderPage } from './app.po';

describe('angular-query-builder App', () => {
  let page: AngularQueryBuilderPage;

  beforeEach(() => {
    page = new AngularQueryBuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
