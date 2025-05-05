
//1
export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

//2
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//3
const takenUsernames = [
  "admin",
  "ekilover",
  "username",
  "guest",
];

export const isValidUsername = (username) => {
  const trimmed = username.trim();

  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

  if (!usernameRegex.test(trimmed)) {
    return { valid: false, message: "Username must be at least 3 characters and contain only letters, numbers, or underscores." };
  }

  if (takenUsernames.includes(trimmed.toLowerCase())) {
    return { valid: false, message: "Username " + username + " is not available." };
  }

  return { valid: true };
};
