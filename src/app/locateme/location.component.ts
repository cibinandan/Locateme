import { Component, OnDestroy } from "@angular/core";
import { LocationService } from "../services/location.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Subscription } from "rxjs";
import { Subject } from "rxjs";
@Component({
  selector: "location-list",
  templateUrl: "./location.html",
  styleUrls: ["./location.component.css"]
})
export class locationcomponent implements OnDestroy {
  locationSubscribe: Subscription;
  locationForm: FormGroup;
  locationData: [];
  clicked:boolean = false;
  statusMsg: string = "";
  dataMsg: string = "";
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 50;
  isLoading: boolean = false;

  constructor(
    private apisvc: LocationService,
    private formBuilder: FormBuilder
  ) {
    this.locationForm = formBuilder.group({
      cityName: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z ]+")
      ])
    });
  }
  uiReset() {
    this.locationData = [];
    this.dataMsg = "";
  }
  focusFunction() {
    this.statusMsg = "";
    this.dataMsg = "";
  }
  getGeoLocation() {
    this.isLoading = true;
    this.clicked = true;
    if (this.locationForm.valid) {
      this.locationSubscribe = this.apisvc
        .getLocationData(this.locationForm.value["cityName"])
        .subscribe(
          data => {
            data.results.length > 0
              ? (this.locationData = data.results)
              : (this.dataMsg = "No Records Available");
          },
          error => (
            console.log(error),
            (this.statusMsg = "Error occured while processing.Check console.")
          )
        );
    } else {
      this.locationData = [];
      this.statusMsg = "Please enter a valid City Name";
    }
    this.isLoading = false;
    this.clicked = false;
  }
  ngOnDestroy(): void {
    this.locationSubscribe.unsubscribe();
  }
}
