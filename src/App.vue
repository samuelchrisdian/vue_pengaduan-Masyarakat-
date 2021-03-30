<template>
  <div id="app">
    <div class="container-scroller">
      <router-view name="header" />
        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <router-view />
          </div>
        </div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
import Navbar from './views/layouts/Navbar'
export default {
  name: 'App'
}
</script>
