import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from './item.service';
import { Item } from '../model/item';
import { UnitMeasurement } from '../model/unit-measurement';
import { MessageService } from 'primeng/components/common/messageservice';

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
  UnitMeasurement = UnitMeasurement;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _itemService: ItemService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService) {
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
      this.item.unitMeasurement = this.itemForm.get('unitMeasurement').value.id;

      try {
        this._itemService.save(this.item);
        this._messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Item salvo com sucesso' });
        this._router.navigate(['/item-list']);
      } catch (ex) {
        this._messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao tentar salvar o item' });
      }
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
        id: UnitMeasurement.Litro,
        name: 'Litro'
      }, {
        id: UnitMeasurement.Quilograma,
        name: 'Quilograma'
      }, {
        id: UnitMeasurement.Unidade,
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
    this.item = this._itemService.getById(key);
    this.itemForm.get('name').setValue(this.item.name);
    this.itemForm.get('unitMeasurement').setValue(this.unitMeasurementOptions.find(u => u.id == this.item.unitMeasurement));
    this.itemForm.get('amount').setValue(this.item.amount);
    this.itemForm.get('price').setValue(this.item.price);
    this.itemForm.get('perishableProduct').setValue(this.item.perishableProduct);
    this.itemForm.get('expirationDate').setValue(this.item.expirationDate);
    this.itemForm.get('manufacturingDate').setValue(this.item.manufacturingDate);
  }
}
