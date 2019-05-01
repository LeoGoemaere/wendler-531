<template>

	<div>
	<!--{{getCurrentVariation.templates[getSelectedTemplate].weeks[getSelectedWeek].day_1.lift_1}}-->
		<div v-if="!isExerciceValidated" >
			<button class="button" @click="showPopin">Add exercice</button>
			<div :class="popinActiveClass" class="popin__element">
				<div class="exercices__list">
					<p class="popin__title">Primary Exercices</p>
					<div 
						v-for="(exercice, key) in exercices"
						:key="exercice.id">				
						<input type="radio" :id="`${type}_${key}`" :value="key" name="exercice" class="exercice__select" @change="exerciceSelection" />
						<label :for="`${type}_${key}`">
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
			exerciceIndex: null,
			sets: null,
			tmExercice: null
		}
	},
	mounted() {
	// 	this.isExerciceValidated = this.getTrainings[this.trainingId][this.index] ? true : false;
	// 	this.chosenExercice.exercice = this.getTrainings[this.trainingId][this.index];
		this.sets = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek][this.day][this.setIndex].sets;
	// 	this.tmExercice = typeof this.chosenExercice.exercice !== 'undefined' ? this.getExercices[this.type][this.chosenExercice.exercice].max.tm : null;
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
			this.chosenExercice = this.getExercices[this.type][e.target.value];
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
			this.getTrainings[this.trainingIndex].push(this.chosenExercice);
			this.exerciceIndex = this.getTrainings[this.trainingIndex].indexOf(this.chosenExercice);
			this.tmExercice = this.getTrainings[this.trainingIndex][this.exerciceIndex].max.tm;
			this.isExerciceValidated = true;
			// console.log(this.tmExercice);
			// console.log(this.getTrainings[this.trainingIndex][this.setIndex].max.tm);
			// EventBus.$emit('exercice-is-added', this.chosenExercice);
			console.log(this.exerciceIndex);
			console.log(this.getTrainings[this.trainingIndex]);
			this.closePopin();
		},
		removeExercice() {
			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.getTrainings[this.trainingIndex].splice(this.exerciceIndex, 1);
			console.log(this.getTrainings[this.trainingIndex])
			// EventBus.$emit('exercice-is-removed', this.chosenExercice)
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