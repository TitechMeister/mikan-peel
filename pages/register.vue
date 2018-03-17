<template>
  <div id="register">
    <LogoMedium></LogoMedium>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show">
      <b-form-group horizontal id="field-username"
                               label="ユーザー名"
                               label-for="form-username">
        <b-form-input id="form-username"
                      :state="!status_message.username"
                      v-model.trim="form.username" />
        <transition name="fade">
          <b-form-invalid-feedback id="username-feedback"
                                   v-if="status_message.username">
            {{ status_message.username }}
          </b-form-invalid-feedback>
        </transition>
      </b-form-group>

      <b-form-group horizontal
                    id="field-email"
                    label="メール"
                    label-for="form-email">
        <b-form-input id="form-email"
                      :state="!status_message.email"
                      placeholder="example@meister.tech"
                      v-model.trim="form.email" />
        <transition name="fade">
          <b-form-invalid-feedback id="email-feedback"
                                   v-if="status_message.email">
            {{ status_message.email }}
          </b-form-invalid-feedback>
        </transition>
      </b-form-group>

      <b-form-group horizontal
                    id="field-password"
                    label="パスワード"
                    label-for="form-password">
        <b-form inline
                id="forms-password">
          <b-form-input id="form-password"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :state="!status_message.password"
                        type="password"
                        v-model.trim="form.password" />
          <b-form-input id="form-password-confirm"
                        class="mr-sm-2 mb-sm-0"
                        :state="passwordConfirm === form.password"
                        type="password"
                        placeholder="再入力"
                        v-model.trim="passwordConfirm" />
        </b-form>
        <transition name="fade">
          <div id="password-feedback"
               class="invalid-feedback-inline-form"
               v-if="status_message_password">
            {{ status_message_password }}
          </div>
        </transition>
      </b-form-group>

      <b-form-group horizontal
                    id="field-name"
                    label="Name"
                    label-for="form-name">
        <b-form inline
                id="form-name">
          <b-form-input id="form-first-name"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :state="!status_message.first_name"
                        placeholder="Chika"
                        v-model.trim="form.first_name" />
          <b-form-input id="form-last-name"
                        class="mr-sm-2 mb-sm-0"
                        :state="!status_message.last_name"
                        placeholder="Takami"
                        v-model.trim="form.last_name" />
        </b-form>
        <transition name="fade">
          <div id="name-feedback"
               class="invalid-feedback-inline-form"
               v-if="status_message_name">
            {{ status_message_name }}
          </div>
        </transition>
      </b-form-group>

      <b-form-group horizontal
                    id="field-ja-name"
                    label="名前"
                    label-for="form-ja-name">
        <b-form inline
                id="form-ja-name">
          <b-form-input id="form-ja-last-name"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :state="!status_message.ja_last_name"
                        placeholder="高海"
                        v-model.trim="form.ja_last_name" />
          <b-form-input id="form-ja-first-name"
                        class="mr-sm-2 mb-sm-0"
                        :state="!status_message.ja_first_name"
                        placeholder="千歌"
                        v-model.trim="form.ja_first_name" />
        </b-form>
        <transition name="fade">
          <div id="ja-name-feedback"
               class="invalid-feedback-inline-form"
               v-if="status_message_ja_name">
            {{ status_message_ja_name }}
          </div>
        </transition>
      </b-form-group>

      <b-form-group horizontal
        id="field-executive-generation"
        label="執行代"
        label-for="form-executive-generation">
        <b-form-input id="form-executive-generation"
                      placeholder="2018"
                      type="number"
                      :state="!status_message.executive_generation"
                      v-model="form.executive_generation" />
        <transition name="fade">
          <b-form-invalid-feedback id="executive-generation-feedback"
                                   v-if="status_message.executive_generation">
            {{ status_message.executive_generation }}
          </b-form-invalid-feedback>
        </transition>
      </b-form-group>

      <b-form-group horizontal
                    id="field-team"
                    label="班"
                    label-for="form-team">
        <b-form-select id="form-team"
                       :state="!status_message.team"
                       v-model="form.team">
          <option v-for="team in teamsList"
                  :key="team.id"
                  :value="team.id">
            {{ team.name }}
          </option>
        </b-form-select>
        <transition name="fade">
          <b-form-invalid-feedback id="registration-team"
                                   v-if="status_message.team">
            {{ status_message.team }}
          </b-form-invalid-feedback>
        </transition>
      </b-form-group>

      <b-form-group horizontal id="field-profile-image"
                               label="プロフィール画像"
                               label-for="form-profile-image">
        <b-form-file id="form-profile-image"
                     v-model="form.profile_image"
                     :state="!status_message.profile_image"
                     accept="image/*"
                     placeholder="Choose a image..." />
        <transition name="fade">
          <div id="profile-image-feedback"
               class="invalid-feedback-inline-form"
               v-if="status_message.profile_image">
            {{ status_message.profile_image }}
          </div>
        </transition>
      </b-form-group>

      <b-form-group horizontal
        id="field-registration-code"
        label="登録コード"
        label-for="form-registration-code">
        <b-form-input
          id="form-registration-code"
          :state="!status_message.registration_code"
          v-model.trim="form.registration_code" />
        <transition name="fade">
          <b-form-invalid-feedback id="registration-code-feedback"
                                   v-if="status_message.registration_code">
            {{ status_message.registration_code }}
          </b-form-invalid-feedback>
        </transition>
      </b-form-group>

      <div id="register-button-wrapper">
        <ButtonOutlineMikan id="register-button"
                            type="submit">
          Register
        </ButtonOutlineMikan>
        <transition name="fade">
          <div id="registration-message-success"
               class="registration-message"
               v-if="registrationSuccess">
            Registered. Redirect in 3s...
          </div>
          <div id="registration-message-error"
               class="registration-message"
               v-if="registrationError">
            Please correct errors.
          </div>
        </transition>
      </div>
    </b-form>
  </div>
</template>

<script>
import * as api from '~/utils/mikan-api'
import Cookies from 'js-cookie';
import ButtonOutlineMikan from '~/components/ButtonOutlineMikan'
import LogoMedium from '~/components/LogoMedium'

export default {
  components: {
    ButtonOutlineMikan,
    LogoMedium
  },
  data () {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        ja_last_name: '',
        ja_first_name: '',
        executive_generation: null,
        team: null,
        profile_image: null,
        registration_code: '',
        file: null,
      },
      status_message: {
        username: null,
        password: null,
        email: null,
        first_name: null,
        last_name: null,
        ja_last_name: null,
        ja_first_name: null,
        executive_generation: null,
        team: null,
        profile_image: "Image will be cropped from center to be square.",
        registration_code: null,
      },
      teamsList: [],
      passwordConfirm: '',
      registrationSuccess: false,
      registrationError: false,
      show: true
    }
  },
  computed: {
    status_message_password () {
      const passwordMatch = this.form.password === this.passwordConfirm
      const passwordNoMatchMessage = passwordMatch ? null : 'Password did not match.'
      const passwordStatusMessage = this.status_message.password
      if (passwordMatch && !passwordStatusMessage) {
        return null
      }
      else if (!passwordMatch && passwordStatusMessage) {
        return [passwordNoMatchMessage, passwordStatusMessage].join("\n")
      }
      else {
        return passwordNoMatchMessage || passwordStatusMessage
      }
    },
    status_message_name () {
      if (!this.status_message.first_name && !this.status_message.last_name) {
        return null
      }
      else if (!this.status_message.first_name) {
        return this.status_message.last_name
      }
      else if (!this.status_message.last_name) {
        return this.status_message.first_name
      }
      else if (this.status_message.first_name === this.status_message.last_name) {
        return this.status_message.first_name
      }
      else {
        return [this.status_message.first_name, this.status_message.last_name].join("\n")
      }
    },
    status_message_ja_name () {
      if (!this.status_message.ja_first_name && !this.status_message.ja_last_name) {
        return null
      }
      else if (!this.status_message.ja_first_name) {
        return this.status_message.ja_last_name
      }
      else if (!this.status_message.ja_last_name) {
        return this.status_message.ja_first_name
      }
      else if (this.status_message.ja_first_name === this.status_message.ja_last_name) {
        return this.status_message.ja_first_name
      }
      else {
        return [this.status_message.ja_last_name, this.status_message.ja_first_name].join("\n")
      }
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      this.registrationSuccess = false
      this.registrationError = false
      const formData = new FormData()
      for (let key in this.form) {
        if (key !== "profile_image" || this.form.profile_image){
          formData.append(key, this.form[key])
        }
      }
      const options = {headers: {'Content-Type': 'multipart/form-data'}}
      try {
        await api.postWithoutDefaultHeader("/register/", formData, options)
      } catch (e) {
        console.log(e)
        if (!e.response) return
        for (let key in this.status_message) {
          this.status_message[key] = null
        }
        for (let key in e.response.data) {
          this.status_message[key] = e.response.data[key].join("\n")
        }
        this.registrationError = true
        return
      }
      this.registrationSuccess = true
      await this.$store.dispatch("fetchToken", this.form)
      setTimeout(() => {
        if (Cookies.get('redirect')) {
          const redirect = Cookies.get('redirect')
          location.href = redirect;
          return
        }
        this.$router.push('/login')
      }, 3000)
    },
  },
  async mounted () {
    this.teamsList = (await api.getWithoutDefaultHeader('/teams/')).data
  },
  middleware: 'noAuth',
  layout: 'login'
}
</script>

<style lang=scss>
#register {
  width: 600px;
  color: white;
  overflow: scroll;

  .b-form-group {
    margin: 15px 5px;
  }
  input, textarea, field-profile-image * {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  .invalid-feedback {
    color: white;
  }
  .invalid-feedback-inline-form {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: white;
  }
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
  .custom-file-input~.custom-file-label {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  .custom-file-input~.custom-file-label::after {
    content: none;
  }
  .custom-select {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  #register-button-wrapper {
    display: flex;
    align-items: center;

    #register-button {
      margin: 20px;
    }
    #register-message {
      margin: 30px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
