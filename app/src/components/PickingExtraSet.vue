<template>
	<div>
		<!-- 
			Loop directly on the store extrasets, 
			because the extra set can be updated inside ExtraSetSetter component
		-->
		<div v-if="isSetValidated" class="sets">
			<ExtraSetSetter 
				v-for="(extraSet, index) in this.getTrainings[this.trainingIndex][this.exerciceIndex].extraSets"
				:key="extraSet.id"
				:index="index"
				:trainingIndex="trainingIndex"
				:exerciceIndex="exerciceIndex"
				:extraSet="extraSet"
				:lift="lift"
				:exerciceData="exerciceData"
			/>
		</div>
		<div class="sets">
			<div class="set extraset extraset--add">
				<button class="extraset__button" @click="showPopin">
					<i class="fas fa-plus-circle icon__plus"></i>
					Add Extra Set
				</button>
				<div :class="{ 'is-active': popinIsActive }" class="popin__element">
					<p class="popin__title">Chose your Extra Set</p>
					<ul>
						<li v-for="(set, index) in extraSetsModel">
							<input type="radio" @change="setSelection(index)" :id="`${set.type}_${setOrder}`" :value="set.type" name="extrasets" class="js-extraset-select row__select" />
							<label :for="`${set.type}_${setOrder}`">
								{{set.name}}
								<i class="fas fa-check"></i>
							</label>
						</li>
					</ul>
					<div class="buttons">
						<button :class="{ 'button-action--disabled': !isSetSelectionned }" class="button-action" @click="addSet">Add Extra Set</button>
						<button class="button-action" @click="cancelAddSet">Cancel</button>
					</div>
				</div>
				<div :class="{ 'is-active': popinIsActive }" class="popin__overlay" @click="cancelAddSet"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ExtraSetSetter from '@/components/ExtraSetSetter';
export default {
	name: 'PickingExtraSet',
	components: { ExtraSetSetter },
	props: {
		trainingIndex: Number,
		setOrder: Number,
		lift: Object,
		exerciceData: Object
	},
	data () {
		return {
			popinIsActive: false,
			isSetSelectionned: false,
			isSetValidated: false,
			setIndex: null,
			trainings: null,
			exerciceIndex: null,
			extraSetsModel: [
				{
					type: 'joker',
					name: 'Joker',
				},
				{
					type: 'fsl',
					name: 'First Set Last'
				}
			],
			extraSets: null
		}
	},
	mounted() {
		this.exerciceIndex = this.getExerciceIndex();
		this.$eventBus.$on('updateExerciceIndex', this.updateExerciceIndexHandler);
		// Get last version from trainings.
		this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
		this.extraSets = this.trainings[this.trainingIndex][this.exerciceIndex].extraSets;
		this.isSetValidated = this.extraSets.length ? true : false;
	},
	destroyed() {
		this.$eventBus.$off('updateExerciceIndex', this.updateExerciceIndexHandler);
	},
	methods: {
		showPopin() {
			this.popinIsActive = true;
		},
		closePopin() {
			this.popinIsActive = false;
		},
		setSelection(index) {
			this.setIndex = index;
			this.isSetSelectionned = true;
		},
		cancelAddSet() {
			this.setIndex = null;
			this.isSetSelectionned = false;
			this.popinIsActive = false;
			document.querySelectorAll('.js-extraset-select').forEach(set => set.checked = false);
		},
		addSet() {
			if (!this.isSetSelectionned) return;

			// Get last version from trainings.
			this.trainings = JSON.parse(JSON.stringify(this.getTrainings));
			this.extraSets = this.trainings[this.trainingIndex][this.exerciceIndex].extraSets;

			this.extraSets.push({
				type: this.extraSetsModel[this.setIndex].type,
				name: this.extraSetsModel[this.setIndex].name,
				setData: {
					weight: null,
					reps: null
				}
			})

			this.trainings[this.trainingIndex][this.exerciceIndex].extraSets = this.extraSets;
			this.$store.commit('updateTrainings', this.trainings);

			this.isSetValidated = true;

			// Reset selection
			this.isSetSelectionned = false;
			document.querySelectorAll('.js-extraset-select').forEach(set => set.checked = false);

			this.closePopin();
		},
		getExerciceIndex: function() {
			let exerciceIndex;
			this.getTrainings[this.trainingIndex].filter((exercice, index) => {
				if (this.setOrder === exercice.setOrder) {
					exerciceIndex = index;
				}
			});
			return typeof exerciceIndex !== 'undefined' ? exerciceIndex : null;
		},
		updateExerciceIndexHandler: function() {
			this.exerciceIndex = this.getExerciceIndex();
		}
	},
	computed: {
		...mapGetters([
			'getTrainings'
		])
	}
}
</script>

<style scoped>
	/* Create global styles instead */
	.extraset--add {
		padding: 0;
	}

	.extraset__button {
		width: 100%;
		background-color: transparent;
		border: none;
		padding: 15px 0;
		font-size: 15px;
		text-align: left;
		display: flex;
		align-items: center;
	}
	.icon__plus {
		color: #ea9852;
		font-size: 20px;		
		margin-right: 20px;
	}

</style>