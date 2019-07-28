import { auth } from '../firebase';

class Authentication {
  static signupWithEmail = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password);
  }
}

export default Authentication;