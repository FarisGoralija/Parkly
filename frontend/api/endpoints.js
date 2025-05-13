const BASE_URL = "https://parkly-production.up.railway.app/api";

const endpoints = {
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`, 
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,
};

export default endpoints;
