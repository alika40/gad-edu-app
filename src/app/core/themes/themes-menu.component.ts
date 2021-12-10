import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme-manager.service';

@Component({
  selector: 'app-themes-menu',
  templateUrl: './themes-menu.component.html',
  styleUrls: ['./themes-menu.component.css']
})
export class ThemesMenuComponent implements OnInit {

  public themeMode = false;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.setLightbulb();
  }

  setLightbulb(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeMode = true;
    } else {
      this.themeMode = false;
    }
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
    this.setLightbulb();
  }
}
