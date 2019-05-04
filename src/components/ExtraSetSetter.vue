<template>
	<li class="set extraset">
		<Joker 
			v-if="extraSet.type === 'joker'" 
			:lift="lift"
			:extraSet="extraSet"
			:trainingIndex="trainingIndex"
			:exerciceIndex="exerciceIndex"
			:index="index"
			:exerciceData="exerciceData"
		/>
		<button @click="removeExtraSet">Remove</button>	
	</li>
</template>

<script>
import { mapGetters } from 'vuex';

import Joker from '@/components/Joker';
export default {
	name: 'ExtraSetSetter',
	components: { Joker },
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
</style>