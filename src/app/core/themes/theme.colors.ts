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
      // '--mat-menu-text-hover': '#000',
      // '--mat-menu-icon': '#000',
      /* Admin Colors for texts matte blue background */
      '--admin-foreground-color': '#92abcf',

      /* Colors for backgrounds for matte light background */
      '--background-theme': '#FFFFFF',
      '--container-theme': '#f8f8f8',
      '--comment-create-textarea': '#f8f8f8',
      '--com-color-btn': '#3c208a',
      '--background-sidenav': '#f8f8f8',
      '--border': '1px solid #e1e1e1',
      '--mat-divider': '#f4f4f4',
      /* Admin Colors for backgrounds for matte blue background */
      '--admin-background-theme': '#23395d',
      '--admin-container-theme': '#23395d',
      '--admin-background-sidenav': '#23395d',
      '--admin-border': '2px solid #1f1e1e',
      '--admin-box-shadow': '0 1px 3px 0 #000000',
      '--admin-mat-divider': '#363643',

      /* Colors for headers for matte light background */
      '--background-header': '#191970',
      '--fa-icon-lightBulb': '#FFFFFF',
      /* Admin Colors for headers for matte blue background */
      '--admin-background-header': '#23395d',

      /* Colors for footers for matte light background*/
      '--background-footer': '#fdfdfd',
      /* Admin Colors for footers for matte blue background*/
      '--admin-background-footer': '#23395d',

      // '--primary-default': '#5DFDCB',
      // '--primary-dark': '#24B286',
      // '--primary-light': '#B2FFE7',

      /*'--error-default': '#EF3E36',
      '--error-dark': '#800600',
      '--error-light': '#FFCECC',*/
      // '--spinner-light': '#3c208a',

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
      // '--mat-menu-text-hover': '#808B96',
      // '--mat-menu-icon': '#FFF',
      /* Admin Colors for texts dark background */
      '--admin-foreground-color': '#92abcf',


      /* Colors for backgrounds for dark background */
      '--background-theme': '#18181b',
      '--comment-create-textarea': '#3f413e',
      '--com-color-btn': '#8a2be2',
      '--container-theme': '#080808',
      '--background-sidenav': '#080808',
      '--border': '2px solid #3d3d3d',
      '--mat-divider': '#3d3d3d',
      /* Admin Colors for backgrounds for dark background */
      '--admin-background-theme': '#18181b',
      '--admin-container-theme': '#080808',
      '--admin-background-sidenav': '#080808',
      '--admin-border': '2px solid #3d3d3d',
      '--admin-box-shadow': '0 1px 2px 0 #3d3d3d',
      '--admin-mat-divider': '#262626',

      /* Colors for headers for dark background */
      '--background-header': '#4B0082',
      '--fa-icon-lightBulb': '#FF9900',
      /* Admin Colors for headers for dark background */
      '--admin-background-header': '#4B0082',

      /* Colors for footers for dark background*/
      '--background-footer': '#080808',
      /* Admin Colors for footers for dark background*/
      '--admin-background-footer': '#080808',

      // '--primary-default': '#5DFDCB',
      // '--primary-dark': '#24B286',
      // '--primary-light': '#B2FFE7',

      /*'--error-warning': '#EF3E36',
      '--error-success': '#800600',
      '--error-danger': '#FFCECC',*/
      // '--spinner-light': '#d6eaf8',

     '--box-shadow': '0 1px 1px 0 rgba(0,0,0,0.5)'
    }
  };
