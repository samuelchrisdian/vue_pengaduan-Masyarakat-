<template>
    <div class="horizontal-menu">
        <nav class="navbar top-navbar col-lg-12 col-12 p-0">
        <div class="nav-top flex-grow-1">
            <div class="container d-flex flex-row h-100 align-items-center">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="/"><img src="../../../public/img/logo.png"></a>
                <a class="navbar-brand brand-logo-mini" href="/"><img src="../../../public/img/logo.png"></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1">
                <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                    Menu
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <span @click="logout" class="dropdown-item">
                        <i class="mdi mdi-logout text-primary"></i>
                        Logout
                    </span>
                    </div>
                </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                <span class="mdi mdi-menu"></span>
                </button>
            </div>
            </div>
        </div>
        </nav>
        <nav class="bottom-navbar">
        <div class="container">
            <ul class="nav page-navigation">
            <li class="nav-item">
                <router-link to="/" class="nav-link">
                <i class="mdi mdi-view-dashboard-outline menu-icon"></i>
                <span class="menu-title">Beranda</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/pengaduanmasyarakat" class="nav-link">
                <i class="mdi mdi-note-outline menu-icon"></i>
                <span class="menu-title">Input Pengaduan</span>
                </router-link>
            </li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        nama : function(){ return this.$store.getters.userDetail.nama},
        level : function(){ return this.$store.getters.userDetail.level}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          this.axios.post('/logout', conf).then(response => {
            if (response.data.success === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },
  },
}
</script>