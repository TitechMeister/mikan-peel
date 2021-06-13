<template>
  <div class="workcard" :style="styleObject" @click="onClick">
    <div v-if="danger" id="warning">
      <i class="fa fa-warning"></i>
    </div>

    <div id="workplace">{{ workplace }}</div>

    <div id="count">{{ workCollection ? workCollection.length : 0 }}</div>

    <div v-if="showDetail" id="detail"></div>

    <div v-if="showDetail" id="work-members">
      <ul>
        <li v-for="work in workCollection" :key="work.id">
          {{ work.member.username }} | {{ work.start_at.slice(11, 16) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

export default {
  // components: {
  //   FontAwesomeIcon
  // },
  data() {
    return {
      showDetail: false,
    };
  },
  methods: {
    onClick: function () {
      this.showDetail = !this.showDetail;
      const rect = this.$el.getBoundingClientRect();
      const offset = rect.left - window.innerWidth * 0.05;
      this.$emit("card-click", offset, this.showDetail);
    },
    po: function () {
      console.log("po");
    },
  },
  props: {
    workplace: String,
    danger: Boolean,
    color: String,
    workCollection: Array,
  },
  computed: {
    isActive: function () {
      return this.workCollection && this.workCollection.length > 0;
    },
    styleObject: function () {
      return {
        width: this.showDetail ? "90%" : "200px",
        height: this.showDetail
          ? `${120 + 24 * this.workCollection.length}px`
          : "100px",
        color: this.isActive ? "white" : this.color,
        backgroundColor: this.isActive ? this.color : "white",
        borderColor: this.color,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/ui.scss";

.workcard {
  @include card;
  display: grid;
  transition: all 0.3s ease;
  max-width: 500px;
  height: 100px;
  grid-template:
    "info    count   detail " 45px
    "place   count   detail " 55px
    "members members members" 1fr
    /100px 100px 1fr;
  justify-items: center;
  font-weight: bold;

  #warning {
    grid-area: info;
    align-self: end;
    font-size: 2rem;
    display: flex;
  }

  #workplace {
    grid-area: place;
    align-self: center;
    margin: 0px 5px 0px 5px;
    line-height: 1.4rem;
  }

  #count {
    grid-area: count;
    align-self: end;
    font-size: 3.2rem;
  }

  #detail {
    grid-area: detail;
    align-self: center;
    justify-self: left;
    font-weight: normal;
  }

  #work-members {
    grid-area: members;
    justify-self: left;
    font-weight: normal;
  }
}
</style>
