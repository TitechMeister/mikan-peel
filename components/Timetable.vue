<template>
<div class="timetable">
  <div class="places">
  </div>
  <div class="entries">
    <header>
      <!-- {{ entries }} -->
    </header>
    <div id="po">
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'

const compareStartTime = (a, b) => moment(a.start_at).diff(b.start_at)
const checkTimeRangesOverlap = (a, b) => moment(a.end_at).isAfter(b.start_at)

const divideToNotDuplicated = (entries, sortCompareFunc, dupilicationCheckFunc) => {
  const sorted = entries.slice().sort(sortCompareFunc)
  const result = [[]]             // inner empty array: sentinel
  for (let entry of sorted) {
    for (let resultEntries of result) {
      if (resultEntries.length === 0) {
        resultEntries.push(entry)
        result.push([])           // push new sentinel
        break
      }
      if (!dupilicationCheckFunc(resultEntries[resultEntries.length-1], entry)) {
        resultEntries.push(entry)
        break
      }
    }
  }
  // remove sentinel
  result.pop()
  return result
}

export default {
  components: {
  },
  props: {
    entriesMap: Object,   // { workplace_id: [ { start_at, end_at, color, type } ] }
    rawStart: [String, Date],
    rawEnd: [String, Date],
  },
  data () {
    return {
    }
  },
  computed: {
    start () { return moment(rawStart).startOf('hour') },
    end () { return moment(rawEnd) },
    entries () {
      const uniqued = {}
      for (let key in this.entriesMap) {
        uniqued[key] = divideToNotDuplicated(this.entriesMap[key],
                                             compareStartTime,
                                             checkTimeRangesOverlap)
      }
      return uniqued
    }
  },
  methods: {
  },
  updated () {
  },
}
</script>

<style scoped lang="scss">
.timetable {
  display: flex;
  max-width: 800px;
  height: 300px;
  margin: 20px;
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 1px;
  font-weight: bold;
  overflow: hidden;

  .places {
    width: 200px;
    height: 100%;
    background-color: #2c3e50;
  }

  .entries {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    scroll-behavior: smooth;
    overflow-x: scroll;
    #po {
      width: 1000px;
      height: 100%;
      background: linear-gradient(to right, white, white 96%, lightgray);
      background-size: 25px;
    }
  }
}
</style>
