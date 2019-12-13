import { Injectable } from '@angular/core';
import { Usuario } from '@modelos/usuario';
import * as jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getCurrentUser(): Usuario {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    return new Usuario({ ...user, id: user.user_id });
  }

}
