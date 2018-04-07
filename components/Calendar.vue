<template>
  <div class="calendar">
    <header>
      <div class="calender-header-day"
           v-for="(day, index) of days"
           :key="index">
        {{ day }}
      </div>
    </header>
    <div id="calender-grid-wrapper">
      <div id="calendar-grid"
           :style="calenderGridStyle">
        <template v-for="i of po">
          <CalendarNode :key="i"
                        :id="i"
                        :day="i"
                        keyColor="#f08300"
                        :indicators="i === 6 ? [{color: '#ae14d1'}, {color: '#114514'}] : []"
                        :isToday="i === 5"
                        :selected="i === selectedNode"
                        @node-click="onNodeClick" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import CalendarNode from '~/components/CalendarNode'

moment.tz.setDefault("Asia/Tokyo");

export default {
  components: {
    CalendarNode,
  },
  props: {
    entries: Object,   // [ Schedule object ]
    rawStart: [String, Date],
    rawEnd: [String, Date],
  },
  data () {
    return {
      initialSelectedNode: 5,
      selectedNode: 5,
      days: ["S", "M", "T", "W", "T", "F", "S"],
      po: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
  },
  computed: {
    start () { return moment(this.rawStart) },
    end () { return moment(this.rawEnd) },
    displayStartDate () { return moment(this.start).startOf("week") },
    displayEndDate () { return moment(this.end).endOf('week').add(1, 'seconds') },
    rawsToDisplay () { return this.displayEndDate.diff(this.displayStartDate, 'days') / 7 },
    showingInfo () {
      return this.selectedNode ? -Math.floor(this.selectedNode/7) - 1 : null
    },
    calenderGridStyle () {
      return { gridTemplateRows: `repeat(${this.rawsToDisplay}, "4rem")`, }
    }
  },
  methods: {
    onNodeClick (nodeId) {
      if (nodeId === this.selectedNode) {
        this.selectedNode = this.initialSelectedNode
        return
      }
      this.selectedNode = nodeId
    }
  },
  updated () {
  },
}
</script>

<style scoped lang="scss">
@import "../assets/styles/ui.scss";


.calendar {
  @include card;
  max-width: 700px;
  height: auto;
  font-weight: bold;
  overflow: hidden;

  header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .calender-header-day {
      text-align: center;
      margin: 5px 10px;
    }
  }
  header::after {
    content: "";
    width: 700%;
    border-bottom: 1px solid;
    transform: scaleX(0.95)
  }

  #calender-grid-wrapper {
    height: 200px;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    overflow-y: scroll;

    #calendar-grid {
      width: 100%;
      height: 200px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      > div {
        width: 100%;
        height: 100%;
        // border-style: solid;
        // border-left: 1px;
        // border-bottom: 1px;
        // border-width: 1px;
      }

      div:nth-child(7n) {
        border-right: 0px;
      }

      .calendar-info {
        grid-column: 1 / 8;
      }
    }
  }
}
</style>
