<script setup lang="ts">


</script>

<template>



  <router-view />

</template>

<style lang="scss" scoped>
#nprogress .bar {
  background: red !important;
}

html,
body,
#app {

  height: 100%;

}

.thediv {
  z-index: 100;
  position: absolute;
  top: 300px;
  right: 2px;
  height: 100px;
  width: 180px;

  img {
    width: 100%;
    height: 100%;
  }

}



</style>
