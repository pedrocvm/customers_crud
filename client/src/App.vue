<template>
  <v-app id="app">
    <Header/>
    <v-main class="appContainer">
    <Background class='backgroundComponent'/>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view class='routerView'/>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.appContainer{
  background-color: #383838;
  position: relative;
  top: 70px;
}

.backgroundComponent{
  position: absolute;
}

.routerView{
  width: 100%;
  z-index: 1;
  position: fixed;
}

</style>

