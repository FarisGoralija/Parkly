const BASE_URL = "https://parkly-production.up.railway.app/api";

const endpoints = {
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`, 
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,
  getUserCars: (userId) => `${BASE_URL}/users/${userId}/cars`,            // GET all
  addUserCar: (userId) => `${BASE_URL}/users/${userId}/cars`,             // POST
  getSingleCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}`, // GET one
  deleteUserCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}` // DELETE
};

export default endpoints;
