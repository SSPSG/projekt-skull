<script lang="ts">
	/*
	 * Junk code!
	 */

	import { pb, currentUser } from '$lib/pocketbase';
	import { regEx, validate } from '$lib/validation';
	import '../scss/global.scss';

	export let register: boolean = false;

	let usernameInput: HTMLInputElement;
	let emailInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;
	let passwordConfirm: string;

	let authErrorText: string = '';
	let authError: boolean = false;

	async function sendRequest() {
		const data = {
			username: usernameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
			passwordConfirm: passwordConfirm
		};
		await pb.collection('users').create(data);
	}

	function checkForInvalidInput() {
		const inputs: HTMLInputElement[] = [usernameInput, emailInput, passwordInput];
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i] == undefined) continue;
			let currentInput: string = inputs[i].value;
			let inputName: string = inputs[i].name;
			if (!validate(currentInput, regEx[inputName])) return false;
		}
		return true;
	}

	function onValidate(input: HTMLInputElement, regEx: RegExp) {
		if (!validate(input.value, regEx)) {
			input.classList.add('invalid');
			input.classList.remove('valid');
		}
		else {
			input.classList.add('valid');
			input.classList.remove('invalid');
		}
	}

	function authentificationError(text: string, throwError: boolean): void {
		authError = throwError;
		authErrorText = text;
	}

	async function login() {
		authentificationError('', false);
		try {
			if (!checkForInvalidInput()) return;
			await pb.collection('users').authWithPassword(emailInput.value, passwordInput.value);
		} catch (error) {
			authentificationError('Invalid username or password!', true);
		}
	}

	async function signUp() {
		authentificationError('', false);
		try {
			if (passwordInput.value != passwordConfirm) {
				authentificationError("Passwords don't match!", true);
				return;
			} else if (!checkForInvalidInput()) return;

			await sendRequest();

			login();
		} catch (error) {
			authentificationError('Unexpected error or email is already used!', true);
		}
	}

	function logOut() {
		pb.authStore.clear();
	}
</script>

{#if $currentUser}
	<div class="body">
		<p>{$currentUser.username}</p>
		<button on:click={logOut}>Log out</button>
	</div>
{:else if register}
	<div class="body">
		<div class="signup">
			<h1>Sign up</h1>
			<form>
				{#if authError}
					<p class="error-text">{authErrorText}</p>
				{/if}
				<input
					type="text"
					name="username"
					placeholder="username"
					required
					on:keyup={() => onValidate(usernameInput, regEx.username)}
					bind:this={usernameInput}
				/>
				<p>Invalid username!</p>
				<input
					type="email"
					name="email"
					placeholder="email"
					required
					on:keyup={() => onValidate(emailInput, regEx.email)}
					bind:this={emailInput}
				/>
				<p>Invalid email!</p>

				<input
					type="password"
					name="password"
					placeholder="password"
					on:keyup={() => onValidate(passwordInput, regEx.password)}
					required
					bind:this={passwordInput}
				/>

				<p>Invalid password!</p>
				<input
					type="password"
					placeholder="confirm password"
					required
					bind:value={passwordConfirm}
				/>
				<p>passwords don't match!</p>
				<button on:click={signUp}><p>Create account</p></button>
			</form>
		</div>
	</div>
{:else}
	<div class="body">
		<div class="signin">
			<h1>Sign in</h1>
			<form on:submit|preventDefault={login}>
				{#if authError}
					<p class="error-text">{authErrorText}</p>
				{/if}
				<input
					type="text"
					name="email"
					placeholder="email"
					required
					on:keyup={() => onValidate(emailInput, regEx.email)}
					bind:this={emailInput}
				/>
				<p>Invalid email!</p>

				<input
					type="password"
					name="password"
					placeholder="password"
					required
					bind:this={passwordInput}
				/>
				<a href="#top">Forgor💀 password?</a>
				<button type="submit"><p>Sign in</p></button>
			</form>
			<p class="no-account">Don't have an account? <a href="register">Sign Up</a>!</p>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../scss/utils.scss';

	$form-background-color: rgba(139, 139, 139, 0.2);
	
	.body {
		display: flex;
		align-items: center;
		justify-content: center;
	
		height: 100vh;
	}
	
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	
		width: 100%;
	
		input {
			width: 18em;
			height: 2.5em;
			padding: 0px 1em;
	
			font-size: 20px;
			background-color: rgba(1, 1, 1, 0);
			border-radius: 10px;
			transition: 0.1s ease;
		}
		input:focus {
			border-color: $purple-color;
		}
		input:not(:first-child) {
			margin-top: 34px;
		}
		input + p {
			display: none;
			color: red;
		}

		:global(input.invalid), :global(input.invalid:focus) {
			border-color: red!important;
		}
		:global(.valid + p) {
			display: none!important;
		}
		:global(.invalid + p) {
			display: block!important;
		}
	
		a {
			margin-left: 40%;
			font-size: 16px;
		}
	
		button {
			width: 11em;
			height: 3.2em;
			margin-top: 34px;
	
			background-color: $purple-color;
			border-radius: 12px;
			border: 0;
	
			p {
				font-size: 25px;
				color: $white-color;
			}
	
			transition: 0.1s ease-in-out;
		}
		button:hover {
			opacity: 0.9;
		}
	}
	
	.signin, .signup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	
		width: 30em;
		height: 40em;
		background-color: $form-background-color;
		border-radius: 30px;
	
		h1 {
			position: relative;
			font-size: 76px;
			font-weight: 400;
			text-align: center;
	
			bottom: 1em;
		}
	
		.error-text {
			color: red;
		}
	}

	.signin {
		.no-account {
			position: relative;
			top: 30px;
			font-size: 18px;
		}
	}
	
	.signup {
		h1 {
			bottom: 0.5em;
		}
	
		form {
			input:not(:first-child) {
				margin-top: 20px;
			}
	
			button {
				width: 15.8em;
				height: 3.8em;
			}
		}
	}
</style>