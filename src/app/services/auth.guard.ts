import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      try {
        const secret = 'shahilisakilladi';
        const decodedToken = jwt.verify(token, secret);
        return true;
      } catch {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
