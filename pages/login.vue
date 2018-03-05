<template>
  <div id="login">
    <div id="logo">
      <img src="/mikan.png" />
    </div>
    <h1>Mikan</h1>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show">
      <b-form-group
        id="fieldset1"
        label="Username"
        label-for="input1">
        <b-form-input
          id="input1"
          v-model.trim="form.username" />
      </b-form-group>
      <b-form-group
        id="fieldset2"
        label="Password"
        label-for="input2">
        <b-form-input
          id="input2"
          type="password"
          v-model.trim="form.password" />
      </b-form-group>
      <button
        type="submit"
        variant="primary"
        class="login-button--mikan">Login</button>
    </b-form>
  </div>
</template>

<script>
import * as api from '../utils/mikan-api'
import Cookies from 'js-cookie';

export default {
  computed: { },
  watchQuery: ['redirect'],
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

}

.login-button--mikan {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid white;
  background-color: #f08300;
  color: white;
  text-decoration: none;
  padding: 10px 30px;
}

.login-button--mikan:hover {
  border: 1px solid #f08300;
  background-color: white;
  color: #f08300;
}
</style>
