export const GetUserToken = (): string => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return '';
  } catch (error) {
    console.log(error, 'ERORO');
    throw new Error('No Auth token found');
  }
};
