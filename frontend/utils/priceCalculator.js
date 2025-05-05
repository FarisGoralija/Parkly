// utils/priceCalculator.js

export const calculateDurationInHours = (from, until) => {
  if (!from || !until) return 0;

  const [fromHours, fromMinutes] = from.split(":").map(Number);
  const [untilHours, untilMinutes] = until.split(":").map(Number);

  const fromTotal = fromHours * 60 + fromMinutes;
  let untilTotal = untilHours * 60 + untilMinutes;

  // Handle crossing midnight
  if (untilTotal <= fromTotal) {
    untilTotal += 24 * 60;
  }

  const diffInMinutes = untilTotal - fromTotal;
  return diffInMinutes / 60;
};

export const calculatePrice = (from, until, ratePerHour = 2) => {
  const duration = calculateDurationInHours(from, until);
  return parseFloat((duration * ratePerHour).toFixed(2)); // round to 2 decimal places
};
