import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  previousUrl!: string;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  backBtn(): void {
    this.location.back() 

  }

}
