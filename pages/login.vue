<template>
  <div id="login">
    <LogoBig></LogoBig>
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
        id="login-button"
        type="submit">Login</ButtonOutlineMikan>
    </b-form>
    <div id="link-wrapper">
      <router-link
        id="register-link"
        to="register">Register</router-link>
      <router-link
        id="recover-link"
        to="recover">Forgot password?</router-link>
    </div>
  </div>
</template>

<script>
import * as api from '../utils/mikan-api'
import Cookies from 'js-cookie';
import ButtonOutlineMikan from '~/components/ButtonOutlineMikan'
import LogoBig from '~/components/LogoBig'

export default {
  components: {
    ButtonOutlineMikan,
    LogoBig
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
  middleware: ['noAuth'],
  layout: 'login'
}
</script>

<style scoped lang=scss>
#login {
  width: 600px;
  text-align: center;
  color: white;

  input, textarea {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }

  #login-button {
    color: white;
    margin: 20px;
  }

  #link-wrapper {
    display: flex;
    flex-direction: column;
    * {
      margin: 5px;
      color: white;
    }
  }

}

</style>
