import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

export class Trainings {
  userId: string;
  id?: string;
  title?: string;
  imageUrl?: string;

  constructor(userId: string, id: string, title: string, imageUrl: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
  }
}
@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  public userId: any;

  constructor(
    private authService: AuthenticationService, 
    private fireStore: Firestore
  ) { 
    this.authService.getUser().then(user => {
      this.userId = user?.uid
    })
  }

  addTraining(training: Trainings) {
    training.userId = this.userId;
    training.id = uuidv4();
    const trainingRef = doc(this.fireStore, `users/${training.userId}/trainings/${training.id}`)
    return setDoc(trainingRef, training);
  }

  async getTrainings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(collection(this.fireStore, `users/${user?.uid}/trainings`));
    return await getDocs(q);
  }
}
