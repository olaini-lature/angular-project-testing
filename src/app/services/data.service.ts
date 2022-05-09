import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RestaurantService } from "./restaurant.service";
import { UtilityService } from "./utility.service";
import validator from 'validator';

@Injectable({
  providedIn: "root",
})
export class DataService {
  data = new BehaviorSubject<any>(null);

  constructor(
    private _restaurantService: RestaurantService,
    private _utilityService: UtilityService
    ) {
    this._restaurantService.restaurants.subscribe((res) => {
      console.log("restaurant dataService: ", res);

      if (res) {
        if (res.status === "success") {
          const response = res.response;

          let arrResult = [];
          let arrCount = [];

          for (const key of Object.keys(response)) {
            const value = response[key];

            const type = typeof value;

            if (type === "string") {
              const arrValue = value.split(" ");
              console.log("arrValue: ", arrValue);

              for (const item of arrValue) {
                const isContainsSpecialChars = this.containsSpecialChars(item);

                if (!isContainsSpecialChars) {
                  const isNumber = parseInt(item, 10);
                  const isNaN = Number.isNaN(isNumber);

                  if (isNaN && item.length > 0) {
                    const lowerCaseItem = item.toLowerCase();
                    const isExist = arrResult.find(
                      (search) => search.word === lowerCaseItem
                    );

                    if (!isExist) {
                      arrResult.push({
                        word: lowerCaseItem,
                        count: 1,
                      });
                    } else {
                      const index = arrResult.findIndex(
                        (search) => search.word === lowerCaseItem
                      );

                      const count = arrResult[index]["count"] + 1;
                      arrResult[index]["count"] = count;
                    }
                  }
                } else if (isContainsSpecialChars) {
                  const isURL = this.isValidUrl(item);
                  const isUUID = validator.isUUID(item);

                  console.log('isUUID: ', isUUID);

                  if (!isURL && !isUUID) {
                    const newItem = item.replace(/[^a-zA-Z0-9 ]/g, "");

                    const isNumber = parseInt(newItem, 10);
                    const isNaN = Number.isNaN(isNumber);

                    if (isNaN && item.length > 0) {
                      const lowerCaseItem = newItem.toLowerCase();
                      const isExist = arrResult.find(
                        (search) => search.word === lowerCaseItem
                      );

                      if (!isExist) {
                        arrResult.push({
                          word: lowerCaseItem,
                          count: 1,
                        });
                      } else {
                        const index = arrResult.findIndex(
                          (search) => search.word === lowerCaseItem
                        );

                        const count = arrResult[index]["count"] + 1;
                        arrResult[index]["count"] = count;
                      }
                    }
                  } else {
                    const lowerCaseItem = item.toLowerCase();
                    const isExist = arrResult.find(
                      (search) => search.word === lowerCaseItem
                    );

                    if (!isExist) {
                      arrResult.push({
                        word: lowerCaseItem,
                        count: 1,
                      });
                    } else {
                      const index = arrResult.findIndex(
                        (search) => search.word === lowerCaseItem
                      );

                      const count = arrResult[index]["count"] + 1;
                      arrResult[index]["count"] = count;
                    }
                  }
                }
              }
            }
          }

          console.log("arrResult: ", arrResult);
          
          if (arrResult.length > 0) {
            let arrFinal = this._utilityService.sort(arrResult, 'count', 'desc');
            console.log('arrFinal: ', arrFinal);

            let temp = JSON.parse(JSON.stringify(arrFinal));

            const sendData = temp.slice(0, 10);

            console.log('sendData: ', sendData);

            this.data.next(sendData);
          } else {
            this.data.next([]);
          }
        } else {
          this.data.next("error");
        }
      } else {
        this.data.next(null);
      }
    });
  }

  containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  isValidUrl(str) {
    const matchPattern =
      /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(str);
  }

  getData() {
    this._restaurantService.getRestaurant();
  }
}
