import axios from 'axios';

export const LoginStatus = async (token) => {
  try {
    const response = await axios.get(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
