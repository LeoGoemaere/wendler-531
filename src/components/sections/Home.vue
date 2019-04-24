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
		<ExerciceLineItem :id="'bench'" />
		<ExerciceLineItem :id="'deadlift'" />
		<ExerciceLineItem :id="'squat'" />
		<ExerciceLineItem :id="'press'" />
	</div>
</template>

<script>
import ExerciceLineItem from '@/components/ExerciceLineItem';
import SelectContainer from '@/components/SelectContainer';

import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: { ExerciceLineItem, SelectContainer },
	data() {
		return {
			variations: this.$store.state.variations,
		}
	},
	computed: {
		getVariations() {
			return this.$store.state.variations;
		},
		getCurrentVariation() {
			return this.$store.state.currentVariation;
		},
		getSelectedVariation() {
			return this.$store.state.selectedVariation;
		},
		getSelectedTemplate() {
			return this.$store.state.selectedTemplate;
		},
		getSelectedWeek() {
			return this.$store.state.selectedWeek;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
