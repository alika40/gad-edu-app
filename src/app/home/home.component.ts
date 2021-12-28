import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses_categories = ['Free Courses','Business', 'Design', 'Development', 'Finance & Accounting',
                        'Health & Fitness', 'IT & Software', 'Lifestyle', 'Marketing',
                        'Music', 'Office', 'Productivity', 'Personal', 'Development',
                        'Photography & Video', 'Teaching & Academics', 'Paid Courses'];
  constructor() { }

  ngOnInit(): void {
  }

}
