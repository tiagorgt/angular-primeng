import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from './item.service';
import { Item } from '../model/item';

enum UnitMeasurement {
  Litro = 'lt',
  Quilograma = 'kg',
  Unidade = 'un'
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  itemForm: FormGroup;
  unitMeasurementOptions: any[];
  formSubmitted: boolean;
  item: Item = new Item();

  constructor(private _fb: FormBuilder, private _router: Router, private _itemService: ItemService, private _activatedRoute: ActivatedRoute) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.getUnitMeasurementOptions();
    this.itemForm.get('unitMeasurement').setValue(this.unitMeasurementOptions[0]);

    this._activatedRoute.params.subscribe(p => {
      if (p['key']) {
        this.getItem(p['key']);
      }
    })
  }

  createFormGroup() {
    this.itemForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      unitMeasurement: ['', [Validators.required]],
      amount: '',
      price: ['', [Validators.required]],
      perishableProduct: ['', [Validators.required]],
      expirationDate: [''],
      manufacturingDate: ['', [Validators.required]]
    });

    this.itemForm.get('perishableProduct').valueChanges.subscribe((v: boolean) => {
      if (v) {
        this.itemForm.get('expirationDate').setValidators(Validators.required);
      } else {
        this.itemForm.get('expirationDate').clearValidators();
      }
      this.itemForm.get('expirationDate').updateValueAndValidity();
      console.log(this.itemForm.get('expirationDate'));
    });

    this.itemForm.get('unitMeasurement').valueChanges.subscribe(v => {
      this.itemForm.get('amount').setValue(null);
    });

    this.itemForm.get('perishableProduct').setValue(false);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.isFormValid()) {
      let am = this.itemForm.get('amount');
      this.item.amount = this.itemForm.get('amount').value;
      this.item.expirationDate = this.itemForm.get('expirationDate').value;
      this.item.manufacturingDate = this.itemForm.get('manufacturingDate').value;
      this.item.name = this.itemForm.get('name').value;
      this.item.perishableProduct = this.itemForm.get('perishableProduct').value;
      this.item.price = this.itemForm.get('price').value;
      this.item.unitMeasurement = this.itemForm.get('unitMeasurement').value;
      this._itemService.save(this.item);
    }
  }

  isFormValid() {
    if (!this.itemForm.valid) {
      return false;
    }

    if (this.isItemDateExpired()) {
      return false;
    }

    if (this.isManufacturingDateAfterExpirationDate()) {
      return false;
    }

    return true;
  }

  getUnitMeasurementOptions() {
    this.unitMeasurementOptions = [
      {
        id: 'lt',
        name: 'Litro'
      }, {
        id: 'kg',
        name: 'Quilograma'
      }, {
        id: 'un',
        name: 'Unidade'
      }
    ]
  }

  setAmountOptions(): any {
    switch (this.itemForm.get('unitMeasurement').value.id) {
      case UnitMeasurement.Litro:
        return { prefix: '', thousands: '', decimal: ',', precision: '3', align: 'left' };
      case UnitMeasurement.Quilograma:
        return { prefix: '', thousands: '', decimal: ',', precision: '3', align: 'left' };
      default:
        return { prefix: '', thousands: '', decimal: ',', precision: '0', align: 'left' };
    }
  }

  isItemDateExpired() {
    if (this.itemForm.get('expirationDate').valid && this.itemForm.get('expirationDate').value) {
      let currentDate: Date = new Date();
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);
      if (this.itemForm.get('expirationDate').value < currentDate) {
        return true;
      }
    }
    return false;
  }

  isManufacturingDateAfterExpirationDate() {
    let expirationDateControl = this.itemForm.get('expirationDate');
    let manufacturingDateControl = this.itemForm.get('manufacturingDate');
    let perishableProductControl = this.itemForm.get('perishableProduct');

    if (expirationDateControl.valid && expirationDateControl.value
      && manufacturingDateControl.valid && manufacturingDateControl.value
      && perishableProductControl.value) {
      return manufacturingDateControl.value > expirationDateControl.value;
    }

    return false;
  }

  isFormControlValid(formControl: FormControl) {
    return !formControl.valid && (formControl.dirty || this.formSubmitted);
  }

  cancel() {
    this._router.navigate(['/item-list']);
  }

  getItem(key: string) {
    this.item = this._itemService.getById('');
  }
}
