import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { Route, RouterModule } from "@angular/router";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "app/material.module";
import { SharedModule } from "app/shared/shared.module";

const homeRoutes: Route[] = [
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class HomeModule {}
