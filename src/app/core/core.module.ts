import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { CoreMaterialModule } from './material/material.module';

import { LoadedOnceGuard } from './loaded-once.guard';

import { IsLoadingService } from './services/isloading.service';
import { ThemeService } from './services/theme-manager.service';
import { SearchService } from './services/search.service';

import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error-interceptor/error-interceptor';

import { ScrolledToDirective } from './track-scroll-position.diretive';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error-interceptor/error/error.component';
import { ThemesMenuComponent } from './themes/themes-menu.component';
import { IsloadingComponent } from './isloading/isloading.component';
import { SearchComponent } from './search/search.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SnackBarService } from './services/snack-bar.service';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SnackBarComponent,
    ErrorComponent,
    ThemesMenuComponent,
    IsloadingComponent,
    SearchComponent,
    ScrolledToDirective,
    Error404Component,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    SnackBarComponent,
    ThemesMenuComponent,
    IsloadingComponent,
    SearchComponent,
    ScrolledToDirective,
  ],
  providers: [
    IsLoadingService,
    ThemeService,
    SearchService,
    SnackBarService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}
  ],
  entryComponents: [
    SnackBarComponent,
    ErrorComponent,
  ] // Notifies angular that these components need to be used during bootstraping
})
export class CoreModule extends LoadedOnceGuard { // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}

