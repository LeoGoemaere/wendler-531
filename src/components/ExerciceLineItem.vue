<template>
	<div :class="exerciceOptionClass" class="exercice space__x">
		<p class="exercice__label">
			{{ exercice.name }}
			<i v-if="type === 'secondary'" @click="toggleExerciceOptions('exercice--options-enabled')" class="fas fa-ellipsis-h icon__ellipsis"></i>
		</p>
		<div class="datas">
			<div class="datas__item">
				<label class="datas__label">rm</label>
				<input class="datas__input" type="number" @change="calculPerf($event, { from: max.rm, to: max.tm })" :value="roundValue(this.exercice.max.rm)">
				<label class="datas__label datas__label--unit">kg</label>
			</div>
			<div class="datas__item">
				<label class="datas__label datas__label--tm">tm</label>
				<input class="datas__input datas__input--tm" type="number" @change="calculPerf($event, { from: max.tm, to: max.rm })" :value="roundValue(this.exercice.max.tm)">
				<label class="datas__label datas__label--unit">kg</label>
			</div>
		</div>
		<button v-if="type === 'secondary'" class="exercice__delete-button" @click="this.deleteAssistance">
			<i class="fas fa-trash"></i>
		</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Exercice',
	props: {
		exercice: Object,
		index: Number,
		type: String,
	},
	data () {
		return {
			max: {
				rm: 'rm',
				tm: 'tm'
			},
			exercices: this.$store.state.exercices,
			exerciceOptionClass: null
		}
	},
	methods: {
		calculPerf: function(e, {from, to}) {
			this.exercices[this.type][this.index].max[from] = parseInt(e.target.value);
			this.exercices[this.type][this.index].max[to] = from === this.max.rm ? parseInt(e.target.value) * 0.9 : parseInt(e.target.value) / 0.9;
			this.$store.commit('updateExercices', this.exercices);
		},
		roundValue: function(value) {
			return Math.ceil(value * 4) / 4;
		},
		deleteAssistance: function() {
			let exercices = JSON.parse(JSON.stringify(this.exercices));
			exercices.secondary.splice(this.index, 1);
			
			this.$store.commit('updateExercices', exercices);
		},
		toggleExerciceOptions(className) {
			this.exerciceOptionClass = this.exerciceOptionClass ? null : className;
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
	.exercice {
		padding-top: 8px;
		padding-bottom: 8px;
		position: relative;
		transition: transform ease-out .3s;
	}

	.exercice::after {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.exercice--options-enabled {
		transform: translateX(-80px);
		transition: transform ease-out .3s
	}

	.exercice__label {
		margin-bottom: 5px;
		font-size: 17px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.exercice__delete-button {
		position: absolute;
		top: 0;
		bottom: 0;
		border: none;
		background-color: #d81e1e;
		color: #fff;
		width: 80px;
		right: 0;
    	transform: translateX(100%);
	}

	.datas {
		display: flex;
	}

	.datas__item {
		display: flex;
		height: 35px;
		flex: 1;
	}

	.datas__item + .datas__item {
		margin-left: 25px;
	}

	.datas + .datas {
		margin-left: 10px;
	}

	.datas__label {
		width: 30px;
		line-height: 35px;
		font-size: 12px;
		text-align: center;
		text-transform: uppercase;
		border: 2px solid #ea9852;
		color: #ea9852;
		border-radius: 4px;
   		border-bottom-right-radius: 0;
	}

	.datas__label--tm {
		border: 2px solid #34495e;
		color: #34495e;
	}

	.datas__label--unit {
		background-color: transparent;
		color: #737373;
		text-transform: none;
		border: none;
		line-height: normal;
		font-size: 17px;
		align-self: flex-end;
	}

	.datas__input {
		width: calc(100% - 60px);
		border: none;
		padding: 0 10px;
		box-sizing: border-box;
		border-bottom: 2px solid #ea9852;
		color: #ea9852;
	}
	.datas__input--tm {
		color: #34495e;
		border-bottom: 2px solid #34495e;
	}
	.icon__ellipsis {
		font-size: 18px;
	}
</style>