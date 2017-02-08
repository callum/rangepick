var yo = require('yo-yo')
var xtend = require('xtend')
var calendar = require('./calendar')

var LABELS = 'mo tu we th fr sa su'.split(' ')

var state = {
  yearMonth: new Date(2017, 0),
  start: null,
  end: null
}

var el = main()
document.body.appendChild(el)

function main () {
  var nextYearMonth = new Date(state.yearMonth)
  nextYearMonth.setMonth(nextYearMonth.getMonth() + 1)
  return yo`<main>
    <div style="display: flex">
      <button style="margin: 5px" onclick=${updateYearMonth.bind(null, -1)}>prev</button>
      <button style="margin: 5px" onclick=${updateYearMonth.bind(null, 1)}>next</button>
    </div>
    <div style="display: flex">
      ${month(state.yearMonth)}
      ${month(nextYearMonth)}
    </div>
  </main>`
}

function month (yearMonth) {
  var month = calendar(yearMonth, 1)
  return yo`<table style="margin: 5px" border=1 cellpadding=3>
    <thead>
      <tr>
        ${LABELS.map(label => yo`<th>${label}</th>`)}
      </tr>
    </thead>
    <tbody>
      ${month.map(monthWeek => yo`<tr>
        ${monthWeek.map(monthDay => yo`<td align=center onclick=${updateRange.bind(null, monthDay)}>
          ${day(monthDay)}
        </td>`)}
      </tr>`)}
    </tbody>
  </table>`
}

function day (monthDay) {
  if (!monthDay) return null
  if ((monthDay >= state.start && monthDay <= state.start) ||
      (monthDay >= state.start && monthDay <= state.end)) return yo`<b>${monthDay.getDate()}</b>`
  return monthDay.getDate()
}

function updateYearMonth (inc) {
  state.yearMonth.setMonth(state.yearMonth.getMonth() + inc)
  yo.update(el, main())
}

function updateRange (monthDay) {
  if (state.start && state.end) state = xtend(state, { start: null, end: null })
  if ((state.start && !state.end) && monthDay >= state.start) state = xtend(state, { end: monthDay })
  if (!state.start && !state.end) state = xtend(state, { start: monthDay, end: null })
  yo.update(el, main())
}
