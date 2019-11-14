<template>
	<div class="columns">
		<div class="column is-half is-offset-one-quarter">
			<Button value="+ Add variation" className="is-link is-fullwidth" />

			<Variation 
				v-for="(variation, name, index) in getVariations"
				:variation="variation"
				:index="index"
				:name="name"
			/>
				
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Button from '@/components/Button.vue';
import Variation from '@/components/Variation.vue'

export default {
	name: 'Generator',
	components: {
		Button,
		Variation
	},
	computed: {
		...mapGetters([
			'getVariations'
		])
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
