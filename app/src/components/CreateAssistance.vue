<template>
	<div class="assistance">
		<div class="assistance__button-container space__x">
			<button class="assistance__button button" @click="showPopin">
				<i class="fas fa-plus"></i>
			</button>
			<ProgressionIncrementor />
		</div>
		<div :class="popinActiveClass" class="popin__element">
			<p class="popin__title">Add new assistance exercice</p>
			<div class="popin__input-row">
				<input type="text" v-model="assistanceEdited" class="popin__row js-input-create-assistance" placeholder="Exercice name" />
			</div>
			<div class="buttons">
				<button :class="{ 'button-action--disabled': !assistanceEdited }" class="button-action" @click="createExercice">Create Exercice</button>
				<button class="button-action" @click="cancelAddExercice">Cancel</button>
			</div>
		</div>
		<ExerciceLineItem 
			v-for="(exercice, index) in this.exercices.secondary"
			:key="exercice.id"
			:exercice="exercice"
			:index="parseInt(index)"
			:type="'secondary'"
		/>
		<div :class="popinActiveClass" class="popin__overlay" @click="cancelAddExercice"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import uuid from 'uuid/v4';
import ExerciceLineItem from '@/components/ExerciceLineItem';
import ProgressionIncrementor from '@/components/ProgressionIncrementor';
export default {
	name: 'ExercicesSetter',
	components: { ExerciceLineItem, ProgressionIncrementor },
	props: {
		exercices: Object
	},
	data () {
		return {
			popinActiveClass: null,
			assistanceEdited: null,
			maxSetter: {
				max: {
					rm: 0,
					tm: 0
				}
			}
		}
	},
	methods: {
		showPopin() {
			this.popinActiveClass = 'is-active'
		},
		closePopin() {
			this.popinActiveClass = null;
		},
		isPrimaryExercices: function() {
			this.isPrimarySelected = true
		},
		isSecondaryExercices: function() {
			this.isPrimarySelected = false
		},
		cancelAddExercice: function() {
			this.assistanceEdited = null;
			this.closePopin();
			document.querySelector('.js-input-create-assistance').value = "";
		},
		createExercice: function(e) {
			if (!this.assistanceEdited) return;
			const assistancesLength = Object.keys(this.getExercices.secondary).length;
			// Create deep copies.
			let exercices = JSON.parse(JSON.stringify(this.exercices));
			exercices.secondary[assistancesLength] = JSON.parse(JSON.stringify(this.maxSetter));

			exercices.secondary[assistancesLength].name = this.assistanceEdited;
			exercices.secondary[assistancesLength].id = uuid();
			exercices.secondary[assistancesLength].incrementFactor = 0;
			this.$store.commit('updateExercices', exercices);
			this.cancelAddExercice();
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
	.assistance {
		overflow: hidden;
	}
	.assistance__button-container {
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-end;
	}
	.assistance__button {
		width: auto;
		padding: 0;
		font-size: 17px;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon_fa-plus {
	}
</style>