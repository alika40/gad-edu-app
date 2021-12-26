import { NgModule } from '@angular/core';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatDividerModule } from '@angular/material/divider';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


const matModules = [
  MatMenuModule,
  MatToolbarModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [],
  exports: [ ...matModules ]
})
export class CoreMaterialModule { }

