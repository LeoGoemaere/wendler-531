<template>
	<div class="home">
		<h1>Settings</h1>
		<SelectContainer
			:variations="getVariations"
			:currentVariation="getCurrentVariation"
			:selectedVariation="getSelectedVariation"
			:selectedTemplate="getSelectedTemplate"
			:selectedWeek="getSelectedWeek"
		/>

		<h2>Exercices</h2>
		<ExercicesSetter :primaryExercices="getExercices.primary" :secondaryExercices="getExercices.secondary" />
	
	</div>
</template>

<script>
import ExerciceLineItem from '@/components/ExerciceLineItem';
import ExercicesSetter from '@/components/ExercicesSetter';
import SelectContainer from '@/components/SelectContainer';

import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: { ExercicesSetter, ExerciceLineItem, SelectContainer },
	data() {
		return {
			variations: this.$store.state.variations
		}
	},
	computed: {
		...mapGetters([
			'getVariations',
			'getCurrentVariation',
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
