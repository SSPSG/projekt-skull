<script>
	export let data;
</script>

<h1>{data.username}</h1>
{#each data.blogs as blog}
	<br />
	<br />
	<h2><a href="/skull/{blog.author}/{blog.name}">{blog.name}</a></h2>
	<p>{@html blog.content}</p>
{/each}
