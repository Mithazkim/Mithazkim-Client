import HttpService from './httpService';
import { Tokens } from './jwtService';

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';
const ApiService = {
  login(credentials: { username: string; password: string }) {
    return HttpService.post<Tokens>(baseEndPoint + '/user/login', credentials);
  },

  refreshToken(refreshToken: string) {
    return HttpService.post<Tokens>(baseEndPoint + '/auth/refreshToken', { refreshToken });
  },

  // food
  getFood() {
    return HttpService.get(baseEndPoint + '/food', undefined, true);
  },

  addFood(food: { berakhahId: string; name: string }) {
    return HttpService.post(baseEndPoint + '/food', food);
  },

  // berakhah
  getBerakhah() {
    return HttpService.get(baseEndPoint + '/berakhah', undefined, true);
  }
};

export default ApiService;
