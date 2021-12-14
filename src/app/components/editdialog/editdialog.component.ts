import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {


  editform!:FormGroup;
  person: any={};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private fGroup: FormBuilder,private dataService: DataService,private router:Router) { }

  ngOnInit(): void {

    this.editform = this.fGroup.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      ID:['']
    })
    this.editform.controls['firstName'].setValue(this.data.person.firstName)
    this.editform.controls['lastName'].setValue(this.data.person.lastName)
    this.editform.controls['email'].setValue(this.data.person.email)
    this.editform.controls['ID'].setValue(this.data.person.id)
    this.editform.controls['ID'].disable();
    console.log(this.data.person.firstName);
  }
  edit(){
    
      //console.log(this.editEmpForm.value)
      this.person.id = this.data.person.id;
      this.person.firstName = this.editform.value.firstName;
      this.person.lastName = this.editform.value.lastName;
      this.person.email = this.editform.value.email;
      this.dataService.updatePerson(this.person).subscribe(
        (data:any) => {
          console.log(data);
          let refresh = this.refresh();
          setTimeout(function() {
            refresh;
            console.log('refresh');
            
          }, 4000);
          
        }
      );
      
  }

  refresh() {
    console.log('refresh function');
    
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }




}
