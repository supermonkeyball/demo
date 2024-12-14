<script lang="ts">
  import { useQuery } from '@sanity/svelte-loader';
  import { urlFor } from '$lib/sanity/image';
  import type { PageData } from './$types';
  import type { Post } from '$lib/sanity/queries';
  import type { Tagging } from '$lib/sanity/queries';

  export let post: Post;
  export let data: PageData;

  const q = useQuery(data);
  $: ({ data: posts } = $q);

  let selectedCategory = null;
  let selectedMedia = null;
  let selectedPost = null;

  const categories = ['gallery', 'diary', 'about'];
  const mediaTypes = ['audio', 'photo', 'video']; 

  $: filteredPosts = posts?.filter(post => {
    if (!post.tags) return false; 
    return post.tags.some(tag => tag.slug?.current === selectedMedia); 
  });

  $: brTagsColumn2 = selectedCategory ? '<br>'.repeat(categories.indexOf(selectedCategory) + 1) : '';
  $: brTagsColumn3 = selectedMedia ? '<br>'.repeat(mediaTypes.indexOf(selectedMedia) + 2) : '';
</script>


<section>

<div class="container">


<div class="column1">
  <ul>
    {#each categories as category}
      <button 
        on:click={() => selectedCategory = category} 
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
	{@html brTagsColumn2}
      {#each mediaTypes as media}
        <button 
          on:click={() => selectedMedia = media} 
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
      {@html brTagsColumn3}

      {#if filteredPosts && filteredPosts.length > 0}
        {#each filteredPosts as post (post._id)}
          <button
            on:click={() => selectedPost = post}
            class:selected={selectedPost?._id === post._id}
          >
            <span class="thumbnail">
              {#if selectedMedia === 'photo' || selectedMedia === 'video' || selectedMedia === 'audio'}
                |_<img 
                  src={urlFor(post.mainImage).width(12).height(12).url()} 
                  alt="{post.title}" 
                />
              {/if}
            </span>
            {post.title}
          </button>
        {/each}
      {/if}
    </ul>
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
