import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css']
})
export class ConfirmdeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private dataService: DataService,private router:Router) { }

  id:any ;

  ngOnInit(): void {
    this.id = this.data.person.id;
  }

  confirm(){
   this.dataService.deletePerson(this.id).subscribe(
      (data) => {
        console.log(data);
        this.refresh();
      });
    
  }


  refresh() {
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
