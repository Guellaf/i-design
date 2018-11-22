import {ADD_USER, DELETE_USER} from '../constants';

export function addUser(data) {
  return {
    type: ADD_USER,
    payload: data
  }
}

export function deleteUser() {
  return {
    type: DELETE_USER
  }
}
