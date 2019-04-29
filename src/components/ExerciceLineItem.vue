<template>
	<div class="exercice">
		<p class="exercice__label">{{ this.exercice.name }}</p>
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
	</div>
</template>

<script>

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
			exercices: this.$store.state.exercices
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
		}
	}
}
</script>

<style scoped>
	.exercice + .exercice {
		margin-top: 16px;
	}

	.exercice__label {
		margin-bottom: 5px;
		font-size: 17px;
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
</style>