  GNU nano 5.6.1                                                       auth-service.js                                                                 
import HttpService from "./htttp.service";

class AuthService {
  // authEndpoint = process.env.API_URL;

  login = async (payload) => {
    const loginEndpoint = 'login';    
    return await HttpService.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = 'register';
    return await HttpService.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const logoutEndpoint = 'logout';
    return await HttpService.post(logoutEndpoint);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = 'password-forgot';
    return await HttpService.post(forgotPassword, payload);
  }

  resetPassword = async (credentials) => {
    const resetPassword = 'password-reset';
    return await HttpService.post(resetPassword, credentials);
  }

  getProfile = async() => {
    const getProfile = 'me';
    return await HttpService.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return await HttpService.patch(updateProfile, newInfo);
  }

  sendRequest = async (request) => {
    console.log("in auth service call");
    const sendRequest = "send-request";
    return await HttpService.post(sendRequest, request);
  }

  getUsers = async () => {    
    const getUsersEndPoint = "get-users";
    return await HttpService.post(getUsersEndPoint);
  }
}

export default new AuthService();








