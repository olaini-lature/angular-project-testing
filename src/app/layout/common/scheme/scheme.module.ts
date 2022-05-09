import { NgModule } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";
import { SchemeComponent } from "app/layout/common/scheme/scheme.component";
import { MaterialModule } from "app/material.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [SchemeComponent],
  imports: [SharedModule, MaterialModule, TranslocoModule],
  exports: [SchemeComponent],
})
export class SchemeModule {}
