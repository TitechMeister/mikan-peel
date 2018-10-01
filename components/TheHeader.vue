<template>
  <b-navbar toggleable="md" type="dark">
    <b-navbar-brand to="/">Mikan</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item active to="/profile"
                           class="member-profile-img mx-2"
                           :style="profileImgStyle" />
        <b-nav-item-dropdown :text="username" right>
          <b-dropdown-item disabled to="/profile">Profile</b-dropdown-item>
          <!-- <b-dropdown-item to="/profile">Profile</b-dropdown-item> -->
          <b-dropdown-item @click="logout" to="/logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import * as api from '~/utils/mikan-api'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('account', ['username']),
    ...mapGetters({
      profileImgUrl: 'account/profileImgUrl'
    }),
    profileImgStyle () {
      return {
        backgroundImage: `url(${this.profileImgUrl})`,
        backgroundSize: `2.5rem`,
        height: '2.5rem',
        width: '2.5rem',
        borderRadius: '50%'
      }
    }
  },
  methods: {
    logout () {
      this.$router.push('/logout')
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";
@import "../assets/styles/ui.scss";

.navbar {
  @include shallow-shadow;
  background-color: $mikan;
}

.member-profile-img > a {
  height: 100%;
  width: 100%;
}
</style>
