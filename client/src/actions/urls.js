import axios from 'axios';

// SET_URLS
export const setUrls = () => {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    const res = await axios.post('/api/url/list', {
      auth
    });
    const urls = res.data.reverse();
    dispatch({ type: 'SET_URLS', urls });
  };
};