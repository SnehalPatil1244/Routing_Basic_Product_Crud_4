import { inject, Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class userRoleGuard implements CanActivate {
    private authservice = inject(AuthService)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let userRoleAArr = route.data['userRole']
        let loggeduser = this.authservice.getUserRole()
        return userRoleAArr.includes(loggeduser)

    }

}