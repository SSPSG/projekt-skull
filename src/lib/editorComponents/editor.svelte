<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';


	let element: HTMLDivElement;
	export let editor: Editor;
	export let title: string;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class: 'prose'
				}
			},
			content: '<p>Hello Skull! 💀</p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

</script>

<textarea placeholder="title" bind:value={title}></textarea>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}
<div class="prosewrapperlvl1">
	<div bind:this={element} class="prosewrapperlvl2" />
</div>

<style lang="scss">
	button.active {
		background: black;
		color: white;
	}

	.prosewrapperlvl1 {
		height: 15rem;
		display: flex;
		flex-direction: column;

		.prosewrapperlvl2 {
			overflow: auto;
			height: 100%;

			:global(.prose) {
				overflow: auto;
				height: 100%;
				min-height: 15rem;
				outline: auto 1px #000000;
			}
		}
	}
</style>
