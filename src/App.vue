<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<nav class="navigation-bar">
			<ul class="navigation-bar__list">
				<li class="navigation-bar__item">
					<router-link to='/training-1' class="navigation-bar__link">1</router-link>
				</li>
				<li class="navigation-bar__item">
					<router-link to='/training-2' class="navigation-bar__link">2</router-link>
				</li>
				<li class="navigation-bar__item navigation-bar__item--primary">
					<router-link :to="{ name: 'Home' }" class="navigation-bar__link navigation-bar__link--primary">
						<i class="fas fa-user-cog"></i>
					</router-link>
				</li>
				<li class="navigation-bar__item">
					<router-link to='/training-3' class="navigation-bar__link">3</router-link>
				</li>
				<li class="navigation-bar__item">
					<router-link to='/training-4' class="navigation-bar__link">4</router-link>
				</li>
			</ul>
		</nav>
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Roboto', sans-serif;
	}

	#app {
		padding: 25px 20px;
	}

	select {
		width: 100%;
	}

	h1 {
		margin-bottom: 45px;
	}

	h2 {
		margin-bottom: 25px;
	}

	p {
		color: #737373;
	}

	.button {
		border: none;
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		background-color: #ea9852;
		color: #fff;
		font-size: 17px;
		transform: scale(1);
		transition: transform .1s  ease-out;
	}

	.button + .button {
		margin-left: 10px;
	}

	.button-action {
		background: none;
		border: none;
		color: black;
		width: 100%;
		font-size: 17px;
		color: #ea9852;
	}

	.button-action--disabled {
		opacity: 0.3;
	}

	.button:active {
		transform: scale(0.99);
		transition: transform .1s  ease-out;
	}

	.button:focus {
		outline: none;
	}

	.heading {
		display: flex;
		margin-bottom: 45px;
		justify-content: space-between;
	}

	.heading h1 {
		margin-bottom: 0;
	}

	.heading__infos {
		text-align: right;
	}

	.heading__week {
		font-weight: 600;
	}

	.navigation-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #e4e4e4;
	}

	.navigation-bar__list {
		display: flex;
		list-style-type: none;
		text-align: center;
		background-color: #34495e;
	}

	.navigation-bar__item {
		flex: 1;
		position: relative;
	}

	.navigation-bar__item--primary {
		align-self: center;
	}

	.navigation-bar__link {
		display: block;
		padding: 20px 0;
		text-decoration: none;
		color: #fff;
	}
	
	.navigation-bar__link--primary {
		border: 2px solid white;
		border-radius: 55px;
		width: 40px;
		margin: auto;
		line-height: 40px;
		padding: 0;
		background: #ea9852;
	}

	.navigation-bar__link.router-link-exact-active:not(.navigation-bar__link--primary)::before {
		content: "";
		position: absolute;
		height: 2px;
		background-color: #ea9852;
		top: 0;
		left: 0;
		right: 0;
	}

	.popin__container {
		padding: 10px;
	}
	.popin__title {
		color: #000;
		font-size: 17px;
		font-weight: 600;
		padding: 15px 20px;
	}
	.popin__element {
		display: none;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background-color: #fff;
		width: 80vw;
		border-radius: 5px;
		overflow: hidden;
		opacity: 0;
		transition: opacity .3s ease-out;
	}
	.popin__element.is-active {
		display: block;
		opacity: 1;
		transition: opacity .3s ease-out;
	}
	.popin__overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 5;
	}

	.popin__overlay.is-active {
		display: block;
	}

	.popin__input-row {
	}

	.popin__label {
		padding: 0 20px;
		font-size: 17px;
		display: block;
		margin-bottom: 5px;
	}

	.popin__input {
		border: none;
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-color: #e0e0e0;
		height: 44px;
		font-size: 17px;
		width: 100%;
		padding: 0 20px;
		color: #737373;
		box-sizing: border-box;
	}

	.exercices__buttons {
		display: flex;
		padding: 15px 20px;
		justify-content: space-between;
		background-color: #f7f7f7;
	}

	.exercices__buttons--top-border {
		border-top: 1px solid #e0e0e0;
	}
</style>
