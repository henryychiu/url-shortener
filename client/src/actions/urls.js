import axios from 'axios';

// SET_URLS
export const setUrls = (urls) => ({
  type: 'SET_URLS',
  urls
});

export const startSetUrls = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/url/list');
    const urls = res.data.reverse();
    dispatch(setUrls(urls));
  };
};