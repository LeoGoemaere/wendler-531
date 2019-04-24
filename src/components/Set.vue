<template>
	<li>
		<span>1</span>
		<span class="set__reps">{{reps}}</span>
		<span class="set__at">@</span>
		<span class="set__weight">20</span>
		<span class="set__unit">kg</span>
	</li>
</template>

<script>

export default {
	name: 'Set',
	props: {
		exo: Object,
		reps: Number,
		weight: Number
	},
	data () {
		return {
		}
	},
	methods: {
	}
}
</script>

<style scoped>

</style>