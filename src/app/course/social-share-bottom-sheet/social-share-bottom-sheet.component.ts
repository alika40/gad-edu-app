import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-social-share-bottom-sheet',
  templateUrl: './social-share-bottom-sheet.component.html',
  styleUrls: ['./social-share-bottom-sheet.component.css']
})
export class SocialShareBottomSheetComponent implements OnInit {

  bottomSheetData: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<SocialShareBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { this.bottomSheetData = data; }

  ngOnInit(): void { }


  bottomSheetClose(event: MouseEvent): void {
    this.bottomSheetRef.dismiss('cloesd');
    event.preventDefault();
}

}
