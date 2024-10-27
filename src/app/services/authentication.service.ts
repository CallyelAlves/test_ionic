import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    protected fireAuth: AngularFireAuth
  ) { }

  async saveUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth.createUserWithEmailAndPassword(email, password);
  };
  
  async loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth.signInWithEmailAndPassword(email, password);
  };

  async signOut(): Promise<void> {
    return await this.fireAuth.signOut();
  };

  async getUser(): Promise<firebase.User | null> {
    return new Promise(resolve => {
      this.fireAuth.onAuthStateChanged(user => {
        if (user) return resolve(user)
        resolve(null);
      })
    })
  };

  async updateProfile(user: any, displayName: string) {
    await updateProfile(user.user, { displayName: displayName });
  }
}
