import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "../model/authData.model";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(private http: HttpClient, private router: Router, public userService: UserService) {

    }

    login(data: AuthData) {
        this.http.post("http://localhost:3001/auth/login", data).subscribe(response => {
            console.log(response);
            
        });
    }
}