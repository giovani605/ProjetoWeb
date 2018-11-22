import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";


@Injectable({ providedIn: "root" })
export class UserService {
    public usuario: any;
    public token: any;
   

    constructor(private http: HttpClient) {
    }

    

}