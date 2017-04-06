import { HogcastPage } from './app.po';

describe('hogcast App', () => {
  let page: HogcastPage;

  beforeEach(() => {
    page = new HogcastPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
