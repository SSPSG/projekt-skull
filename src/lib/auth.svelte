<script lang="ts">
    
	/*
	 * Junk code!
	 */

	import { pb, currentUser } from '$lib/pocketbase';
	import { regEx, validate } from '$lib/validation';
	import '/src/scss/authentification.scss';

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
			let currentInput: HTMLInputElement = inputs[i];
			if (currentInput == undefined) continue;
			let inputName: string = currentInput.name;
			if (!validate(currentInput, regEx[inputName])) return false;
		}
		return true;
	}

	function onValidate(input: HTMLInputElement, regEx: RegExp) {
		if (!validate(input, regEx)) input.className = 'invalid';
		else input.className = 'valid';
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
					name="password"
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
			<p class="no-account">Don't have an account? <a href="#top">Sign Up</a>!</p>
		</div>
	</div>
{/if}
