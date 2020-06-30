import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAxhMC6oJRWlFZFhtA9iJ_kWdvyAGDVnvo',
  authDomain: 'cuttlefish-development.firebaseapp.com',
  databaseURL: 'https://cuttlefish-development.firebaseio.com',
  projectId: 'cuttlefish-development',
  storageBucket: 'cuttlefish-development.appspot.com',
  messagingSenderId: '410335322041',
  appId: '1:410335322041:web:de47562784650b59606068',
  measurementId: 'G-E3BLY7Z3ME'
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password, photoURL) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getCurrentUser() {
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    }
  }

  getCurrentPhoto() {
    if (this.auth.currentUser) {
      return this.auth.currentUser && this.auth.currentUser.photoURL;
    }
  }

  getCurrentUID() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        return user.uid;
      }
    });
  }

  isLoggedIn(user) {
    this.auth.onAuthStateChanged(user => {
      if (user != null) {
        return true;
      }
    });
    return false;
  }

  getFirestoreUserAtLogin(email) {
    let docRef = this.db.collection('users').doc(email);
    docRef.get().then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such user exists');
      }
    });
  }
}

export default new Firebase();
