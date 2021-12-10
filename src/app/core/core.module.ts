import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoadedOnceGuard } from './loaded-once.guard';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IsLoadingService } from './services/isloading.service';
import { ThemeService } from './services/theme-manager.service';
import { AuthInterceptor } from './auth.interceptor';
import { CoreMaterialModule } from './material/material.module';
import { ErrorComponent } from './error-interceptor/error/error.component';
import { ThemesMenuComponent } from './themes/themes-menu.component';
import { ErrorInterceptor } from './error-interceptor/error-interceptor';
import { IsloadingComponent } from './isloading/isloading.component';
import { ScrolledToDirective } from './track-scroll-position.diretive';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    // SnackBarComponent,
    ErrorComponent,
    ThemesMenuComponent,
    IsloadingComponent,
    ScrolledToDirective,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    // SnackBarComponent,
    ThemesMenuComponent,
    IsloadingComponent,
    ScrolledToDirective,
  ],
  providers: [
    IsLoadingService,
    ThemeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  entryComponents: [
    // SnackBarComponent,
    ErrorComponent,
  ] // Notifies angular that these components need to be used during bootstraping
})
export class CoreModule extends LoadedOnceGuard { // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}

