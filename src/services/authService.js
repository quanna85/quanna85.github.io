class AuthService {
  setUserAccess = (value) =>
    window.sessionStorage.setItem('user', JSON.stringify(value));

  getUserAccess = () => window.sessionStorage.getItem('user');

  clearStorage = () => window.sessionStorage.clear();

  isAuthenticated = () => !!this.getUserAccess();

  isValidToken = (accessToken) => {
    if (!accessToken) return;
    const expireTime = 13213123121;
    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  };
}

const authService = new AuthService();

export default authService;
