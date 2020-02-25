<template>
  <div id="app">
    <the-header></the-header>
    <transition name="page">
      <router-view></router-view>
    </transition>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
export default {
  components: {
    TheHeader,
    TheFooter
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
ul {
  list-style: none;
}

</style>