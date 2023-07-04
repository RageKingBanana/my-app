import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private afAuth: AngularFireAuth
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const user = await firstValueFrom(this.afAuth.authState);
      const isAuthenticated = user !== null ? true : false;
      if (!isAuthenticated) {
        alert('You must be authenticated in order to access this page');
      }
      return isAuthenticated;
  }


}