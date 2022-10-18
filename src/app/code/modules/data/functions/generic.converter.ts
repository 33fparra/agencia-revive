import { DocumentData, FirestoreDataConverter, PartialWithFieldValue } from "@angular/fire/firestore";

export const genericConverter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore(data: PartialWithFieldValue<T>): DocumentData {
    return data as DocumentData;
  },
  fromFirestore(snapshot: DocumentData): T {
    return snapshot["data"]() as T;
  }
});
