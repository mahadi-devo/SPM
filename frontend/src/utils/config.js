const token = localStorage.getItem('token');

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
};

export default config;
