<script lang="ts">
    import { pb, currentUser } from '$lib/pocketbase';
    import '/src/scss/authentification.scss';

    export let register: boolean = false;

    let username: string;
    let email: string;
    let password: string;
    let passwordConfirm: string;

    let loginError: boolean = false;
    let registerEmailError: boolean = false;

    async function login() {
        try {
            loginError = false;
            const user = await pb.collection('users').authWithPassword(username, password);
        }
        catch (error: any) {
            console.log(error.data);
            loginError = true;
        }
    }

    async function signUp() {
        if (password != passwordConfirm) return;
        const data = {
            username,
            email,
            password,
            passwordConfirm
        }
        await pb.collection('users').create(data);
        login();
    }

    function logOut() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
    <p>{$currentUser.username}</p>
    <button on:click={logOut}>Log out</button>
{:else}
    {#if register}
        <div class="signup">
            <h1>Sign in</h1>
            <form>
                <input type="text" placeholder="username or email" required bind:value={username}>
                <input type="email" placeholder="email" required bind:value={email}>
                <input type="password" placeholder="password" required bind:value={password}>
                <input type="password" placeholder="confirm password" required bind:value={passwordConfirm}>
                <button type="submit" on:click={signUp}><p>Create account</p></button>
            </form>
        </div> 
    {:else}
        <div class="signin">
            <h1>Sign in</h1>
            <form>
                <input type="text" placeholder="username or email" required bind:value={username}>
                <input type="password" placeholder="password" required bind:value={password}>
                <a href="#top">Forgor💀 password?</a>
                <button type="submit" on:click={login}><p>Sign in</p></button>
            </form>
            <p class="no-account">Don't have an account? <a href="#top">Sign Up</a>!</p>
        </div> 
    {/if}
{/if}
