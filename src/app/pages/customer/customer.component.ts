import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { map, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  public orderForm?: FormGroup;
  public isStoreSelected: boolean = false;
  public pickup = false;
  public delivery = false;
  public showForm: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
      this.orderForm = this.formBuilder.group({});
      this.createCustomerOrder();
     }

     ngOnInit() {
      this.createCustomerOrder();
    }

     public createCustomerOrder() {
      this.orderForm = this.formBuilder.group({
        order: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        shippingAddress: ['', Validators.required],
        store: ['', Validators.required]
      });
    }

public setRecoger() {
  this.pickup = true;
  this.delivery = false;
}

public setDomicilio() {
  this.pickup = false;
  this.delivery = true;
}



}
