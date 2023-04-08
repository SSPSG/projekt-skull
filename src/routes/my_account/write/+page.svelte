<!-- ! placeholder -->

<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import type { Editor } from '@tiptap/core';
	import { pb } from '$lib/pocketbase';

	import Editors from '$lib/editorComponents/editor.svelte';

	let title: string;
	let editor: Editor;
	function saveBlog() {
		exportToString();
	}

	async function exportToString() {
		let post_string = editor.getHTML();
		// json form post_string
		if (!$currentUser) return;
		// create name from fisrt line of post
		const blog = {
			name: title,
			author: $currentUser.id,
			blogpost: post_string
		};
		await pb.collection('blogposts').create(blog);
	}
</script>

{#if $currentUser}
	<h1>Hi {$currentUser.username}</h1>
	<p>Here's your page</p>
	<Editors bind:editor bind:title />
	<button on:click={saveBlog}> save </button>
{:else}
	<div>go <a href="login">login</a></div>
{/if}
