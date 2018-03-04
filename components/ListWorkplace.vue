<template>
  <div class="list-workplace">
    <ListWorkplaceItem v-for="wp in workplaces"
                       :key="wp.id"
                       :workplace="wp.name"
                       :danger="wp.danger"
                       :color="wp.color"
                       :workCollection="workInProgress[wp.id]"
                       @card-click="onCardClick"/>
  </div>
</template>

<script>
import ListWorkplaceItem from './ListWorkplaceItem'
import { mapState } from 'vuex'

export default {
  components: {
    ListWorkplaceItem
  },
  computed: {
    ...mapState('work', ['workplaces', 'workInProgress'])
  },
  methods: {
    onCardClick: function (offset, expand) {
      if (expand) {
        const options = {
          behavior: 'smooth',
          left: offset + this.$el.scrollLeft,
          top: 0
        }
        this.$el.scroll(options)
      }
    }
  },
}
</script>

<style scoped lang="scss">
.list-workplace{
  overflow-scrolling: touch;
  scroll-behavior: smooth;
  margin: 20px 0px;
  display: flex;
  overflow-x: scroll;
  div {
    flex-shrink: 0;
  }
}
</style>

