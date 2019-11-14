<template>
	<div class="field margin has-text-left">

        <label class="label has-text-weight-normal">{{ title }}</label>
        <div class="control">
            <textarea class="textarea" v-model="template.description" placeholder="Enter a description for the template."></textarea>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'AreaText',
      props: {
          template: Object,
          title: String
      }
    }
</script>