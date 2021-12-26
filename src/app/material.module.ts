import { NgModule } from '@angular/core';
// import {CdkTableModule} from '@angular/cdk/table';
// import { LayoutModule } from '@angular/cdk/layout';
// import { CdkStepperModule } from '@angular/cdk/stepper';
// import { A11yModule } from '@angular/cdk/a11y';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
/*import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';*/
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatTreeModule } from '@angular/material/tree';*
// import { MatTabsModule } from '@angular/material/tabs';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
/*import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';*/
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';


const matModules = [
  // MatAutocompleteModule,
  // MatCheckboxModule, **
  // MatDatepickerModule, **
  MatFormFieldModule,
  MatInputModule,
  // MatRadioModule, **
  // MatSelectModule,
  // MatSliderModule, **
  // MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  // MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  MatListModule,
  // MatStepperModule,
  // MatTabsModule,
  // MatTreeModule, **
  MatButtonModule,
  // MatButtonToggleModule, **
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  // MatProgressBarModule, **
  MatRippleModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  // MatSortModule,
  // MatTableModule,
];

@NgModule({
  declarations: [],
  exports: [ ...matModules ]
})
export class MaterialModule { }

