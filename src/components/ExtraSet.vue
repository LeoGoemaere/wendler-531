<template>
	<li class="set extraset">
		<button class="extraset__button">
			<i class="fas fa-plus-circle icon__plus"></i>
			Add Extra Set
		</button>
	</li>
</template>

<script>
export default {
	name: 'ExtraSet',
	props: {
	},
	data () {
		return {
			
		}
	},
	methods: {
	},
	computed: {
	},
}
</script>

<style scoped>
	/* Create global styles instead */
	.set__row {
		display: flex;
	}

	.set + .set::before {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.extraset {
		padding: 0;
		position: relative;
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