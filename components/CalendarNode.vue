<template>
  <div class="calendar-node"
       :style="calendarNodeStyle"
       @click.prevent="onClick">
    <div class="calendar-node-wrapper">
      <div class="calendar-node-date">
        {{ day }}
      </div>
      <div class="calendar-node-indicators">
        <div v-for="(indicator, index) in indicators"
             class="calendar-node-indicator"
             :style="indicatorStyle(indicator.color)"
             :key="index" >
        </div>
      </div>
    </div>
    <transition name="bounce">
      <div v-if="selected"
           class="calendar-node-circle-indicator calendar-node-circle-indicator-selected"
           :style="circleIndicatorStyle">
        <transition name="ripple">
        <div v-if="showRipple"
             class="calendar-node-circle-indicator-ripple"
             :style="circleIndicatorRippleStyle">
        </div>
        </transition>
      </div>
    </transition>
    <div v-if="isToday && !selected"
         class="calendar-node-circle-indicator calendar-node-circle-indicator-today"
         :style="circleIndicatorTodayStyle">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    day: Number,
    month: Number,
    showMonth: {
      type: Boolean,
      default: false
    },
    isToday: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    keyColor: {
      type: String,
      default: "#f08300"
    },
    indicators: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showRipple: false,
      clickPos: null
    }
  },
  computed: {
    calendarNodeStyle () {
      if (this.selected) {
        return { color: "#ffffff" }
      }
      else if (this.isToday) {
        return { color: this.keyColor }
      }
      else {
        return {}
      }
    },
    circleIndicatorStyle () {
      return {
        backgroundColor: this.keyColor,
        borderColor: this.keyColor,
      }
    },
    circleIndicatorTodayStyle () {
      return {
        borderColor: this.keyColor
      }
    },
    circleIndicatorRippleStyle () {
      if (!this.clickPos) {
        return {}
      }
      return {
        left: `calc(50% - 1rem + ${this.clickPos[0]}px)`,
        top: `calc(50% - 1rem + ${this.clickPos[1]}px)`,
      }
    }
  },
  watch: {
    selected (val) {
      if (val) {
        this.showRipple = true
      }
      if (this.isToday) {
        this.$nextTick(function () {
          this.clickPos = [0, 0]
        })
      }
      this.$nextTick(function () {
        this.showRipple = false
      })
    }
  },
  methods: {
    indicatorStyle (color) {
      return { backgroundColor: this.selected ? "#ffffff" : color }
    },
    onClick (event) {
      this.$emit('node-click', this.id)
      const rect = this.$el.getBoundingClientRect()
      this.clickPos = [event.clientX - rect.left - rect.width/2,
                       event.clientY - rect.top - rect.height/2]
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/styles/ui.scss";

.calendar-node {
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  .calendar-node-date {
    display: flex;
    justify-content: center;
    align-self: end;
    color: inherit;
  }

  .calendar-node-indicators {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;

    .calendar-node-indicator {
      height: 3px;
      width: 3px;
      border-radius: 50%;
      margin: 0px 1px;
    }
  }

  .calendar-node-circle-indicator {
    position: absolute;
    height: 2.7rem;
    width: 2.7rem;
    border-radius: 50%;
    z-index: -1;
    overflow: hidden;
  }
  .calendar-node-circle-indicator-selected {
    @include deep-shadow;
  }
  .calendar-node-circle-indicator-today {
    border-style: solid;
    border-width: 1px;
  }
  .calendar-node-circle-indicator-ripple {
    position: absolute;
    height: 2rem;
    width: 2rem;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }
}


.bounce-enter-active {
  animation: bounce-in .25s;
}
.bounce-leave-active {
  animation: bounce-in .25s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.ripple-leave-active {
  animation: ripple 0.7s cubic-bezier(.39,.24,.38,.94);
}

@keyframes ripple {
  0% {
    transform: scale(0);
  }
  30% {
    opacity: 1;
  }
  80% {
    transform: scale(3);
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
