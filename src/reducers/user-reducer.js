import {ADD_USER, DELETE_USER} from "../constants"
import { UserClass } from '../class/export';

export default function (state = null, action) {
  switch (action.type) {
    case ADD_USER:
    return UserClass.newUser(state, action.payload).updatedState;
    case DELETE_USER:
      return UserClass.newUser(state, null).updatedState;
    default:
      return state;
  }
}
