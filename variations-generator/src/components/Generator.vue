<template>
	<div class="columns">
		<div class="column is-half is-offset-one-quarter">
			<Input value="Program Name" :isCenter="true" />
			<Button value="Add Template" />

			<Input value="Template Name" />
			<AreaText value="Description" />

			<!-- <Button value="Add Week" :isLight="true" />
			<Input value="Week Name" />

			<Button value="Add Days" :isLight="true" />
			<p>Day 1</p> -->

			<Button value="Add Exercice" :isLight="true" />
			<p>Exercice 1</p>

			<InputColumn />			
		</div>
	</div>
</template>

<script>
import CurrentVariations from '../../../app/src/datas/variations.json';

import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import AreaText from '@/components/AreaText.vue';
import InputColumn from '@/components/InputColumn.vue';

export default {
  name: 'Generator',
  components: {
	  Input,
	  Button,
	  AreaText,
	  InputColumn
  },
  data: function() {
		return {
			variations: null
		}
	},
  mounted: function() {
	  this.variations = JSON.stringify(CurrentVariations);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
