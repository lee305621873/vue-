<template>
  <div id="app">
    <headvue></headvue>
     <router-view></router-view>
  </div>
</template>

<script>
 import headvue from './components/headvue/heah';
export default {
  components:{
     headvue,
  }
}
</script>

<style>
*{
  padding:0;
  margin: 0;
}

</style>
