<template>
  <section>
    <ListWorkplace/>
    <Timecard/>
    <Timetable :entriesMap="entriesMap"></Timetable>
  </section>
</template>

<script>
import ListWorkplace from '~/components/ListWorkplace'
import Timecard from '~/components/Timecard'
import Timetable from '~/components/Timetable'

export default {
  data () {
    return {
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
  },
  middleware: 'auth'
}
</script>

<style>
</style>
