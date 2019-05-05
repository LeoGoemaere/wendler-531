<template>
	<div class="progression-incrementor__container space__x">
		<button @click="incrementExercicesMax" class="button progression-incrementor__button">
			<i class="far fa-arrow-alt-circle-up icon__arrow-circle-up"></i>
			Increment max
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
	.progression-incrementor__container {
		margin-bottom: 10px;
	}
	.progression-incrementor__button {
		display: flex;
		justify-content: center;
		background-color: #34495e;
	}
	.icon__arrow-circle-up {
		font-size: 18px;
		margin-right: 10px;
	}
</style>