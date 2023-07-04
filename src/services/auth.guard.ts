import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          // User is logged in, allow access to the route
          return true;
        } else {
          // User is not logged in, redirect to the login page
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
