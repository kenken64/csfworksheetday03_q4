import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../directives/forbidden.name.directive';
import { Registration } from '../models/register';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  form: FormGroup;

  firstname = new FormControl('', [Validators.required, forbiddenNameValidator(/Kenneth/i)]);
  lastname = new FormControl('', [Validators.required]);
  spouseFirstname = new FormControl('');
  spouseLastname = new FormControl('');
  phoneNumber1 = new FormControl('', [Validators.required,
     Validators.maxLength(3)]);
  phoneNumber2 = new FormControl('', [Validators.required, 
    Validators.maxLength(3)]);
  phoneNumber3 = new FormControl('', [Validators.required, 
    Validators.maxLength(4)]);
  email = new FormControl('', [Validators.required, 
      Validators.email]);

  attendingData = [
    { id: 1, name: 'Fridat night cook out' }, // 0
    { id: 2, name: 'Saturday breakfast' }, // 1
    { id: 3, name: 'Saturday Lunch' }, // 2
    { id: 4, name: 'Saturday formal dinner' } //3
  ];    

  get attendingFormArray() {
    return this.form.controls.attending as FormArray;
  }

  private addAttendingCheckboxes() {
    this.attendingData.forEach(() => this.attendingFormArray.push(new FormControl(false)));
  }
  
  attending = new FormArray([]);
  orderDVD = new FormControl('', []);
  comments = new FormControl('', []);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      spouseFirstname : this.spouseFirstname,
      spouseLastname : this.spouseLastname,
      phoneNumber1 : this.phoneNumber1,
      phoneNumber2 : this.phoneNumber2,
      phoneNumber3 : this.phoneNumber3,
      email: this.email,
      attending: this.attending,
      orderDVD: this.orderDVD,
      comments: this.comments
    });
    this.addAttendingCheckboxes();
   }

  ngOnInit(): void {
  }

  processForm(){
    console.log(this.form.value);
    let register = new Registration(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.phoneNumber1,
      this.form.value.phoneNumber2,
      this.form.value.phoneNumber3,
      this.form.value.email,
      this.form.value.attending,
    )
    console.log(register);
    // call httpclient pass the register
  }

}
