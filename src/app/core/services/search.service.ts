import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/courses.model';
import { environment } from 'src/environments/environment';


const BACKEND_URL_DATA = environment;



@Injectable(/*{
  providedIn: 'root'
}*/)
export class SearchService {

  constructor(private http: HttpClient) { }

  search(searchTerm: string): Observable<{courses: Courses[]}> { // type to be considered later
    const searh_term = { searchTerm }
    return this.http.post<{courses: Courses[]}>(BACKEND_URL_DATA.api_URL + '/courses/search', searh_term);
  }

}
