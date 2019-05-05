<template>
		<div class="set-increment">
			<button @click="showPopin" class="set-increment-button">
				<i class="far fa-arrow-alt-circle-up icon__arrow-circle-up"></i>
				<span>{{getExercices[this.exerciceType][this.exerciceIndex].incrementFactor}}</span>
			</button>
			<div :class="{ 'is-active': popinIsActive }" class="popin__element">
				<p class="popin__title">Set your increment factor</p>
				<div class="popin__input-row">
					<input type="number" v-model="incrementEdited" :placeholder="getExercices[this.exerciceType][this.exerciceIndex].incrementFactor" class="popin__row js-input-set-increment" />
				</div>
				<div class="buttons">
					<button :class="{ 'button-action--disabled': !incrementEdited }" class="button-action" @click="setIncrement">Set increment factor</button>
					<button class="button-action" @click="cancelSetIncrement">Cancel</button>
				</div>
			</div>
			<div :class="{ 'is-active': popinIsActive }" class="popin__overlay" @click="closePopin"></div>
		</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'SetIncrementFactor',
	components: {  },
	props: {
		exerciceType: String,
		exerciceIndex: Number
	},
	data () {
		return {
			popinIsActive: false,
			incrementEdited: null
		}
	},
	mounted() {
	},
	methods: {
		showPopin() {
			this.popinIsActive = true;
		},
		closePopin() {
			this.popinIsActive = false;
		},
		cancelSetIncrement: function() {
			this.incrementEdited = null;
			this.closePopin();
			document.querySelector('.js-input-set-increment').value = "";
		},
		setIncrement() {
			if (!this.incrementEdited) return;

			// Create deep copy.
			let exercices = JSON.parse(JSON.stringify(this.getExercices));
			let currentExercice = exercices[this.exerciceType][this.exerciceIndex];
			currentExercice.incrementFactor = parseInt(this.incrementEdited);

			this.$store.commit('updateExercices', exercices);
			this.cancelSetIncrement();
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
	.set-increment-button {
		border: none;
		background-color: transparent;
		color: #34495e;
		border: 2px solid #34495e;
		padding: 2px 5px;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}
	.icon__arrow-circle-up {
		font-size: 15px;
		margin-right: 5px;
	}
</style>