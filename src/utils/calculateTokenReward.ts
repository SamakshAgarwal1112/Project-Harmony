// Enhanced token calculation system
export const calculateTokenReward = (user, shift, fairnessScore) => {
  let baseReward = 0;
  const bonuses = [];
  
  // Base reward for successful swap
  baseReward = 25;
  
  // Shift type bonuses
  if (shift.type === "NIGHT") {
    baseReward += 15;
    bonuses.push("Night Shift Bonus: +15");
  } else if (shift.type === "EVENING") {
    baseReward += 8;
    bonuses.push("Evening Shift Bonus: +8");
  }
  
  // Priority bonuses
  if (shift.priority === "CRITICAL") {
    baseReward += 20;
    bonuses.push("Critical Priority Bonus: +20");
  } else if (shift.priority === "PRIME") {
    baseReward += 12;
    bonuses.push("Prime Priority Bonus: +12");
  }
  
  // Distance penalty/bonus
  if (shift.distance > 10) {
    baseReward += Math.min(15, shift.distance);
    bonuses.push(`Long Commute Bonus: +${Math.min(15, shift.distance)}`);
  }
  
  // Fairness score bonus (higher fairness = more tokens)
  if (fairnessScore >= 85) {
    baseReward += 10;
    bonuses.push("High Compatibility Bonus: +10");
  } else if (fairnessScore >= 70) {
    baseReward += 5;
    bonuses.push("Good Compatibility Bonus: +5");
  }
  
  // Cross-department bonus
  if (shift.department !== user.department) {
    baseReward += 8;
    bonuses.push("Cross-Department Bonus: +8");
  }
  
  // Seniority consideration
  if (user.seniority < 6) {
    baseReward += 5;
    bonuses.push("New Associate Bonus: +5");
  }
  
  // Random small bonus (1-5 tokens) to add variability
  const randomBonus = Math.floor(Math.random() * 5) + 1;
  baseReward += randomBonus;
  bonuses.push(`Performance Bonus: +${randomBonus}`);
  
  return { total: baseReward, bonuses };
};