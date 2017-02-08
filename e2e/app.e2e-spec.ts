import { TestApiPage } from './app.po';

describe('test-api App', function() {
  let page: TestApiPage;

  beforeEach(() => {
    page = new TestApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
