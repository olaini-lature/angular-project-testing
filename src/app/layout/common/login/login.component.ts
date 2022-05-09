import {
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  encapsulation: ViewEncapsulation.None,
  exportAs: 'logins'
})
export class LoginComponent {

  /**
   * Constructor
   */
  constructor(
  ) {}
}
