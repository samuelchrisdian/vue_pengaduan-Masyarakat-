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
                      <h6 class="font-weight-light">Register untuk menggunakan aplikasi Smart Kampung.</h6>
                      <form v-on:submit.prevent="Register">
                            <b-form-group
                            id="lbl_nik"
                            label="Nik"
                            label-for="input_nik"
                            >
                            <b-form-input id="input_nik" v-model="nik" placeholder="Nik anda" trim></b-form-input>
                            </b-form-group>
                            <b-form-group
                            id="lbl_nama"
                            label="Nama"
                            label-for="input_nama"
                            >
                            <b-form-input id="input_nama" v-model="nama" placeholder="Nama anda" trim></b-form-input>
                            </b-form-group>
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
                             <b-form-group
                            id="lbl_telp"
                            label="Telepon"
                            label-for="input_telp"
                            >
                            <b-form-input id="input_telp" v-model="telp" placeholder="Telepon anda" trim></b-form-input>
                            </b-form-group>

                            <b-button
                                variant="primary"
                                block
                                type="submit"
                                >Register
                            </b-button>
                        </form>
                        <h8>Sudah punya akun?</h8>&nbsp;<a href="/login">Klik disini.</a>
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
        nik: '',
        nama: '',
        username: '',
        password: '',
        level: '',
        telp: '',
        message: '',
      };
    },
    methods: {
        Register: function(){
        let nik = this.nik;
        let nama = this.nama;
        let username = this.username;
        let password = this.password;
        let level = this.level;
        let telp = this.telp;
        this.$store.dispatch('register', {
            nik,
            nama,
            username,
            password,
            level,
            telp,
          })
          .then(() => this.$router.push('/login'))
          .catch(err => console.log(err));
      }
    }
};
</script>