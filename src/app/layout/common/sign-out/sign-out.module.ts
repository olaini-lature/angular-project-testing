import { NgModule } from "@angular/core";
import { MaterialModule } from "app/material.module";
import { SharedModule } from "app/shared/shared.module";
import { SignOutComponent } from "./sign-out.component";

@NgModule({
  declarations: [SignOutComponent],
  imports: [SharedModule, MaterialModule],
  exports: [SignOutComponent],
})
export class SignOutModule {}
