import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // 빈 ''를 return 하지 않고 false가 뜨도록 || false 를 넣어준다.
      return action.payload || false;
    default:
      return state;
  }
}