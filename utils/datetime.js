import moment from 'moment'

export const isOverlapped = (time1, time2) => {
  time1_start = moment(time1.start)
  time1_end = moment(time1.end)
  time2_start = moment(time2.start)
  time2_end = moment(time2.end)
  return time1_end.isAfter(time2_start)
}
