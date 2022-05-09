import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { DataService } from "app/services/data.service";
import { RestaurantService } from "app/services/restaurant.service";
import { UtilityService } from "app/services/utility.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  fullName: FormControl;

  subData: Subscription;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private _utilityService: UtilityService,
    private _dataService: DataService
  ) {
    this.subData = this._dataService.data.subscribe((data) => {
      if (data && data !== 'error' && data.length > 0) {
        console.log('homeComponent data: ', data);
        this.data = data;
      } else {
        this.data = undefined;
      }
    })
  }

  ngOnInit(): void {
    this.fullName = new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]);

    this.personalForm = this.formBuilder.group({
      fullName: this.fullName,
    });

    this.getRestaurant();
  }

  ngOnDestroy(): void {
    if (this.subData) {
      this.subData.unsubscribe();
    }
  }

  getRestaurant() {
    this._dataService.getData();
  }

  preventLeadingSpaceAndMaxLength(event, item, maxLength) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode >= 37 && charCode <= 40) {
      // arrow
      return;
    } else if (charCode === 8 || charCode === 46) {
      // delete, backspace
      return;
    } else if (charCode === 9) {
      // tab
      return;
    }

    if (this.personalForm.get(item).value.length === 0) {
      if (charCode === 32) {
        // space
        return event.preventDefault();
      } else {
        return;
      }
    } else {
      if (this.personalForm.get(item).value.length >= maxLength) {
        this.personalForm
          .get(item)
          .setValue(this.personalForm.get(item).value.slice(0, maxLength));

        event.target.value = this.personalForm.get(item).value;
        return event.preventDefault();
      }
    }
  }

  removeSurroundingSpace(event, item) {
    this._utilityService.removeSurroundingSpace(event).then((res) => {
      this.personalForm.get(item).setValue(res.target.value);
    });
  }
}
