<template>
  <div class="outerButton"
       :style="outerStyle">
    <transition name="bounce">
    <div class="innerButton"
         v-if="selected"
         :style="innerStyle">
    </div>
    </transition>
  </div>
</template>

<script>
import chroma from 'chroma-js'

export default {
  data () {
    return {
    }
  },
  computed: {
    outerStyle: function () {
      return {
        borderColor: this.color,
        backgroundColor: chroma(this.color).brighten(8).hex()
      }
    },
    innerStyle: function () {
      return {
        backgroundColor: chroma(this.color).brighten().hex()
      }
    }
  },
  props: {
    selected: Boolean,
    color: String
  }
}
</script>

<style scoped lang="scss">
.outerButton {
  height: 1rem;
  width: 1rem;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
}

.innerButton {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
}

.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
