var css = require('sheetify')
var stylesheet = require('insert-stylesheet')
var yo = require('yo-yo')
var xtend = require('xtend')
var calendar = require('./calendar')

var MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')
var LABELS = 'M T W T F S S'.split(' ')

stylesheet('https://fonts.googleapis.com/css?family=Roboto:400,700')

var prefix = css`
  :host {
    align-items: flex-start;
    display: flex;
    font-family: 'Roboto', sans-serif;
  }
  button {
    background: none;
    border-radius: 2px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    color: #222;
    font-size: 20px;
    font: inherit;
    margin-top: 80px;
    margin: 15px;
    padding: 5px 10px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  th, td {
    font-size: 14px;
    height: 32px;
    text-align: center;
    vertical-align: center;
    width: 32px;
  }
  th {
    color: #666;
    font-weight: normal;
  }
  .desc {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  .month { margin: 15px }
  .day {
    border: 1px solid #ddd;
    color: #222;
  }
  .past { color: #888 }
  .selected {
    background: #efefef;
  }
`

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
  return yo`<div class=${prefix}>
    <button onclick=${updateYearMonth.bind(null, -1)}>‹</button>
    ${month(state.yearMonth)}
    ${month(nextYearMonth)}
    <button onclick=${updateYearMonth.bind(null, 1)}>›</button>
  </div>`
}

function month (yearMonth) {
  var month = calendar(yearMonth, 1)
  return yo`<div class=month>
    <div class=desc>${MONTHS[yearMonth.getMonth()]} ${yearMonth.getFullYear()}</div>
    <table>
      <thead>
        <tr>
          ${LABELS.map(label => yo`<th>${label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${month.map(monthWeek => yo`<tr>${monthWeek.map(day)}</tr>`)}
      </tbody>
    </table>
  </div>`
}

function day (monthDay) {
  if (!monthDay) return yo`<td></td>`
  var now = new Date()
  var date = monthDay.getDate()
  var handler = updateRange.bind(null, monthDay)
  if (monthDay < now) return yo`<td class="day past">${date}</td>`
  if ((monthDay >= state.start && monthDay <= state.start) ||
      (monthDay >= state.start && monthDay <= state.end)) {
    return yo`<td class="day selected" onclick=${handler}>${date}</td>`
  }
  return yo`<td title="${monthDay.toDateString()}" class="day" onclick=${handler}>${date}</td>`
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
