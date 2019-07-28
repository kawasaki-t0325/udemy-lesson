import { db } from '../firebase';

class User {
  static createUser = (uid: string, firstName: string, lastName: string) => {
    db.collection('users').add({
      uid: uid,
      firstName: firstName,
      lastName: lastName,
    });
  }
}

export default User;