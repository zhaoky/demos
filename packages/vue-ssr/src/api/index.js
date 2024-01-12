import axios from 'axios';

export const data = {
  list: () =>
    axios
      .get('http://rap2.taobao.org:38080/app/mock/254238/get//api/ele?type=1')
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('axios error:', err);
      }),
};
