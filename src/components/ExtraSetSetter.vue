<template>
	<li class="set extraset">
		{{extraSet}}
		<button @click="removeExtraSet">Remove</button>	
	</li>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'ExtraSetSetter',
	components: {  },
	props: {
		index: Number,
		trainingIndex: Number,
		exerciceIndex: Number,
		extraSet: Object
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