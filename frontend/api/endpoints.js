const BASE_URL = "https://parkly-production.up.railway.app/api";
const LOCAL_URL = "http://192.168.0.10:8000/api"

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
  forgotPassword: `${LOCAL_URL}/forgot-password`,
  resetPassword: `${LOCAL_URL}/reset-password`,
  verifyCode: `${LOCAL_URL}/verify-reset-code`,

  addReservation: `${BASE_URL}/reservations`,
  getReservations: `${BASE_URL}/reservations`,

    toggleFavorite: `${BASE_URL}/favorites/toggle`,
    getFavorites: `${BASE_URL}/favorites`,

    getUserCards: (userId) => `${BASE_URL}/users/${userId}/cards`,
  addUserCard: (userId) => `${BASE_URL}/users/${userId}/cards`,
  deleteUserCard: (userId, cardId) => `${BASE_URL}/users/${userId}/cards/${cardId}`,

  getLoggedInUser: `${BASE_URL}/user`,
  updateProfile: `${BASE_URL}/profile`,

googleLogin: `${BASE_URL}/auth/google`,

checkUsername: `${BASE_URL}/check-username`,
checkEmail: `${BASE_URL}/check-email`,








};

export default endpoints;