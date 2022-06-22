<template>
	<div class="home">
		<div class="space__x space__top">
			<div class="flex">
				<h1>Settings</h1>
				<span class="base-tm"><span class="base-tm__value">TM {{ currentVariation.baseTm * 100 }}%</span><span class="base-tm__exponent">of 1RM</span></span>
			</div>
			<SelectContainer
				:variations="getVariations"
				:currentVariation="currentVariation"
				:selectedVariation="getSelectedVariation"
				:selectedTemplate="getSelectedTemplate"
				:selectedWeek="getSelectedWeek"
			/>
		</div>

		<ExercicesSetter
			:exercices="getExercices"
			:currentVariation="currentVariation"
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
		]),
		currentVariation() {
			return this.getVariations[this.getSelectedVariation]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.base-tm {
		margin-left: auto;
		align-self: flex-start;
    display: flex;
    align-items: flex-start;
		font-size: 12px;
		color: #ea9852;
	}

	.base-tm__value {
		font-weight: 600;
	}

	.base-tm__exponent {
		font-size: 0.8em;
		margin-left: 3px;
		color: #737373;
	}
</style>
