<template>
	<div class="set extraset">
		<Joker 
			v-if="extraSet.type === 'joker'" 
			:lift="lift"
			:extraSet="extraSet"
			:trainingIndex="trainingIndex"
			:exerciceIndex="exerciceIndex"
			:index="index"
			:exerciceData="exerciceData"
		/>
		<Fsl 
			v-if="extraSet.type === 'fsl'"
			:lift="lift"
			:index="index"
			:exerciceData="exerciceData"
			:extraSet="extraSet"
		/>
		<button @click="removeExtraSet" class="extraset__remove-button">
			<i class="fas fa-minus-circle icon__minus-circle"></i>
		</button>	
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Joker from '@/components/Joker';
import Fsl from '@/components/Fsl';
export default {
	name: 'ExtraSetSetter',
	components: { Joker, Fsl },
	props: {
		index: Number,
		trainingIndex: Number,
		exerciceIndex: Number,
		extraSet: Object,
		extraSets: Array,
		lift: Object,
		exerciceData: Object
	},
	data () {
		return {
		}
	},
	methods: {
		removeExtraSet() {
			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.trainings[this.trainingIndex][this.exerciceIndex].extraSets.splice(this.index, 1);
			this.$store.commit('updateTrainings', this.trainings);
		}
	},
	computed: {
		...mapGetters([
			'getTrainings'
		])
	},
}
</script>

<style scoped>
	/* Create global styles instead */
	.extraset__remove-button {
		background-color: transparent;
		border: none;
	}
	.icon__minus-circle {
		color: #a72e2e;
	}
</style>