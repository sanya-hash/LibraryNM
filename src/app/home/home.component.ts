import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  viewClicked() {
    // Handle view button click
    console.log('View button clicked');
    // Add your logic for the "View" button click
  }

  uploadClicked() {
    // Handle upload button click
    console.log('Upload button clicked');
    // Add your logic for the "Upload" button click
  }
  constructor() { }


  ngOnInit() {
  }


}




