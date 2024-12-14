<script lang="ts">
  import { useQuery } from '@sanity/svelte-loader';
  import { urlFor } from '$lib/sanity/image';
  import type { PageData } from './$types';
  import type { Post } from '$lib/sanity/queries';
  import type { Tagging } from '$lib/sanity/queries';
  import Window from '../components/Window.svelte';

  export let post: Post;
  export let data: PageData;

  const q = useQuery(data);
  $: ({ data: posts } = $q);

  let selectedCategory = null;
  let selectedMedia = null;
  let selectedPost = null;

  const categories = ['gallery', 'diary', 'about'];
  const label = ['audio', 'photo', 'video'];

  $: filteredPosts = posts?.filter(post => {
    if (!post.tags) return false;
    return post.tags.some(tag => tag.slug?.current === selectedMedia);
  });

  $: {
    if (selectedCategory !== 'gallery' || !selectedMedia) {
      selectedPost = null;  
    }
  }

  $: {
    if (selectedCategory === 'about') {
      selectedPost = posts?.find(post => post.title.toLowerCase() === 'about') || null;
    }
  }

  $: br1 = selectedCategory ? '<br>'.repeat(categories.indexOf(selectedCategory) + 1) : '';
  $: br2 = selectedMedia ? '<br>'.repeat(label.indexOf(selectedMedia) + 2) : '';
</script>

<section>
  <div class="container">
    <div class="column1">
      <ul>
        {#each categories as category}
          <button 
            on:click={() => { selectedCategory = category; selectedPost = null; }} 
            class:selected={selectedCategory === category}
          >
            {category}
          </button>
        {/each}
      </ul>
    </div>

    <div class="column2">
      {#if selectedCategory === 'gallery'}
        <ul>
          {@html br1}
          {#each label as media}
            <button 
              on:click={() => { selectedMedia = media; selectedPost = null; }} 
              class:selected={selectedMedia === media}
            >
              |_{media}
            </button>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="column3">
      {#if selectedCategory === 'gallery' && selectedMedia}
        <ul>
          {@html br2}
          {#if filteredPosts && filteredPosts.length > 0}
            {#each filteredPosts as post (post._id)}
              <button
                on:click={() => selectedPost = post}
                class:selected={selectedPost?._id === post._id}
              >
                <span class="thumbnail">
                  {#if selectedMedia === 'photo' || selectedMedia === 'video' || selectedMedia === 'audio'}
                    |_
                    {#if post.thumbnail}
                      <img 
                      src={urlFor(post.thumbnail).width(12).height(12).url()} 
                      alt="img" 
                      />
                     {/if}
                  {/if}
                </span>
                {post.title}
              </button>
            {/each}
          {/if}
        </ul>
      {/if}
    </div>

      {#if selectedPost}
        <Window {selectedPost} />
      {/if}

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
