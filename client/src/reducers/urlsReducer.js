// URLs Reducer

const urlsReducerDefualtState = [];

export default function (state = urlsReducerDefualtState, action) {
  switch (action.type) {
    case 'SET_URLS':
      return action.urls;
    default:
      return state;
  }
}