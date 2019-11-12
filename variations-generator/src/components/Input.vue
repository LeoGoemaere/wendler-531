<template>
	<div>
		<div class="field margin">
			<label class="label" :class="{'has-text-left has-text-weight-normal': !isCenter}">{{ value }}</label>
			<div class="control">
				<input class="input" type="text" :placeholder="placeholder">
			</div>
		</div>
	</div>
</template>

<script>
    export default {
      name: 'Input',
      props: {
          value: String,
          placeholder: String,
          isCenter: false
      }
    }
</script>