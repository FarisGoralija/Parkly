const BASE_URL = "https://parkly-production.up.railway.app/api";

const endpoints = {
  // Parking API
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`,

  // Auth
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,

 
  


};

export default endpoints;
