export const calculateFairness = (user, shift) => {
  let score = 85; // Start with a more realistic base score
  const flags = [];
  
  // Night shift considerations
  if (shift.type === "NIGHT") {
    if (user.nightShifts >= 4) {
      score -= 25;
      flags.push("EXCESSIVE_NIGHT_SHIFTS");
    } else if (user.nightShifts >= 2) {
      score -= 10;
      flags.push("HIGH_NIGHT_SHIFT_COUNT");
    } else {
      score += 5; // Bonus for taking night shifts when you haven't done many
    }
  }
  
  // Distance/commute impact
  if (shift.distance > 15) {
    score -= 20;
    flags.push("LONG_COMMUTE");
  } else if (shift.distance > 8) {
    score -= 8;
    flags.push("MODERATE_COMMUTE");
  } else if (shift.distance === 0) {
    score += 3; // Bonus for same location
  }
  
  // Priority and seniority rules
  if (shift.priority === "PRIME") {
    if (user.type === "PT") {
      score -= 30;
      flags.push("PART_TIME_PRIME_RESTRICTION");
    } else if (user.seniority < 12) {
      score -= 15;
      flags.push("INSUFFICIENT_SENIORITY_PRIME");
    } else {
      score += 5; // Bonus for qualified FT employees
    }
  }
  
  if (shift.priority === "CRITICAL") {
    if (user.seniority < 6) {
      score -= 25;
      flags.push("INSUFFICIENT_SENIORITY_CRITICAL");
    } else if (user.seniority >= 18) {
      score += 8; // Senior employees get priority
    }
  }
  
  // Department matching bonus
  if (shift.department === user.department) {
    score += 10;
    flags.push("SAME_DEPARTMENT_BONUS");
  } else {
    score -= 5;
    flags.push("CROSS_DEPARTMENT");
  }
  
  // Seniority bonuses
  if (user.seniority >= 24) {
    score += 8;
  } else if (user.seniority >= 12) {
    score += 4;
  }
  
  // Employment type considerations
  if (user.type === "FT" && (shift.type === "DAY" || shift.type === "EVENING")) {
    score += 3;
  }
  
  return { score: Math.max(15, Math.min(95, score)), flags };
};