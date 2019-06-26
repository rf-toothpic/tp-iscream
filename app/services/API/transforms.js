import { getWeekNumber } from 'utils/datetime'

export function entryList (entries) {
  console.log(entries)
  return entries.map((ent)=>{
    ent.week = getWeekNumber(ent.date)
    return ent
  })
}
