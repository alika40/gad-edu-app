import { Injectable} from '@angular/core';
import { Theme, appDefault, dark } from '../themes/theme.colors';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ThemeService {
  private active: Theme = appDefault;
  private activeTheme = false;
  private availableThemes: Theme[] = [appDefault, dark];


  constructor() { }


  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    this.activeTheme = this.active.name === dark.name ? true : false;
    const activeTheme = { active: this.activeTheme, inactive: null };
    localStorage.setItem('activeTheme', JSON.stringify(activeTheme));
    return this.activeTheme;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(appDefault);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  // Below Methods: Display chosen theme from ThemesComponent by calling its method by click event or
  // from AppComponent during reload
  toggleTheme(): void {
    if (this.activeTheme) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  autoSetTheme(): void {
    const isActive = this.autoGetTheme();
    if (isActive) {
      this.setDarkTheme();
    }
  }

  autoGetTheme(): boolean | null {
    let stateFlag;
    const activeTheme = localStorage.getItem('activeTheme') as string;
    stateFlag = JSON.parse(activeTheme);
    if (stateFlag) {
      return this.activeTheme = stateFlag.active;
    }
    return stateFlag.inactive;
    
  }

}
