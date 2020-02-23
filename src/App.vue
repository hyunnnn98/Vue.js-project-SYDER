<template>
  <div id="app">
    <top-header></top-header>
    <transition name="page">
      <router-view class="main"></router-view>
    </transition>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader";

export default {
  components: {
    TopHeader
  }
};
</script>

<style>
body, ul {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}
</style>
