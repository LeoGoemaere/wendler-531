<template>
  <div id="app">
  <nav class="navigation-bar">
			<ul class="navigation-bar__list">
				<li class="navigation-bar__item">
					<router-link to='/training-1' class="navigation-bar__link">1</router-link>
				</li>
				<li class="navigation-bar__item">
					<router-link to='/training-2' class="navigation-bar__link">2</router-link>
				</li>
        <li class="navigation-bar__item navigation-bar__item--primary">
          <router-link to="/" class="navigation-bar__link navigation-bar__link--primary">
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

<style lang="scss">
* {
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Roboto', sans-serif;
	}

	#app {
		padding-bottom: 59px; /* Navigation bar height */
	}

	select {
		width: 100%;
	}

	ul {
		list-style-type: none;
	}

	h1 {
		margin-bottom: 18px;
	}

	h2 {
		margin-bottom: 15px;
	}

	p {
		color: #737373;
	}

	.space__x {
		padding-right: 20px;
		padding-left: 20px;
	}

	.space__y {
		padding-top: 25px;
		padding-bottom: 25px;
	}

	.space__top {
		padding-top: 25px;
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
		z-index: 10;
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

	.popin__label {
		padding: 0 20px;
		font-size: 17px;
		display: block;
		margin-bottom: 5px;
	}

	.popin__input-row {
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-color: #e0e0e0;
	}

	.popin__row {
		border: none;
		height: 44px;
		line-height: 44px;
		font-size: 17px;
		width: 100%;
		padding: 0 20px;
		color: #737373;
		box-sizing: border-box;
	}

	.popin__row + .popin__row {
		border-top: none;
	}

	.buttons {
		display: flex;
		padding: 15px 20px;
		justify-content: space-between;
		background-color: #f7f7f7;
	}

	.buttons--top-border {
		border-top: 1px solid #e0e0e0;
	}

	.icon__trash {
		font-size: 18px;
		color: #a72e2e;
	}

	.set-increment + .icon__trash {
		margin-left: 15px;
	}

	.row__select {
		display: none;
	}

	.row__select + label {
		padding: 0 20px;
		height: 44px;
		line-height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #737373;
	}

	.row__select:active + label {
		background: #e4e4e4;
	}

	.row__select:checked + label {
		background: #e4e4e4;
	}

	.row__select + label i { display: none; }

	.row__select:checked +label i { display: block; }

	.set {
		display: flex;
		padding: 15px 0;
		position: relative;
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
	.extraset::before {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.notif-popin {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 10px 10px;
		z-index: 20;
		transform: translateY(100%);
		transition: transform .2s ease-out;
	}
	.notif-popin--active {
		transform: translateY(0);
		transition: transform .2s ease-out;
	}
	.notif-popin__delete-container {
		background-color: #fff;
		border-radius: 15px;
		text-align: center;
		margin-bottom: 10px;
	}
	.notif-popin__description {
		padding: 10px 15px;
		border-bottom: 1px solid #dedede;
	}
	.notif-popin__button {
		background-color: transparent;
		border: none;
		display: block;
		width: 100%;
		padding: 15px 15px;
		font-size: 20px;
	}
	.notif-popin__button--delete {
		color: red;
	}
	.notif-popin__button--cancel {
		color: #34495e;
		background-color: #fff;
		border-radius: 15px;
	}
</style>
