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
		padding: 10px;
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
</style>
