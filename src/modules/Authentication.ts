import { auth } from '../firebase';
import { User } from '../models';

class Authentication {
  static signupWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      User.createUser(user.uid, firstName, lastName);
    }
  }
}

export default Authentication;