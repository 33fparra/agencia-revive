import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { collectionData, query, CollectionReference, collection, where, Firestore, DocumentData, SnapshotOptions, doc, setDoc, addDoc, deleteDoc, getDoc, onSnapshot, orderBy } from '@angular/fire/firestore';
import { IpaRow } from "../../interfaces/ipa-row.interface";
import { IpaRepository } from '../../repositories/ipa.repository';
import { COLLECTIONS } from '../../consts/collections.const';
import { genericConverter } from '../../functions/generic.converter';
import { COMMON_FIELDS } from '../../consts/common-fields.const';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIpaRepository extends IpaRepository {


  private readonly fbName: string = COLLECTIONS.ipa;
  private collection: CollectionReference<IpaRow>;
  items!: Observable<IpaRow[]>;

  storage: any;

  constructor(
    private localAfs: Firestore
  ) {
    super();
    this.collection = collection(this.localAfs, this.fbName).withConverter(genericConverter<IpaRow>())
  }

  async add(param: IpaRow): Promise<IpaRow> {
    const id = param.year + param.month;
    await setDoc(doc(this.collection, id), param);
    return { ...param, id };
  }

  async edit(ipaRow: Partial<IpaRow>): Promise<boolean> {
    const id = (ipaRow!.year || '') + (ipaRow!.month) || '';
    const docRef = doc(this.localAfs, this.fbName, id);
    await setDoc(docRef, ipaRow, { merge: true });
    return true;
  }

  async get(id: string): Promise<IpaRow | null> {
    const docto = await getDoc(doc(this.collection, id));
    return (docto.exists() ? docto.data() : null);
  }

  getAll(): Observable<IpaRow[]> {
    return collectionData<IpaRow>(
      query<IpaRow>(
        collection(this.localAfs, this.fbName) as CollectionReference<IpaRow>,
        orderBy('year')
      ), { idField: COMMON_FIELDS.id }
    );
  }
}
