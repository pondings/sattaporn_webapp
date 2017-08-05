import { SattapornWebappPage } from './app.po';

describe('sattaporn-webapp App', () => {
  let page: SattapornWebappPage;

  beforeEach(() => {
    page = new SattapornWebappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
