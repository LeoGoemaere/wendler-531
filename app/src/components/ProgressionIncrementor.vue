<template>
	<div class="progression-incrementor__container">
		<button @click="showNotif" class="button progression-incrementor__button">
			<i class="fas fa-arrow-up icon__arrow-up"></i>
		</button>
		<div :class="{ 'notif-popin--active': notifIsActive }" class="notif-popin">
			<div class="notif-popin__delete-container">
				<p class="notif-popin__description">Increment all your TM max.</p>
				<button @click="incrementExercicesMax" class="notif-popin__button notif-popin__button--validate">Increment TM</button>
			</div>
			<button @click="closeNotif" class="notif-popin__button notif-popin__button--cancel">Cancel</button>
		</div>
		<div :class="{ 'is-active': notifIsActive }" class="popin__overlay" @click="closeNotif"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ProgressionIncrementor',
	data() {
		return {
			notifIsActive: false
		}
	},
	methods: {
		showNotif() {
			this.notifIsActive = true;
		},
		closeNotif() {
			this.notifIsActive = false;
		},
		incrementExercicesMax() {
			let exercices = JSON.parse(JSON.stringify(this.getExercices));
			for (let key in exercices) {
				exercices[key].forEach(exercice => {
					exercice.max.tm += exercice.incrementFactor;
					exercice.max.rm = parseInt(exercice.max.tm) / 0.9;
				})
			}
			this.$store.commit('updateExercices', exercices);
			this.closeNotif();
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
		background-color: #ea9852;
		margin-left: 10px;
	}
</style>