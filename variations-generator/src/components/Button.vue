<template>
	<div>
        <button class="button is-link is-fullwidth margin" :class="{ 'is-light': isLight }">{{ value }}</button>
    </div>
</template>

<script>
    export default {
      name: 'Button',
      props: {
          value: String,
          isLight: Boolean
      }
    }
</script>

<style scoped lang="scss">
</style>
