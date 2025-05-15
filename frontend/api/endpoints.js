const BASE_URL = "https://parkly-production.up.railway.app/api";

const endpoints = {
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`, 
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
  verifyCode: `${BASE_URL}/verify-reset-code`
};

export default endpoints;