<template>
	<div class="field margin">

        <label class="label">{{ value }}</label>
        <div class="control">
            <textarea class="textarea" :placeholder="placeholder"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'AreaText',
      props: {
          value: String,
          placeholder: String
      }
    }
</script>