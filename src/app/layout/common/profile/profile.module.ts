import { NgModule } from "@angular/core";
import { MaterialModule } from "app/material.module";
import { SharedModule } from "app/shared/shared.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, MaterialModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
