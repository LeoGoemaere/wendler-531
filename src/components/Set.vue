<template>
	<div class="set__content">
		<span :class="{ 'set__number--extra': extraSet }" class="set__number">{{index + 1}}</span>
		<div class="set__reps-datas">
			<span class="set__reps">{{set.reps}} {{prSet}}</span>
			<span v-if="set.tm" class="set__at">@</span>
			<span v-if="set.tm" class="set__weight">{{roundValue(set.tm * tmExercice)}}</span>
			<span v-if="set.tm" class="set__unit">kg</span>
			<span v-if="!set.tm">reps</span>
		</div>
		<p v-if="extraSet" :class="`set__type--${extraSet.type}`" class="set__type">
			{{extraSet.name}}
		</p>
	</div>
</template>

<script>

export default {
	name: 'Set',
	props: {
		set: Object,
		tmExercice: Number,
		index: Number,
		extraSet: Object
	},
	data () {
		return {
			prSet: this.set.pr ? "+" : null
		}
	},
	methods: {
		roundValue: function(value) {
			return isNaN(value) ? 0 : Math.ceil(value * 4) / 4;
		}
	}
}
</script>

<style scoped>
	.set__content {
		display: flex;
		flex: 1;
	}

	.set__type {
		margin-left: auto;
		margin-right: 20px;
	}

	.set__type--joker {
		color: #16a085;
	}

	.set__type--fsl {
		color: #2980b9;
	}

	.set__reps-datas {
		margin-left: 20px;
	}

	.set__number {
		display: block;
		height: 20px;
		width: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 50%;
		background-color: #b3b3b3;
		color: white;
		font-size: 12px;
		color: #fff;
	}

	.set__number--extra {
		background-color: #34495eb3;
	}

	.set__at,
	.set__unit {
		color: #737373;
	}

	.set__reps {
		color: #ea9852;
		font-weight: 600;
	}
</style>