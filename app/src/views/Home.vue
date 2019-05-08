<template>
	<div class="home">
		<div class="space__x space__top">
			<h1>Settings</h1>
			<SelectContainer
				:variations="getVariations"
				:currentVariation="getVariations[getSelectedVariation]"
				:selectedVariation="getSelectedVariation"
				:selectedTemplate="getSelectedTemplate"
				:selectedWeek="getSelectedWeek"
			/>
		</div>

		<ExercicesSetter
			:exercices="getExercices"
		/>
	
	</div>
</template>

<script>
import ExerciceLineItem from '@/components/ExerciceLineItem';
import ExercicesSetter from '@/components/ExercicesSetter';
import SelectContainer from '@/components/SelectContainer';

import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: { ExercicesSetter, SelectContainer },
	data() {
		return {
			variations: this.$store.state.variations
		}
	},
	computed: {
		...mapGetters([
			'getVariations',
			'getSelectedVariation',
			'getSelectedTemplate',
			'getSelectedWeek',
			'getExercices'
		])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
