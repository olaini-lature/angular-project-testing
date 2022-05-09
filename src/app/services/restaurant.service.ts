import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CONSTANTS } from "./config.service";
import { RESTService } from "./rest.service";

const RESTAURANT_URL = CONSTANTS.API_RANDOM_RESTAURANT;

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  restaurants = new BehaviorSubject<any>(null);

  constructor(public _restService: RESTService) {
    this._restService = _restService;
  }

  getRestaurant() {
    this.getRestaurantAPI()
      .toPromise()
      .then((result) => {
        this.restaurants.next({
          status: "success",
          response: result,
        });
      })
      .catch((error) => {
        this.restaurants.next({
          status: "error",
          response: error,
        });
      });
  }

  private getRestaurantAPI(): Observable<any> {
    return this._restService.get(RESTAURANT_URL);
  }
}
