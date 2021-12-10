import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



interface ErrorObj {
  title: string;
  message: string;
}


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorObj) { this.title = data.title; this.message = data.message }

  ngOnInit(): void {
  }

}
