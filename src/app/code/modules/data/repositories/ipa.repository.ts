import { DocumentReference } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IpaRow } from "../interfaces/ipa-row.interface";


export abstract class IpaRepository {
  abstract edit(param: Partial<IpaRow>): Promise<boolean>;
  abstract add(param: IpaRow): Promise<IpaRow>;
  abstract get(id: string): Promise<IpaRow | null>;
  abstract getAll(): Observable<IpaRow | IpaRow[]>
}
