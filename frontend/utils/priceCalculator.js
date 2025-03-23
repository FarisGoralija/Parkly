// utils/priceCalculator.js

export const calculateDurationInHours = (from, until) => {
    if (!from || !until) return 0;
  
    const [fromHours, fromMinutes] = from.split(":").map(Number);
    const [untilHours, untilMinutes] = until.split(":").map(Number);
  
    const fromTotal = fromHours * 60 + fromMinutes;
    const untilTotal = untilHours * 60 + untilMinutes;
  
    const diffInMinutes = untilTotal - fromTotal;
    if (diffInMinutes <= 0) return 0;
  
    return diffInMinutes / 60;
  };
  
  export const calculatePrice = (from, until, ratePerHour = 2) => {
    const duration = calculateDurationInHours(from, until);
    return Math.ceil(duration * ratePerHour); // round up to full hour
  };
  