const endpoints = {
  parking: `${BASE_URL}/parkings`,
  getParkingById: (id) => `${BASE_URL}/parkings/${id}`, 
  registerUser: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,

  // Car API
  getUserCars: (userId) => `${BASE_URL}/users/${userId}/cars`,
  addUserCar: (userId) => `${BASE_URL}/users/${userId}/cars`,
  getSingleCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}`,
  deleteUserCar: (userId, carId) => `${BASE_URL}/users/${userId}/cars/${carId}`,

  // Password reset
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
  verifyCode: `${BASE_URL}/verify-reset-code`
};
