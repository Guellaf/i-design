import { State, User } from '../models';

class UserClass {

  static newUser(state, payload) {
    state = state.set('user', new User(payload));
    return { updatedState: state };
  }

}

export { UserClass as default };
