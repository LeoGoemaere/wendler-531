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

  .margin-top {
    margin-top: 10px;
  }

  .margin-bottom {
    margin-bottom: 10px;
  }

  // Accordion
  .accordion {
    border-bottom: 1px solid #34495e;
  }
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
    padding: 15px;
    text-transform: uppercase;
    font-size: 13px;
    cursor: pointer;
  }
  .accordion__title--primary {
    background-color: #3b6ea0;
    color: #fff;
    .accordion__input:checked + & {
      background-color: #34495e;
    }
  }
  .accordion__title--secondary {
    background-color: #b3b3b3;
    color: #353535;
  }
  .accordion__title--tertiary {
    background-color: #cecece;
    color: #353535;
  }
  .accordion__title--quaternary {
    background-color: #eaeaea;
    color: #353535;
  }
  .accordion__title--quinary {
    background-color: #f7f7f7;
    color: #353535;
  }
  .accordion__title--child {
    padding-left: 35px;
  }
  .accordion__type {
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 10px;
    margin-right: 20px;
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
    &.accordion__content--primary { border-left: 2px solid #3b6ea0; }
    &.accordion__content--secondary { border-left: 2px solid #b3b3b3; }
    &.accordion__content--tertiary { border-left: 2px solid #cecece; }
    &.accordion__content--quaternary { border-left: 2px solid #eaeaea; }
    &.accordion__content--quinary { border-left: 2px solid #f7f7f7; }

  
  }
  .set-row {
    align-items: center;
  }
  .export-button {
    position: fixed;
    top: 40px;
    right: 40px;
  }

  // Bulma override
  .input {
    border-radius: 0;
    box-shadow: none;
  }
  .button {
    border-radius: 0;
  }
</style>
