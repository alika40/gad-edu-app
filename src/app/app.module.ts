import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { CoursesComponent } from './courses/courses/courses.component';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    MaterialModule,
    CoreModule,           // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule,         // Shared (multi-instance) objects
    
  ],
  // providers: [ ThemeService ],
  bootstrap: [AppComponent],

})
export class AppModule { }
