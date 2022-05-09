import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { StorageService } from "app/services/storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  async canActivate() {
    const tokenExpired = await this._authService.isTokenExpired();
    console.log('tokenExpired: ', tokenExpired);
    if (!tokenExpired) {
      return true;
    }

    await this._storageService.clearStorage();
    this.router.navigateByUrl('/sign-in');
    return false;
  }
}
