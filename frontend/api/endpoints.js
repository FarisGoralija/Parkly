const BASE_URL = "https://parkly-production.up.railway.app/api";

const endpoints = {
  // Parking API
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`,

  // Auth
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,

  // Car API
  getUserCars: (userId) => `${BASE_URL}/users/${userId}/cars`,
  addUserCar: (userId) => `${BASE_URL}/users/${userId}/cars`,
  getSingleCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}`,
  deleteUserCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}`,

  // Password Reset
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
  verifyCode: `${BASE_URL}/verify-reset-code`,

  addReservation: `${BASE_URL}/reservations`,
  getReservations: `${BASE_URL}/reservations`,

  //Update Profile
  updateProfile: `${BASE_URL}/profile`,

  //google login
  googleAuth: `${BASE_URL}/auth/google`,
};

export default endpoints;
