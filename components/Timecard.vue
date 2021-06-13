<template>
  <div class="timecard" :style="timecardStyle">
    <div class="timecard-grid" :style="timecardGridStyle">
      <div id="datetime">
        <div id="date">8/10</div>
        <div id="time">11:45</div>
      </div>

      <div id="member">
        <div class="member-profile" id="profile" :style="profileImgStyle"></div>
        <div id="name">{{ username }}</div>
      </div>

      <div id="memberstatus">
        {{ statusText }}
      </div>

      <div id="workplaces">
        <SelectorFoldable
          v-model="selectedWorkplace"
          :expand="expandFoldoutRadio"
          :items="workplaces"
          @selector-foldable-click="onSelectorFoldableClick"
        />
      </div>

      <div id="message" :class="messageClass">
        {{ messageText }}
      </div>

      <b-button
        id="timecard-button"
        :class="buttonClass"
        :variant="buttonVariant"
        @click="onButtonClick"
      >
        {{ buttonText }}
      </b-button>
    </div>
  </div>
</template>

<script>
import SelectorFoldable from "~/components/SelectorFoldable";
import { mapState, mapGetters } from "vuex";
import chroma from "chroma-js";

const StateUnselected = -1;
const StateToStart = 0;
const StateToEnd = 1;
const StateToModify = 2;

export default {
  components: {
    SelectorFoldable,
  },
  data() {
    return {
      selectedWorkplace: null,
      expandFoldoutRadio: false,
    };
  },
  updated() {
    if (this.timecardState === StateUnselected && this.currentWork) {
      this.selectedWorkplace = this.currentWork.workplace.id;
    }
  },
  methods: {
    onSelectorFoldableClick() {
      this.expandFoldoutRadio = !this.expandFoldoutRadio;
    },
    async onButtonClick() {
      if (this.timecardState === StateUnselected) return;
      if (this.timecardState === StateToEnd) {
        await this.$store.dispatch("account/finishWorkForAccount");
      }
      if (
        this.timecardState === StateToStart ||
        this.timecardState === StateToModify
      ) {
        await this.$store.dispatch("account/createWorkForAccount", {
          workplace: this.selectedWorkplace,
        });
      }
      this.$store.dispatch("work/fetchWorkInProgress");
    },
  },
  props: {
    workCollection: Array,
  },
  computed: {
    ...mapState("work", ["workplaces"]),
    ...mapState("account", ["username", "currentWork"]),
    ...mapGetters({
      profileImgUrl: "account/profileImgUrl",
    }),

    timecardState() {
      if (this.selectedWorkplace === null || this.selectedWorkplace === -1)
        return StateUnselected;
      if (!this.currentWork) return StateToStart;
      if (this.currentWork.workplace.id === this.selectedWorkplace)
        return StateToEnd;
      else return StateToModify;
    },

    timecardStyle() {
      return {
        // [TODO] Calc correctly
        height: this.expandFoldoutRadio
          ? `calc(165px + ${(this.workplaces.length - 1) * 1.6 + 0.3}rem)`
          : "165px",
      };
    },
    timecardGridStyle() {
      if (this.currentWork) {
        return {
          color: chroma(this.currentWork.workplace.color).darken(2).hex(),
        };
      } else {
        return {};
      }
    },
    profileImgStyle() {
      return {
        backgroundImage: `url(${this.profileImgUrl})`,
        backgroundSize: `1.5rem`,
        height: "1.5rem",
        width: "1.5rem",
        borderRadius: "50%",
      };
    },
    buttonText() {
      switch (this.timecardState) {
        case StateUnselected:
          return "start";
        case StateToStart:
          return "start";
        case StateToEnd:
          return "end";
        case StateToModify:
          return "modify";
        default:
          return undefined;
      }
    },
    buttonVariant() {
      switch (this.timecardState) {
        case StateUnselected:
          return "outline-secondary";
        case StateToStart:
          return "outline-primary";
        case StateToEnd:
          return "outline-danger";
        case StateToModify:
          return "outline-info";
        default:
          return undefined;
      }
    },
    buttonClass() {
      if (this.timecardState === StateUnselected) {
        return "disabled";
      }
      return "";
    },
    statusText() {
      if (!this.currentWork) {
        return "No work in progress.";
      }
      const startTime = this.currentWork.start_at.slice(11, 16);
      const workplaceName = this.currentWork.workplace.name;
      return `${startTime}~ @${workplaceName}`;
    },
    messageText() {
      switch (this.timecardState) {
        case StateUnselected:
          return "Please select workplace";
        case StateToStart:
          return "Ready to start work";
        case StateToEnd:
          return `Ready to finish work`;
        case StateToModify:
          return "Changing workplace";
        default:
          return undefined;
      }
    },
    messageClass() {
      if (this.selectedWorkplace === null || this.selectedWorkplace === -1) {
        return "text-danger";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/ui.scss";

.timecard {
  @include card;
  transition: all 0.3s ease;
  max-width: 500px;
  height: auto;
}

.timecard-grid {
  display: grid;
  height: 100%;
  width: 100%;
  padding: 10px 15px 10px 15px;
  grid-template:
    "date       .          details" 1.5rem
    "date       .          memberstatus" calc(70px - 1.5rem)
    "workplaces workplaces workplaces" 1fr
    "message    message    button" auto
    / 120px 1fr minmax(auto, 200px);
  font-weight: normal;

  #datetime {
    justify-self: start;
    align-self: start;
    font-weight: bold;

    #date {
      margin-bottom: -5px;
    }

    #time {
      font-size: 2rem;
    }
  }

  #member {
    grid-area: details;
    align-self: start;
    display: flex;
    align-items: center;
    #name {
      margin-left: 10px;
    }
  }

  #memberstatus {
    grid-area: memberstatus;
    padding-left: calc(1.5rem + 10px);
    font-size: 0.7rem;
    font-weight: lighter;
  }

  #workplaces {
    grid-area: workplaces;
  }

  #message {
    display: grid;
    grid-template-columns: 0.7rem auto;
    grid-column-gap: 10px;
    align-items: center;
    grid-area: message;
    justify-self: start;
    align-self: end;
    font-size: 0.7rem;
    font-weight: lighter;
    vertical-align: middle;
    white-space: nowrap;
    transform: translateY(0.04rem);
  }

  #timecard-button {
    grid-area: button;
    justify-self: end;
    align-self: end;
  }
}
</style>
