import { PersonnelsystemPage } from './app.po';

describe('personnelsystem App', () => {
  let page: PersonnelsystemPage;

  beforeEach(() => {
    page = new PersonnelsystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
