module.exports = calendar

function calendar (yearMonth) {
  var d = new Date(yearMonth)
  var m = d.getMonth()
  var weeks = []

  while (d.getMonth() === m) {
    var week = []
    for (var i = 0; i < 7; i++) {
      if (d.getMonth() !== m || d.getDay() !== i) {
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
