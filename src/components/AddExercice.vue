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
						<input type="radio" :id="key" :value="key" name="exercice" class="exercice__select" @change="exerciceSelection" />
						<label :for="key">
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
			<button @click="removeExercice(index)">remove</button>
				{{chosenExercice.exercice}}
				{{sets}}
		</div>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: 'AddExercice',
	props: {
		exercices: Object,
		index: Number,
		day: String,
		trainingId: String
	},
	data() {
		return {
			popinActiveClass: null,
			isExerciceSelectionned: false,
			isExerciceValidated: false,
			chosenExercice: {
				index: this.index,
				exercice: null
			},
			sets: null,
			tmExercice: null
		}
	},
	mounted() {
		this.isExerciceValidated = this.getTrainings[this.trainingId][this.index] ? true : false;
		this.chosenExercice.exercice = this.getTrainings[this.trainingId][this.index];
		console.log(this.chosenExercice.exercice);
		this.sets = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek][this.day][this.index].sets;
	},
	computed: {
		...mapGetters([
			'getCurrentVariation',
			'getSelectedTemplate',
			'getSelectedWeek',
			'getPrimaryExercices',
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
			this.chosenExercice.exercice = e.target.value;
			this.isExerciceSelectionned = true;
		},
		cancelAddExercice() {
			this.chosenExercice.exercice = null;
			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.popinActiveClass = null
			document.querySelectorAll('.exercice__select').forEach(exercice => exercice.checked = false);
		},
		addExercice() {
			if (!this.isExerciceSelectionned) return;
			this.isExerciceValidated = true;
			this.tmExercice = this.getPrimaryExercices[this.chosenExercice.exercice].max.tm
			EventBus.$emit('exercice-is-added', this.chosenExercice);
			this.closePopin();
		},
		removeExercice(index) {
			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			EventBus.$emit('exercice-is-removed', this.chosenExercice)
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