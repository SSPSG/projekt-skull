<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'

  import { blogPost } from '$lib/stores'

  let element: HTMLDivElement
  let editor: Editor

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
      ],
      editorProps: {
        attributes: {
          class: 'prose',
        },
      },
      content: $blogPost,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
        exportToString()
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })

  function exportToString() {
    blogPost.set(editor.getHTML())
  }
</script>

{#if editor}
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
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
  <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
    P
  </button>
{/if}
<div class="prosewrapperlvl1">
    <div bind:this={element} class="prosewrapperlvl2"/>
</div>

<style lang="scss">
  button.active {
    background: black;
    color: white;
  }

  .prosewrapperlvl1{
    height: 15rem;
    display: flex;
    flex-direction: column;
    
    .prosewrapperlvl2{
      overflow: auto;
      height: 100%;
      
      :global(.prose){
        overflow: auto;
        height: 100%;
        min-height: 15rem;
      }
    }
  }
</style>