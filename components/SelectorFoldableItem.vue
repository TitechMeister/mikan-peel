<template>
  <div
    class="foldout-radio-item"
    @click.prevent="onClick">
    <input type="radio"
           class="foldout-radio-input"
           :name=identifier
           :id="identifier+item.id"/>
    <SelectorFoldableButton class="foldout-radio-button"
                            :color="item.color"
                            :selected="selected"/>
    <label class="foldout-radio-rabel"
           :style="foldoutRadioLabelStyle"
           :for="identifier+item.id">
      <span>{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
import SelectorFoldableButton from './SelectorFoldableButton'

export default {
  components: {
    SelectorFoldableButton
  },
  props: {
    item: Object,
    selected: {
      type: Boolean,
      default: false
    },
    identifier: String
  },
  methods: {
    onClick: function () {
      this.$emit('item-click', this.item.id)
    }
  },
  computed: {
    foldoutRadioLabelStyle: function () {
      return {
        fontWeight: this.selected ? 'bolder' : 'normal'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.foldout-radio-item {
  display: grid;
  align-items: center;
  grid-template-columns: 1rem 1fr;
  grid-column-gap: 5px;
  margin: 0.3rem;
  transition: all 0.3s ease;

  .foldout-radio-input {
    z-index: -1;
    opacity: 0;
    grid-column: 1;
    position:absolute
  }
  .foldout-radio-button{
    grid-column: 1;
  }
  label {
    margin-bottom: 0;
  }
  .foldout-radio-label {
    grid-column: 2;
  }
}
</style>
