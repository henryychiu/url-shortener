import axios from 'axios';

// FETCH_USER
export const fetchUser = () => (
  async (dispatch) => {
    const res = await axios.get('/api/current_user');
    const payload = res.data;
    dispatch({ type: 'FETCH_USER', payload });
  }
);