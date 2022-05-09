import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "app/material.module";
import { SharedModule } from "app/shared/shared.module";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, MaterialModule, RouterModule],
  exports: [LoginComponent],
})
export class LoginModule {}
