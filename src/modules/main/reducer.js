import {LOGIN, SIGNUP, GETNOTES, DELETENOTES} from './types';
const initialState = {
  data: [],
  loginId: null,
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, loginId: action.payload};
    case SIGNUP:
      return {data: action.payload};
    case GETNOTES:
      return {
        ...state,
        data: action.payload,
      };
    case DELETENOTES:
      return {
        ...state,
        notes: [...action.payload.response],
      };
    default:
      return state;
  }
}
