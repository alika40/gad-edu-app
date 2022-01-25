export interface Theme {
    name: string;
    properties: any;
  }

export const appDefault: Theme = {
    name: 'default',
    properties: {
      /*Colors for texts light background  */
      '--foreground-color': '#4a4a4a',
      '--foreGC-heading': '#0a0a0a',
      '--icons': '#8c8c8c',
      '--links': '#654bda',
      '--paginator-icons': '#8f8e8e',
      '--paginator-text': '#8c8c8c',
      '--paginator-BG': '#f8f8f8',
      '--paginator-underline': '0px solid #8c8c8c',
      '--sidenav-border-right': '8px solid #92abcf',
      '--foreground-input': '#808080',
      '--snackBar-BG': '#131415',
      '--button-BG': 'rgba(0, 0, 0, 0.0025)',
      '--spinner-mini': '#3c208a',

      /* Colors for backgrounds for matte light background */
      '--background-theme': '#FFFFFF',
      '--container-theme': '#f8f8f8',
      '--comment-create-textarea': '#f8f8f8',
      '--com-color-btn': '#3c208a',
      '--background-sidenav': '#f8f8f8',
      '--border': '1px solid #e1e1e1',
      '--mat-divider': '#f4f4f4',

      /* Colors for headers for matte light background */
      '--background-header': '#191970',
      '--fa-icon-lightBulb': '#FFFFFF',

      /* Colors for footers for matte light background*/
      '--background-footer': '#fdfdfd',

      '--box-shadow': '0 1px 1px 0 rgba(0,0,0,0.1)',
    }
  };

export const dark: Theme = {
    name: 'dark',
    properties: {
      /* Colors for texts dark background */
      '--foreground-color': '#ffffff',
      '--foreGC-heading': '#ffffff',
      '--icons': '#8c8c8c',
      '--links': '#654bda',
      '--paginator-icons': '#0c0c0c',
      '--paginator-text': '#8c8c8c',
      '--paginator-BG': '#8c8c8c',
      '--paginator-underline': '2px solid #8c8c8c',
      '--sidenav-border-right': '8px solid #8a2be2',
      '--foreground-input': '#4688F1',
      '--snackBar-BG': '#3c208a',
      '--button-BG': '#3c208a',
      '--spinner-mini': '#d6eaf8',


      /* Colors for backgrounds for dark background */
      '--background-theme': '#232323',
      '--comment-create-textarea': '#3f413e',
      '--com-color-btn': '#8a2be2',
      '--container-theme': '#080808',
      '--background-sidenav': '#080808',
      '--border': '2px solid #3d3d3d',
      '--mat-divider': '#3d3d3d',

      /* Colors for headers for dark background */
      '--background-header': '#4B0082',
      '--fa-icon-lightBulb': '#FF9900',

      /* Colors for footers for dark background*/
      '--background-footer': '#080808',


     '--box-shadow': '0 1px 1px 0 rgba(0,0,0,0.5)'
    }
  };
