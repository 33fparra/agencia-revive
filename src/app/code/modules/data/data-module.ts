import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoadingCounterService } from '../../services/loading-counter.service';
import { IpaRepository } from './repositories/ipa.repository';
import { FirebaseIpaRepository } from './firebase/repositories/firebase-ipa.repository';
import { UsersRepository } from './repositories/users.repository';
import { FirebaseUsersRepository } from './firebase/repositories/firebase-users.repository';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: UsersRepository, useClass: FirebaseUsersRepository },
    { provide: IpaRepository, useClass: FirebaseIpaRepository },
    ScreenTrackingService, UserTrackingService, LoadingCounterService
  ]
})
export class FirebaseDataModule { }
