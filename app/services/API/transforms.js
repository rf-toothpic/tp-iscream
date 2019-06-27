import { getWeekNumber } from 'utils/datetime'

export function entryList (entries) {
  return entries.map((ent) => {
    ent.date = new Date(ent.date)
    ent.week = getWeekNumber(ent.date)
    ent.dietary_requirements = ent.dietary_requirements || ent.allergens
    return ent
  })
}
export function entryGet (ent) {
  ent.date = new Date(ent.date)
  ent.week = getWeekNumber(ent.date)
  ent.dietary_requirements = ent.dietary_requirements || ent.allergens
  return ent
}
