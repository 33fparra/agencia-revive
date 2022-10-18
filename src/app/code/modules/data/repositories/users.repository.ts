import { Observable } from "rxjs";
import { User, UserCredential } from '@angular/fire/auth';


export abstract class UsersRepository {
  abstract get authState(): Observable<User | null>;
  abstract login(param: { email: string; password: string }): Observable<UserCredential>;
  abstract logout(): Observable<any>;
}
