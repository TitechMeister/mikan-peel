<template>
  <section id="wrapper">
    <Timecard/>
    <Calendar :rawStart="rawStart"
              :rawEnd="rawEnd"
              :entriesMap="entriesMap"></Calendar>
    <ListWorkplace/>
    <Timetable :entriesMap="entriesMap"></Timetable>
  </section>
</template>

<script>
import ListWorkplace from '~/components/ListWorkplace'
import Timecard from '~/components/Timecard'
import Timetable from '~/components/Timetable'
import Calendar from '~/components/Calendar'

export default {
  data () {
    return {
      rawStart: "2018-08-16",
      rawEnd: "2018-09-16",
      entriesMap: {
        po: [
          {
            start_at: "2018-01-27T01:22:00+09:00",
            end_at: "2018-02-19T13:40:26+09:00",
          },
          {
            start_at: "2018-02-27T01:00:00+09:00",
            end_at: "2018-02-30T11:21:51+09:00",
          },
        ],
        yo: [
          {
            start_at: "2018-01-27T01:00:00+09:00",
            end_at: "2018-02-19T13:40:26+09:00",
          },
          {
            start_at: "2018-01-27T01:22:00+09:00",
            end_at: "2018-01-27T01:15:30+09:00",
          },
        ],
      }
    }
  },
  components: {
    ListWorkplace,
    Timecard,
    Timetable,
    Calendar,
  },
  middleware: ['auth', 'underConstruction']
}
</script>

<style lang="scss">
#wrapper > * {
  margin: 20px;
}
</style>
