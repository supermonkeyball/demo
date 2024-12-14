<script lang="ts">
  import { useQuery } from '@sanity/svelte-loader';
  import { urlFor } from '$lib/sanity/image';
  import type { PageData } from './$types';
  import type { Folder } from '$lib/sanity/queries';
  import type { Post } from '$lib/sanity/queries';
  import type { Audio } from '$lib/sanity/queries';

  export let post: Post;
  export let audio: Audio;
  export let data: PageData;
  const q = useQuery(data);

  $: ({ data: posts } = $q);
  $: ({ data: audios } = $q);

  let selectedCategory = null;
  let selectedMedia = null;
  let selectedPost = null;
  let selectedAudio = null; 
</script>

<section>

<div class="container">


  <div class="column1">
    <ul>
      <button on:click={() => selectedCategory = 'gallery'} class:selected={selectedCategory === 'gallery'}>gallery</button>
      <button on:click={() => selectedCategory = 'diary'} class:selected={selectedCategory === 'diary'}>diary</button>
      <button on:click={() => selectedCategory = 'about'} class:selected={selectedCategory === 'about'}>about</button>
    </ul>
  </div>



  <div class="column2">
    {#if selectedCategory === 'gallery'}
      <ul>
        <br>
        <button on:click={() => selectedMedia = 'audio'} class:selected={selectedMedia === 'audio'}>|_audio</button>
        <button on:click={() => selectedMedia = 'photo'} class:selected={selectedMedia === 'photo'}>|_photo</button>
        <button on:click={() => selectedMedia = 'video'} class:selected={selectedMedia === 'video'}>|_video</button>
      </ul>
    {/if}
  </div>


  <div class="column3">
    {#if selectedCategory === 'gallery'}
      {#if selectedMedia === 'audio'}
        <ul>
          <br><br>
          {#if audios}
            {#each audios as audio (audio._id)}
              <button
                on:click={() => selectedAudio = audio}
                class:selected={selectedAudio?._id === audio._id}
              >
                |_ {audio.title}
              </button>
            {/each}
          {/if}
        </ul>
      {/if}

      {#if selectedMedia === 'photo'}
        <ul>
          <br><br><br>
          {#if posts}
            {#each posts as post (post._id)}
              <button
                on:click={() => selectedPost = post}
                class:selected={selectedPost?._id === post._id}
              >
                |_ <span class="thumbnail"><img src={urlFor(post.mainImage).width(12).height(12).url()} alt="img"/></span>{post.title}
              </button>
            {/each}
          {/if}
        </ul>
      {/if}

      {#if selectedMedia === 'video'}
        <ul>
          <br><br><br><br>
          {#if posts}
            {#each posts as post (post._id)}
              <button
                on:click={() => selectedPost = post}
                class:selected={selectedPost?._id === post._id}
              >
                |_ video.mov
              </button>
            {/each}
          {/if}
        </ul>
      {/if}
    {/if}
  </div>



  <div class="window">
    {#if selectedPost}
      {#if selectedPost.mainImage}
        <img
          src={urlFor(selectedPost.mainImage).url()}
          alt="image for {selectedPost.title}"/>
      {/if}
    {/if}

    {#if selectedCategory === 'about'}
      <p>emad is an interdisciplinary artist based in new york. their primary interests include looping feedback systems, emergent patterns in synthesized and natural environments, and the development of accessible and expressive interactive interfaces.</p>
    {/if}
  </div>
</div>

</section>

<style>
  .container {
    display: grid;
    grid-template-columns: 75px 75px 150px 1fr;
    max-width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 10px;
  }

  .window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
  }

  .window img, p {
    width: 50%;
  }

  button {
    all: unset;
    width: 100%;
    cursor: pointer;
  }

  button.selected {
    background-color: var(--highlight);
  }

ul {
	all: unset;
}

  .thumbnail {
    margin: 5px;
  }

@media (max-width: 768px) {
  .container {
    grid-template-rows: auto 1fr;
  }

  .window {
    grid-column: 1 / -1; 
    grid-row: 2; 
  }

  .window img, p {
    width: 75%;
  }
}
</style>
