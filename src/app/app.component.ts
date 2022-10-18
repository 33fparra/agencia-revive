import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import AOS from "aos";

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>'
})
export class AppComponent {
  title = 'probisa-page';
  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    translate.addLangs(['es', 'en']);
    AOS.init();
  }
}
