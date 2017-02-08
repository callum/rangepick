module.exports = calendar

function calendar (yearMonth, from) {
  if (from === undefined) from = 0
  
  var d = new Date(yearMonth)
  var m = d.getMonth()
  var weeks = []

  while (d.getMonth() === m) {
    var week = []
    for (var i = 0; i < 7; i++) {
      if (d.getMonth() !== m || getDayFrom(d, from) !== i) {
        week.push(null)
        continue
      }
      week.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

function getDayFrom (date, from) {
  var day = date.getDay() - from
  if (day === -1) return 6
  return day
}
