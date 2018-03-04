
<template>
  <div class="selector-foldable"
       role="radiogroup">
    <transition-group name="list"
                      tag="div">
    <template v-if="value != null">
      <SelectorFoldableItem v-for="item in computedItems"
                            :item="item"
                            :selected="item.id == value"
                            :identifier="identifier"
                            :key="item.id"
                            @item-click="onItemClick"/>
    </template>
    <div v-else
         class="foldout-default-item"
         :key=-1
         @click="onDefaultItemClick">
      <div class="chevron-down"></div>
      <div id="select-message">{{ selectMessage }}</div>
    </div>
    </transition-group>
  </div>
</template>

<script>
import SelectorFoldableItem from './SelectorFoldableItem'

export default {
  components: {
    SelectorFoldableItem
  },
  data () {
    return {
      identifier: 'poyopoyo'
    }
  },
  computed: {
    computedItems () {
      return this.items.filter(item => item.id === this.value || this.expand)
    }
  },
  props: {
    value: Number,
    items: Array,
    expand: {
      type: Boolean,
      default: false
    },
    selectMessage: {
      type: String,
      default: 'Please select'
    }
  },
  methods: {
    onItemClick (id) {
      this.$emit('selector-foldable-click')
      this.$emit('input', id)
    },
    onDefaultItemClick () {
      this.$emit('selector-foldable-click')
      this.$emit('input', -1)
    }
  }
}
</script>

<style scoped lang="scss">
.foldout-default-item {
  display: grid;
  align-items: center;
  grid-template-columns: 1rem 1fr;
  grid-column-gap: 0.5rem;
  margin: 0.3rem;
  transition: all 0.3s ease;
  font-weight: 100;

  .chevron-down {
    height: 0.5rem;
    width: 0.5rem;
    border-left: 1px solid;
    border-bottom: 1px solid;
    transform: rotate(-45deg) translateY(-0.2rem);
  }
}

.list-enter-active, .list-leave-active {
  transition: all .3s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: transform .3s ease
}
</style>
