import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { StorageService } from 'app/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  async canActivate() {
    const tokenExpired = await this._authService.isTokenExpired();

    if (tokenExpired) {
      await this._storageService.clearStorage();
      console.log('return true');
      return true;
    }

    this.router.navigateByUrl('/dashboard/home');
    return false;
  }
  
}
