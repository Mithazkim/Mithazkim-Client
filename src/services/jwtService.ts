export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const refreshToken = 'refreshToken';
const accessToken = 'accessToken';

const JwtService = {
  storeTokens(tokens: Tokens) {
    localStorage.setItem(accessToken, tokens.accessToken);
    localStorage.setItem(refreshToken, tokens.refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem(accessToken);
  },

  getRefreshToken() {
    return localStorage.getItem(refreshToken);
  },

  removeTokens() {
    localStorage.removeItem(accessToken);
    localStorage.removeItem(refreshToken);
  }
};

export default JwtService;
