import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  addform!:FormGroup;
  person: any={};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private fGroup: FormBuilder,private dataService: DataService,private router:Router) { }

  ngOnInit(): void {
    this.addform = this.fGroup.group({
      firstName:[''],
      lastName:[''],
      email:['']
    })
  }
  add(){
    this.person.firstName = this.addform.value.firstName;
    this.person.lastName = this.addform.value.lastName;
    this.person.email = this.addform.value.email;
    let currentUrl = this.router.url;
    this.dataService.addPerson(this.person)
      .subscribe(res => {
          console.log(res);
          console.log('Person added successfully');
          this.refresh();
        })
  }

  refresh() {
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }
}
