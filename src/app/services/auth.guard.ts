
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { MongoDBService } from './mongo-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isJwt!: any

  constructor(
    private mongoDBService: MongoDBService,
    private route: Router,
    private toastr: ToastrService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.mongoDBService.checkJwt().pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          this.toastr.warning("You don't have permission to access the page ");
          this.route.navigate(['/login']);
          return false;
        }
      }),
    );
  }

}
