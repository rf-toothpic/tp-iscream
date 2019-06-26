
export function getWeekNumber (d) {
  if (!d && d.getFullYear) return '-'
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export function toDateString (d) {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`
}
