import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, finalize, filter } from 'rxjs/operators';
import { Courses } from 'src/app/courses.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  results: Courses[] = [];
  isLoading = false;
  enterKeyResult: Courses | undefined;
  private subs: Subscription = new Subscription();


  search = new FormControl('');

  constructor(  private searchService: SearchService,
                private router: Router ) {}

    ngOnInit(): void {
        const data$ = this.search.valueChanges
                    .pipe(
                        filter(res => res?.trim().length > 4),
                        debounceTime(1000),
                        tap(() => this.isLoading = true),
                        distinctUntilChanged(),
                        switchMap((query) =>  this.searchService.search(query)
                            .pipe(finalize(() => this.isLoading = false )
                        ))
                    );

        this.subs.add(
                    data$.subscribe((data: {courses: Courses[]}) => {
                        this.results = data.courses;
                        if (this.results.length === 1) {
                            const course = this.results[0];
                            this.enterKeyResult = course;
                        }
                    })
                );

    }




    onClickSearch(course: Courses): void {

        // If a single item of an array is returned as a search result, valuate to true onEnterkey press.
        if (this.enterKeyResult) {
            this.router.navigate(['/course', this.enterKeyResult.id]);
        }
        // If many items of an array are returned as a search results, valuate to true onEnterkey press,
        // filter out an array based on input box value
        if (this.results && this.results.length > 1 ) {
                const searchItem = this.results.filter(item => item.id === course.id );
                this.router.navigate(['/course', searchItem[0].id]);
        }

    }



    onEnterKeypessTrigger(event: any, value: string): void {

        // If a single item of an array is returned as a search result, valuate to true onEnterkey press.
        if (this.enterKeyResult && (event.key === 'Enter' || event.code === 'Enter')) {
            this.router.navigate(['/course', this.enterKeyResult.id]);
        }
        // If many items of an array are returned as a search results, valuate to true onEnterkey press,
        // filter out an array based on input box value
        if (this.results && this.results.length > 1 &&
            (event.key === 'Enter' || event.code === 'Enter')) {
                const searchItem = this.results.filter(item => item.title === value );
                this.router.navigate(['/course', searchItem[0].id]);
        }

        this.search.reset();

    }



    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
