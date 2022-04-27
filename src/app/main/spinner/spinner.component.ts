import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private status: SpinnerService ) { }
  newStatus: boolean = false;
    ngOnInit(): void {
      this.status.spinnerStatus.subscribe((val)=>{
        this.newStatus = (val)
        })
  
    }
  }
  