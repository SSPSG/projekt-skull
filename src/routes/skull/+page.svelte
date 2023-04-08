<script>
	export let data;
</script>

<h1>Our 💀heads</h1>

{#each data.users as head}
	<br />
	<br />
	<h2><a href="/skull/{head.id}">{head.username}</a></h2>
{/each}
