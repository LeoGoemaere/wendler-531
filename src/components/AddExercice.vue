<template>

	<div>
		<div v-if="!isExerciceValidated" >
			<button class="button" @click="showPopin">Add exercice</button>
			<div :class="popinActiveClass" class="popin__element">
				<div class="exercices__list">
					<p class="popin__title">{{type}} Exercices</p>
					<div 
						v-for="(exercice, key) in exercices"
						:key="exercice.id">				
						<input type="radio" :id="`${type}_${setIndex}_${key}`" :value="key" name="exercice" class="exercice__select" @change="exerciceSelection" />
						<label :for="`${type}_${setIndex}_${key}`">
							{{exercice.name}}
							<i class="fas fa-check"></i>
						</label>
					</div>
				</div>
				<div class="exercices__buttons">
					<button :class="!isExerciceSelectionned ? 'button-action--disabled' : ''" class="button-action" @click="addExercice">Add Exercice</button>
					<button class="button-action" @click="cancelAddExercice">Cancel</button>
				</div>
			</div>
			<div :class="popinActiveClass" class="popin__overlay" @click="closePopin"></div>
		</div>
		<div v-else>
			<button @click="removeExercice">remove</button>
			<ul>
				<Set
					v-for="set in sets"
					:key="set.id"
					:reps="set.reps"
					:weight="set.tm * tmExercice"
				/>
			</ul>
		</div>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import Set from '@/components/Set';

export default {
	name: 'AddExercice',
	components: { Set },
	props: {
		exercices: Array,
		type: String,
		lift: Object,
		setIndex: Number,
		day: String,
		trainingIndex: Number
	},
	data() {
		return {
			popinActiveClass: null,
			isExerciceSelectionned: false,
			isExerciceValidated: false,
			chosenExercice: null,
			trainings: null,
			exerciceIndex: null,
			sets: null,
			tmExercice: null
		}
	},
	mounted() {
		// Filter in currentTraining and set the constant if the exercice is exist.
		const exerciceAlreadyChosed = this.getTrainings[this.trainingIndex].filter(exercice => {
			if (exercice.index === this.setIndex) {
				return exercice;
			}
		})

		// Set the trainings data with the trainings store value.
		this.trainings = JSON.parse(JSON.stringify(this.getTrainings));

		// Set the chosen exercice.
		if (typeof exerciceAlreadyChosed[0] !== 'undefined') {
			this.chosenExercice = exerciceAlreadyChosed[0];
		} else {
			this.chosenExercice = null
		}

		if (this.chosenExercice) {
			this.isExerciceValidated = true;
			this.exerciceIndex = this.getTrainings[this.trainingIndex].indexOf(this.chosenExercice);
			this.getExercices[this.type].filter(exercice => {
				if (exercice.id === this.chosenExercice.id) {
					this.trainings[this.trainingIndex].splice(this.exerciceIndex, 1, exercice);
					this.chosenExercice = exercice;
					this.tmExercice = this.chosenExercice.max.tm;
				}
			})

		} else {
			this.isExerciceValidated = false;
			this.tmExercice = null;
			this.exerciceIndex = null;
		}

		// Set the sets data.
		this.sets = this.lift.sets;
	},
	computed: {
		...mapGetters([
			'getCurrentVariation',
			'getSelectedTemplate',
			'getSelectedWeek',
			'getExercices',
			'getTrainings'
		])
	},
	methods: {
		showPopin() {
			this.popinActiveClass = 'is-active'
		},
		closePopin() {
			this.popinActiveClass = null;
		},
		exerciceSelection(e) {
			this.chosenExercice = this.exercices[e.target.value];
			this.isExerciceSelectionned = true;
		},
		cancelAddExercice() {
			this.chosenExercice = null;
			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.popinActiveClass = null
			document.querySelectorAll('.exercice__select').forEach(exercice => exercice.checked = false);
		},
		addExercice() {
			if (!this.isExerciceSelectionned) return;
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.trainings[this.trainingIndex].push(this.chosenExercice);
			this.exerciceIndex = this.trainings[this.trainingIndex].indexOf(this.chosenExercice);
			this.tmExercice = this.trainings[this.trainingIndex][this.exerciceIndex].max.tm;
			this.trainings[this.trainingIndex][this.exerciceIndex].index = this.setIndex;
			this.isExerciceValidated = true;
			this.$store.commit('updateTrainings', this.trainings);
			this.closePopin();
		},
		removeExercice() {
			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.trainings[this.trainingIndex].splice(this.exerciceIndex, 1);
			this.$store.commit('updateTrainings', this.trainings);
		}
	}
}
</script>

<style scoped>
	.popin__container {
		padding: 10px;
	}
	.popin__title {
		color: #000;
		font-size: 17px;
		font-weight: 600;
		padding: 15px 10px;
	}
	.popin__element {
		display: none;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background-color: #fff;
		width: 80vw;
		border-radius: 5px;
		overflow: hidden;
		opacity: 0;
		transition: opacity .3s ease-out;
	}
	.popin__element.is-active {
		display: block;
		opacity: 1;
		transition: opacity .3s ease-out;
	}
	.popin__overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 5;
	}

	.popin__overlay.is-active {
		display: block;
	}

	.exercice__select {
		display: none;
	}

	.exercices__list + .exercices__list {
		margin-top: 15px;
	}

	.exercice__select + label {
		padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #737373;
	}

	.exercice__select:active + label {
		background: #e4e4e4;
	}

	.exercice__select:checked + label {
		background: #e4e4e4;
	}

	.exercice__select + label i { display: none; }

	.exercice__select:checked +label i { display: block; }

	.exercices__buttons {
		display: flex;
		padding: 10px;
		margin-top: 10px;
	}
</style>