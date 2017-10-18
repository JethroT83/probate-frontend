import { ProbateFrontendPage } from './app.po';

describe('probate-frontend App', () => {
  let page: ProbateFrontendPage;

  beforeEach(() => {
    page = new ProbateFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
