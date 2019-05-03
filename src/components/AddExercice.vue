<template>

	<div v-if="!isExerciceValidated" class="add-exercice space__x">

		<button class="button" @click="showPopin">
			Add {{exerciceType}} exercice
		</button>
		<div :class="popinActiveClass" class="popin__element">
			<div class="exercices__list">
				<p class="popin__title">{{exerciceType}} Exercices</p>
				<div 
					v-for="(exercice, key) in exercices"
					:key="exercice.id">				
					<input type="radio" :id="`${type}_${setOrder}_${key}`" :value="key" name="exercice" class="exercice__select" @change="exerciceSelection" />
					<label :for="`${type}_${setOrder}_${key}`">
						{{exercice.name}}
						<i class="fas fa-check"></i>
					</label>
				</div>
			</div>
			<div class="exercices__buttons exercices__buttons--top-border">
				<button :class="!isExerciceSelectionned ? 'button-action--disabled' : ''" class="button-action" @click="addExercice">Add Exercice</button>
				<button class="button-action" @click="cancelAddExercice">Cancel</button>
			</div>
		</div>
		<div :class="popinActiveClass" class="popin__overlay" @click="cancelAddExercice"></div>
	</div>
	<div v-else class="set-container space__x">
		<p class="set-container__exercice-name">
			{{exerciceData.name}}
			<button @click="removeExercice" class="trash">
				<i class="fas fa-trash icon__trash"></i>
			</button>
		</p>
		<ul>
			<Set
				v-for="(set, index) in sets"
				:key="set.id"
				:set="set"
				:index="index"
				:tmExercice="exerciceData.max.tm"
			/>
		</ul>
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
		setOrder: Number,
		day: String,
		trainingIndex: Number
	},
	data() {
		return {
			popinActiveClass: null,
			isExerciceSelectionned: false,
			isExerciceValidated: false,
			chosenExerciceId: null,
			exerciceIndex: null,
			trainings: null,
			sets: null,
			exerciceType: this.type === 'secondary' ? 'Assistance' : 'Primary',
			exerciceData: null
		}
	},
	mounted() {
		this.trainings = JSON.parse(JSON.stringify(this.getTrainings));

		this.chosenExerciceId = this.getExerciceId();
		if (this.isExerciceExist()) {
			this.exerciceData = this.getExercice();
			this.isExerciceValidated = true;
			this.isExerciceSelectionned = true;
		}
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
			this.popinActiveClass = 'is-active';
		},
		closePopin() {
			this.popinActiveClass = null;
		},
		exerciceSelection(e) {
			this.chosenExerciceId = this.exercices[e.target.value].id;
			this.isExerciceSelectionned = true;
		},
		cancelAddExercice() {
			this.chosenExerciceId = null;

			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.popinActiveClass = null
			document.querySelectorAll('.exercice__select').forEach(exercice => exercice.checked = false);
		},
		addExercice() {
			if (!this.isExerciceSelectionned) return;

			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.trainings[this.trainingIndex].push({
				exerciceId: this.chosenExerciceId,
				setOrder: this.setOrder
			});
			this.exerciceData = this.getExercice();
			this.$store.commit('updateTrainings', this.trainings);

			this.isExerciceValidated = true;
			this.closePopin();
		},
		removeExercice() {
			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.trainings[this.trainingIndex].forEach((exercice, index) => {
				if (this.setOrder === exercice.setOrder) {
					this.exerciceIndex = index;
				}
			});
			this.trainings[this.trainingIndex].splice(this.exerciceIndex, 1);
			this.$store.commit('updateTrainings', this.trainings);

			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
		},
		// Utilities methods
		getExercice: function() {
			const exercice = this.getExercices[this.type].filter(exercice => {
				if (this.chosenExerciceId === exercice.id) {
					return exercice;
				}
			})
			return exercice[0];
		},
		isExerciceExist: function() {
			let exerciceExist;
			this.trainings[this.trainingIndex].filter(exercice => {
				if (this.setOrder === exercice.setOrder) {
					exerciceExist = true;
				}
			});
			return exerciceExist ? true : false;
		},
		getExerciceId: function() {
			let exerciceId;
			this.trainings[this.trainingIndex].filter(exercice => {
				if (this.setOrder === exercice.setOrder) {
					exerciceId = exercice.exerciceId;
				}
			});
			return exerciceId ? exerciceId : null;
		}
	}
}
</script>

<style scoped>
	
	.add-exercice {
		padding-top: 10px;
		padding-bottom: 10px; 
		position: relative;
	}

	.add-exercice::after {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.set-container {
		position: relative;
	}

	.set-container::before {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.add-exercice + .set-container,
	.set-container + .set-container {
		padding-top: 25px
	}

	.set-container__exercice-name {
		display: flex;
		color: #000;
		font-size: 24px;
		justify-content: space-between;
		align-items: center;
	}

	.exercice__select {
		display: none;
	}

	.exercices__list + .exercices__list {
		margin-top: 15px;
	}

	.exercice__select + label {
		padding: 0 20px;
		height: 44px;
		line-height: 44px;
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

	.trash {
		background-color: transparent;
		border: none;
		color: #737373;
	}

	.icon__trash {
		font-size: 13px;
	}

</style>