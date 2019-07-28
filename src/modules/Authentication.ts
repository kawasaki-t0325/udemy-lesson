import { auth } from '../firebase';
import { User } from '../models';

interface IAuth {
  uid: string,
  error: string,
}

class Authentication {
  static signupWithEmail = async (email: string, password: string, firstName: string, lastName: string): Promise<IAuth> => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password).catch(err => {
      return err;
    });
    if (user) {
      User.createUser(user.uid, firstName, lastName);
      return { uid: user.uid, error: '' };
    }
    return { uid: '', error: 'ユーザー登録に失敗しました' };
  }
}

export default Authentication;