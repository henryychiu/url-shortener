// Copied ID Reducer

export default function (state = '', action) {
  switch (action.type) {
    case 'SET_COPIED_ID':
      return action.copiedId;
    case 'REMOVE_COPIED_ID':
      return '';
    default:
      return state;
  };
};