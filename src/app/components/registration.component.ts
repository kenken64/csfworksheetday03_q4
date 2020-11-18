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
  
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstname: fb.control('', [Validators.required, forbiddenNameValidator(/Kenneth/i)]),
      lastname: fb.control('', [Validators.required]),
      spouseFirstname : fb.control('', []),
      spouseLastname : fb.control('', []),
      phoneNumber1 : fb.control('', [Validators.required,
        Validators.maxLength(3)]),
      phoneNumber2 : fb.control('', [Validators.required,
        Validators.maxLength(3)]),
      phoneNumber3 : fb.control('', [Validators.required,
        Validators.maxLength(4)]),
      email: fb.control('', [Validators.required, 
        Validators.email]),
      attending: new FormArray([]),
      orderDVD: fb.control('', []),
      comments: fb.control('', [])
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
