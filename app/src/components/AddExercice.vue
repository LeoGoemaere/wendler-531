<template>

	<div v-if="!isExerciceValidated" class="add-exercice space__x">
		<button class="button" @click="showPopin">
			Add {{exerciceType}} exercice
		</button>
		<div :class="popinActiveClass" class="popin__element">
			<div class="exercices__list">
				<p class="popin__title">{{exerciceType}} Exercices</p>

				<div
					v-if="type === 'primary'" 
					v-for="(exercice, key) in exercices[type]"
					:key="exercice.id">				
					<input type="radio" :id="`${type}_${setOrder}_${key}`" :value="key" name="exercice" class="js-exercice-select row__select" @change="exerciceSelection($event, exercice)" />
					<label :for="`${type}_${setOrder}_${key}`">
						{{exercice.name}}
						<i class="fas fa-check"></i>
					</label>
				</div>
				<div
					v-if="type === 'secondary'" 
					v-for="(exercice, key, index) in exercices" class="accordion">
					<button @click="toggleAccordion" class="js-accordion-button accordion__button">
						{{key === 'secondary' ? 'Assistances' : key}}
						<i class="fas fa-chevron-down icon__chevron-down"></i>
					</button>
					<div class="accordion__content">
						<div class="accordion__inner">
							<p v-if="exercice.length === 0" class="accordion__info">
								You don't have any assistances lift yet.
							</p>
							<div 
								v-for="(exerciceItem, indexItem) in exercice"
								:key="exerciceItem.id">		
								<input type="radio" :id="`${type}_${setOrder}_${index}_${indexItem}`" :value="key" name="exercice" class="js-exercice-select row__select" @change="exerciceSelection($event, exerciceItem)" />
								<label :for="`${type}_${setOrder}_${index}_${indexItem}`">
									{{exerciceItem.name}}
									<i class="fas fa-check"></i>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons buttons--top-border">
				<button class="button-action" @click="cancelAddExercice">Cancel</button>
				<button :class="{ 'button-action--disabled': !isExerciceSelectionned }" class="button-action" @click="addExercice">Add Exercice</button>
			</div>
		</div>
		<div :class="popinActiveClass" class="popin__overlay" @click="cancelAddExercice"></div>
	</div>
	<div v-else class="set-container space__x">
		<div class="set-container__exercice-name">
			<div class="set-container__name-container">
				<span class="set-container__exercice-number">{{index + 1}}.</span>
				<span>{{exerciceData.name}}</span>
			</div>
			<div class="set-container__exercice-labels-container">
				<p class="exercice-label__type">{{exerciceType}}</p>
				<button @click="showNotif" class="trash">
					<i class="far fa-trash-alt icon__trash"></i>
				</button>
			</div>
			<div :class="{ 'notif-popin--active': notifIsActive }" class="notif-popin">
				<div class="notif-popin__delete-container">
					<button @click="removeExercice" class="notif-popin__button notif-popin__button--delete">Delete the set</button>
				</div>
				<button @click="closeNotif" class="notif-popin__button notif-popin__button--cancel">Cancel</button>
			</div>
			<div :class="{ 'is-active': notifIsActive }" class="popin__overlay" @click="closeNotif"></div>
		</div>
		<div class="sets">
			<div 
				v-for="(set, index) in sets" class="set"
				:key="set.id">
				<Set
					:set="set"
					:index="index"
					:tmExercice="exerciceData.max.tm"
				/>

			</div>
		</div>
		<PickingExtraSet
			:trainingIndex="trainingIndex"
			:setOrder="setOrder"
			:lift="lift"
			:exerciceData="exerciceData"
		/>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';

import Set from '@/components/Set';
import PickingExtraSet from '@/components/PickingExtraSet';

export default {
	name: 'AddExercice',
	components: { Set, PickingExtraSet },
	props: {
		exercices: Object,
		type: String,
		lift: Object,
		setOrder: Number,
		day: Number,
		trainingIndex: Number,
		index: Number
	},
	data() {
		return {
			popinActiveClass: null,
			notifIsActive: false,
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

		const isExerciceExist = typeof this.getExercice(this.getExerciceId()) !== 'undefined' || this.getExercice(this.getExerciceId()) ? true : null;
		this.exerciceIndex = this.getExerciceIndex();
		if (!isExerciceExist && this.isExerciceExistInCurrentTraining()) {
			this.removeExerciceFromTrainings(this.exerciceIndex);
		}

		if (isExerciceExist && this.isExerciceExistInCurrentTraining()) {
			this.chosenExerciceId = this.getExerciceId();
			this.exerciceData = this.getExercice(this.chosenExerciceId);
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
		showNotif() {
			this.notifIsActive = true;
		},
		closeNotif() {
			this.notifIsActive = false;
		},
		toggleAccordion(e) {
			if (e.target.classList.contains('active')) {
				e.target.classList.remove('active');
			} else {
				document.querySelectorAll('.js-accordion-button').forEach(button => button.classList.remove('active'));
				e.target.classList.add('active');
			}
		},
		exerciceSelection(e, exercice) {
			this.chosenExerciceId = exercice.id;
			this.isExerciceSelectionned = true;
		},
		cancelAddExercice() {
			this.chosenExerciceId = null;

			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.popinActiveClass = null
			document.querySelectorAll('.js-exercice-select').forEach(exercice => exercice.checked = false);
		},
		addExercice() {
			if (!this.isExerciceSelectionned) return;

			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.trainings[this.trainingIndex].push({
				exerciceId: this.chosenExerciceId,
				setOrder: this.setOrder,
				extraSets: []
			});
			this.exerciceData = this.getExercice(this.chosenExerciceId);
			this.$store.commit('updateTrainings', this.trainings);

			this.exerciceIndex = this.getExerciceIndex();

			this.isExerciceValidated = true;
			this.closePopin();
		},
		removeExercice() {
			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.exerciceIndex = this.getExerciceIndex();
			this.removeExerciceFromTrainings(this.exerciceIndex);

			this.isExerciceValidated = false;
			this.isExerciceSelectionned = false;
			this.$eventBus.$emit('updateExerciceIndex');
			this.closeNotif();
		},
		// Utilities methods
		getExercice: function(exerciceId) {
			if (!exerciceId) { return null; }
			if (this.type === 'primary') {
				const exercice = this.getExercices[this.type].filter(exercice => {
					if (exerciceId === exercice.id) {
						return exercice;
					}
				});
				return exercice[0];
			} else {
				let exercice;
				for (let key in this.getExercices) {
					for (let i = 0; i < this.getExercices[key].length; i++) {
						if (exerciceId === this.getExercices[key][i].id) {
							exercice = this.getExercices[key][i];
						}
					}
				}
				return exercice;
			}
		},
		isExerciceExistInCurrentTraining: function() {
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
		},
		getExerciceIndex: function() {
			let exerciceIndex;
			this.trainings[this.trainingIndex].filter((exercice, index) => {
				if (this.setOrder === exercice.setOrder) {
					exerciceIndex = index;
				}
			});
			return typeof exerciceIndex !== 'undefined' ? exerciceIndex : null;
		},
		removeExerciceFromTrainings: function(exerciceIndex) {
			this.trainings[this.trainingIndex].splice(exerciceIndex, 1);
			this.$store.commit('updateTrainings', this.trainings);
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

	.exercice-label__type {
		font-size: 10px;
		margin-right: 20px;
		text-transform: uppercase;
		border: 1px solid;
		padding: 2px 10px;
		border-radius: 12px;		 
	}

	.set-container__exercice-labels-container {
		display: flex;
		align-items: center;
	}

	.set-container__name-container {
		display: flex;
		align-items: center;
	}

	.set-container__exercice-number {
		position: relative;
		margin-right: 10px;
	}

	.exercices__list + .exercices__list {
		margin-top: 15px;
	}

	.trash {
		background-color: transparent;
		border: none;
	}

</style>