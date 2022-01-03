import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faGithubAlt, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  faGithubAlt = faGithubAlt;
  faGithub = faGithub;
  faWhatsapp = faWhatsapp;


  constructor( private title: Title ) { }

  ngOnInit(): void {

    this.title.setTitle('About | eSCHOOL');
  }

}
