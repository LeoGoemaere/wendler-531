<template>
	<div class="progression-incrementor__container">
		<button @click="incrementExercicesMax" class="button progression-incrementor__button">
			<i class="fas fa-arrow-up icon__arrow-up"></i>
		</button>
	</div>
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
	.progression-incrementor__button {
		width: auto;
		padding: 0;
		font-size: 16px;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #34495e;
		margin-left: 10px;
	}
</style>