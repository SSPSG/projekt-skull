<script lang="ts">
    import { pb, currentUser } from '$lib/pocketbase';

    let username: string;
    let password: string;
    let passwordConfirm: string;

    let signUpUI: boolean = false;
    let loginError: boolean = false;

    async function login() {
        try {
            loginError = false;
            const user = await pb.collection('users').authWithPassword(username, password);
        }
        catch (error) {
            loginError = true;
        }
    }

    async function signUp() {
        if (password != passwordConfirm) return;
        const data = {
            username,
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
    Sign Up <input type="checkbox" bind:checked={signUpUI}>
        {#if signUpUI}
        <input type="text" placeholder="username or email" bind:value={username}>
        <input type="password" placeholder="password" bind:value={password}>
        <input type="password" placeholder="confirm password" bind:value={passwordConfirm}>
        <button on:click={signUp}>Submit</button>
    {:else}
        {#if loginError}
        <p style="color=red;">Wrong username or password!</p>
        {/if}
        <form>
            <input type="text" placeholder="username or email" bind:value={username}>
            <input type="password" placeholder="password" bind:value={password}>
            <button on:click={login}>Submit</button>
        </form>
    {/if}
{/if}
