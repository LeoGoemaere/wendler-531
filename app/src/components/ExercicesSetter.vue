<template>
	<div>
		<div class="segmented-controller">
			<button @click="isPrimaryExercices" :class="{ 'segmented-controller__item--active': isPrimarySelected }" class="segmented-controller__item">Primary</button>
			<button @click="isSecondaryExercices" :class="{ 'segmented-controller__item--active': !isPrimarySelected }"class="segmented-controller__item">Assistances</button>
		</div>
		<div v-if="isPrimarySelected">
			<div class="button-container space__x">
				<ProgressionIncrementor :baseTm="currentVariation.baseTm" />
			</div>
			<ExerciceLineItem 
				v-for="(exercice, index) in this.exercices.primary"
				:key="exercice.id"
				:exercice="exercice"
				:index="parseInt(index)"
				:type="'primary'"
				:baseTm="currentVariation.baseTm"
			/>
		</div>
		<div v-if="!isPrimarySelected">
			<CreateAssistance :exercices="exercices" :baseTm="currentVariation.baseTm" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import uuid from 'uuid/v4';
import ExerciceLineItem from '@/components/ExerciceLineItem';
import CreateAssistance from '@/components/CreateAssistance';
import ProgressionIncrementor from '@/components/ProgressionIncrementor';

export default {
	name: 'ExercicesSetter',
	components: { ExerciceLineItem, CreateAssistance, ProgressionIncrementor },
	props: {
		exercices: Object,
		currentVariation: Object
	},
	data () {
		return {
			isPrimarySelected: true
		}
	},
	methods: {
		isPrimaryExercices: function() {
			this.isPrimarySelected = true
		},
		isSecondaryExercices: function() {
			this.isPrimarySelected = false
		}
	}
}
</script>

<style scoped>
	/* Create global styles instead */
	.segmented-controller {
		display: flex;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 20px;
		border: 1px solid #ea9852;
		margin-bottom: 10px;
	}
	.segmented-controller__item {
		border: none;
		padding: 10px;
		flex: 1;
		background-color: transparent;
		color: #ea9852;
		font-size: 16px;
	}
	.segmented-controller__item + .segmented-controller__item {
		border-left: 1px solid #ea9852;
	}
	.segmented-controller__item--active {
		background-color: #ea9852;
		color: #fff;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;
	}
</style>