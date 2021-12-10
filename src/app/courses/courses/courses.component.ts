import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {


  public showMoreOrLess = 200;
  public courses = {
    title: 'Now it is important to know that we cannot deploy an angular application',
    description: 'Are you a developer who has just completed an Angular app? I assume you do not want to keep this app only for you, mostly you would want anyone to access this app, and if it is just a personal project of yours from which you know you are not going to make any money you probably would like not to spend any on it too.',
    publishedDate: new Date().getFullYear(),
    imagePath: 'https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=0e0b58fcf67fa6e8a010322d617e39af',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
