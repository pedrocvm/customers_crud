<template>
  <div class="headerContainer">
    <v-app-bar style="position:fixed" class="appBar" height="60px">
      <div class="logoWrapper">
        <router-link to="/" class="routerLink">
          <v-img
            width="200"
            class="logo"
            src="https://triyo.com.br/wp-content/uploads/2020/09/images_03.png"
          ></v-img>
        </router-link>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import 'src/sass/master.scss';
</style>
