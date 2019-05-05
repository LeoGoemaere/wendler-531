<template>
		<button @click="incrementExercicesMax">Progression Incrementor</button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ProgressionIncrementor',
	methods: {
		incrementExercicesMax() {
			let exercices = JSON.parse(JSON.stringify(this.getExercices));
			for (let key in exercices) {
				exercices[key].forEach(exercice => {
					exercice.max.tm += exercice.incrementFactor;
					exercice.max.rm = parseInt(exercice.max.tm) / 0.9;
				})
			}
			this.$store.commit('updateExercices', exercices);
		}
	},
	computed: {
		...mapGetters([
			'getExercices'
		])
	},
}
</script>

<style scoped>
	/* Create global styles instead */
</style>