import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private matDialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An Unknown Error Occured';
                if (error.error instanceof ErrorEvent) { // client side error
                    errorMessage = `Error: ${error.error.message}`;
                } else { // server side error
                    errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;
                }
                this.openDialog(errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    private openDialog(errorMessage: any): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Error Occured', message: errorMessage };
        // dialogConfig.minWidth = '20rem',
        // dialogConfig.position = { top: '0', left: '0'};
        dialogConfig.panelClass = 'custom-style-error'; // In style.css file
        this.matDialog.open(ErrorComponent, dialogConfig);
    }
}
