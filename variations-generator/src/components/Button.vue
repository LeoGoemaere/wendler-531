<template>
	<div :class="`has-text-${align}`">
        <button class="button margin" :class="className">{{ value }}</button>
    </div>
</template>

<script>
    export default {
      name: 'Button',
      props: {
          value: String,
          align: String,
          className: String
      }
    }
</script>

<style scoped lang="scss">
</style>
