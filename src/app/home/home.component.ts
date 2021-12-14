import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeout } from 'rxjs';
import { ConfirmdeleteComponent } from '../components/confirmdelete/confirmdelete.component';
import { CreatePersonComponent } from '../components/create-person/create-person.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { EditdialogComponent } from '../components/editdialog/editdialog.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  persons: any;
  person: any;

  ngOnInit(): void {
    this.getAll();
  }



  getAll(){
    this.dataService.getPersons().subscribe(
      (data) => {
        console.log(data);
        this.persons = data;
      });
    console.log(this.persons);
  }


  createPerson(){
    this.dialog.open(CreatePersonComponent,{
      height:"400px",
      width:"500px"
    });
    this.getAll();
  }

  openDialog(id: any) {

    let person: any;
    this.dataService.getPerson(id).subscribe(
      (data) => {
        console.log(data);
        person = data;
      });

    let dia = this.dialog;
    setTimeout(function () {
      console.log(person);
      dia.open(DialogComponent, {
        data: { person },
        height: '400px',
        width: '600px',
      });
    }, 500);

    // dia.open(DialogComponent, {
    //   data: { person },
    // });
  }

  deleteperson(id: any){

    let person: any;
    this.dataService.getPerson(id).subscribe(
      (data) => {
        console.log(data);
        person = data;
      });

    let dia = this.dialog;
    setTimeout(function () {
      console.log(person);
      dia.open(ConfirmdeleteComponent, {
        data: { person },
      });
    }, 500);




    // this.dataService.deletePerson(id).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.getAll();
    //   });
      
  }

  editperson(id: any){
    
    let person: any;
    this.dataService.getPerson(id).subscribe(
      (data) => {
        console.log(data);
        person = data;

      });

    let dia = this.dialog;
    setTimeout(function () {
      console.log(person);
      dia.open(EditdialogComponent, {
        data: { person },
        height: "400px",
        width: "600px"
      });
    }, 500);
  }

}
