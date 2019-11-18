<template>
	<div class="columns">
		<div class="column is-three-fifths is-offset-one-fifth">
			<div class="has-text-left">
				<button @click="createNewVariation" class="button margin-top is-light is-info">+ Add variation</button>
			</div>
			<Variation 
				v-for="(variation, name, index) in getVariations"
				:key="variation.id"
				:variation="variation"
				:index="index"
				:name="name"
			/>
			<ExportToJson />
				
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import uuid from 'uuid/v4';

import Variation from '@/components/Variation.vue';
import ExportToJson from '@/components/ExportToJson.vue'

export default {
	name: 'Generator',
	components: {
		Variation,
		ExportToJson
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
