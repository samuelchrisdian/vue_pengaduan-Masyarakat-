<template>
    <div>
        <div class="container-scroller">
          <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="main-panel">
              <div class="content-wrapper d-flex align-items-center auth">
                <div class="row w-100">
                  <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left p-5">
                      <div class="navbar-brand brand-logo">
                        <img src="../../public/img/logo.png" align-items="center">
                      </div>
                      <h4>Selamat datang!</h4>
                      <h6 class="font-weight-light">Login untuk menggunakan aplikasi Smart Kampung.</h6>
                      <form v-on:submit.prevent="Login">
                            <b-form-group
                            id="lbl_username"
                            label="Username"
                            label-for="input_username"
                            >
                            <b-form-input id="input_username" v-model="username" placeholder="Username anda" trim></b-form-input>
                            </b-form-group>

                            <b-form-group
                            id="lbl_password"
                            label="Password"
                            label-for="input_password"
                            >
                            <b-form-input type="password" id="input_password" v-model="password" placeholder="Kata sandi" trim></b-form-input>
                            </b-form-group>

                            <b-button
                                variant="primary"
                                block
                                type="submit"
                                >Masuk
                            </b-button>
                        </form>
                        <h8>Belum punya akun?</h8>&nbsp;<a href="/register">Klik disini.</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- content-wrapper ends -->
          </div>
            <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                <b-spinner label="Spinning" variant="success"></b-spinner>
                <strong class="text-success">Loading...</strong>
            </b-toast>
            <!-- toast untuk tampilan message box -->
            <b-toast id="message" title="Message">
            <strong class="text-success">{{ message }}</strong>
            </b-toast>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        username: '',
        password: '',
        message: '',
      }
    },
    methods: {
        Login: function(){
            this.$bvToast.show("loadingToast")
            let username = this.username 
            let password = this.password
            this.$store.dispatch('login', { username, password })
            .then((response) => {
                this.message = response.data.message
                this.$bvToast.hide("loadingToast")
                this.$bvToast.show("message")
                this.$router.push('/').catch(() => {});
            })
            .catch(err => console.log(err))
        }
    }
}
</script>