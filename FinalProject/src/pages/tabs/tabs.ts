import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ForPage } from '../for/for';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ForPage;
  tab2Root = ForPage;
  tab3Root = AboutPage;
  tab5Root = ContactPage;

  constructor() {

  }
}
