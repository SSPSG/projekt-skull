<header>
	<a href="/" class="logo">
		<img src="/skull.png" alt="💀" />
		<p>Blog</p>
	</a>
	<nav>
		<ul class="links">
			<li><a href="/skullheads">skullheads</a></li>
			<li><a href="/popular">popular</a></li>
			<li><a href="/about">about us</a></li>
		</ul>
		<a href="/login" class="login-btn">Login</a>
	</nav>
</header>

<style lang="scss">
	@import '../scss/utils.scss';

	$navbar-padding: 4em;
	$logo-margin: 0.2em;
	$links-margin: 2em;
	$login-box-shadow-color: rgba(1, 1, 1, 0.5);

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100px;

		background-color: $violet-color;
		box-shadow: 0 0 8px $black-color;

		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: $navbar-padding;

			img {
				height: 80px;
				animation: RotateImg 1s ease-out 1s;
				animation-fill-mode: forwards;
			}

			@keyframes RotateImg {
				from {
					transform: rotateZ(0deg);
				}
				to {
					transform: rotateZ(20deg);
				}
			}

			p {
				margin-left: $logo-margin;
				color: $white-color;
				font-size: 4em;
				font-weight: 700;
			}
		}

		nav {
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 50em;
			padding-right: $navbar-padding;

			.links {
				li {
					display: inline-block;
					list-style-type: none;

					a {
						font-size: 2em;
						color: $white-color;
					}
				}
				li:not(:first-child) {
					margin-left: $links-margin;
				}
			}

			.login-btn {
				padding: 5px 15px;
				font-size: 2em;
				color: $violet-color;
				background-color: $white-color;
				box-shadow: 0 0 8px $login-box-shadow-color;
				border-radius: 10px;
			}
		}
	}
</style>
