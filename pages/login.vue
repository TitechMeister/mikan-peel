<template>
  <div id="login">
    <div id="logo">
      <img src="/Mikan-logo-white.png" />
    </div>
    <h1>Mikan</h1>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show">
      <b-form-group
        id="field-username"
        label="Username"
        label-for="input1">
        <b-form-input
          id="input1"
          v-model.trim="form.username" />
      </b-form-group>
      <b-form-group
        id="user-password"
        label="Password"
        label-for="input2">
        <b-form-input
          id="input2"
          type="password"
          v-model.trim="form.password" />
      </b-form-group>
      <ButtonOutlineMikan
        id="register-link"
        type="submit">Login</ButtonOutlineMikan>
    </b-form>
    <router-link
      id="register-link"
      to="register">Register</router-link>
  </div>
</template>

<script>
import * as api from '../utils/mikan-api'
import Cookies from 'js-cookie';
import ButtonOutlineMikan from '~/components/ButtonOutlineMikan'

export default {
  components: {
    ButtonOutlineMikan
  },
  computed: { },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      await this.$store.dispatch("fetchToken", this.form)
      if (Cookies.get('redirect')) {
        const redirect = Cookies.get('redirect')
        location.href = redirect;
        return
      }
      await this.$store.dispatch("fetch")
      this.$router.push('/')
    },
  },
  middleware: 'noAuth',
  layout: 'login'
}
</script>

<style scoped lang=scss>
#login {
  width: 600px;
  text-align: center;
  color: white;

  #logo {
    height: 200px;
    text-align: center;
    img {
      height: 100%;
      width: auto;
    }
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
  }

  input, textarea {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }

  #register-link {
    color: white;
    margin: 20px;
  }

}

</style>
