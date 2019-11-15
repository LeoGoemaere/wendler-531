<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Generator />
  </div>
</template>

<script>
import Generator from './components/Generator.vue'

export default {
  name: 'app',
  components: {
    Generator
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .margin {
      margin: 10px 0;
  }

  // Accordion
  .accordion {}
  .accordion__input {
    display: none;
    &:checked {
      + .accordion__title {
        ~ .accordion__content {
          display: block;
        }
        .accordion__angle {
          transform: rotate3d(-1, 0, 0, 180deg);
          transition: transform ease-out .3s;
        }
      }
    }
  }
  .accordion__title {
    display: flex;
    align-items: center;
    padding: 15px 0;
  }
  .accordion__title--child {
    padding-left: 35px;
  }
  .accordion__angle {
    margin-left: auto;
    transform: rotate3d(0, 0, 0, 0);
    transition: transform ease-out .3s;
    margin-left: 25px;
    .accordion__content & {
      color: #a7a7a7;
    }
  }
  .accordion__icon-container {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .accordion__content {
    display: none;
    overflow: hidden;
    padding: 0 10px;
  }
  .set-row {
    align-items: center;
  }
  .export-button {
    position: fixed;
    top: 40px;
    right: 40px;
  }
</style>
