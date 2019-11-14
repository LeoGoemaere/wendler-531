<template>
	<div class="columns">
		<div class="column is-three-fifths is-offset-one-fifth">
			<button @click="createNewVariation" class="button margin is-link is-fullwidth">+ Add variation</button>
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

import uuid from 'uuid/v4';

import Button from '@/components/Button.vue';
import Variation from '@/components/Variation.vue'

export default {
	name: 'Generator',
	components: {
		Button,
		Variation
	},
	methods: {
		createNewVariation: function() {
			const variations = JSON.parse(JSON.stringify(this.getVariations));
			const key = uuid();
			const variationSkeleton = {
				name: "",
				templates: [
					{
						name:  '',
						description: '',
						weeks: [
							{
								name: '',
								days: [
									[
										{
											sets: [
												{
													reps: 0,
													tm: 0,
													pr: false
												}
											]
										}
									],
									[
										{
											sets: [
												{
													reps: 0,
													tm: 0,
													pr: false
												}
											]
										}
									],
									[
										{
											sets: [
												{
													reps: 0,
													tm: 0,
													pr: false
												}
											]
										}
									],
									[
										{
											sets: [
												{
													reps: 0,
													tm: 0,
													pr: false
												}
											]
										}
									]
								]
							}
						]
					}
				]
			};
			variations[key] = variationSkeleton;
			this.$store.commit('updateVariations', variations);
		}
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
