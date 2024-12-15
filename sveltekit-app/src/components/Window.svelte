<script lang="ts">
  export let selectedPost: any;
  import { urlFor } from '$lib/sanity/image';
  import { PortableText } from '@portabletext/svelte';

  let audioPlayer: HTMLAudioElement | null = null;
  let isPlaying = false;

  const playAudio = (audioUrl: string) => {
    if (!audioPlayer) {
      audioPlayer = new Audio(audioUrl);
      audioPlayer.controls = true;
      audioPlayer.autoplay = true;
      
      document.getElementById('audio-container')?.appendChild(audioPlayer);
    } else {
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    }
  };

  $: {
    if (!selectedPost) {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    } else if (selectedPost?.audio?.asset?.url) {
      playAudio(selectedPost.audio.asset.url);
    }
  }

  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  });
</script>

<div class="window">
  {#if selectedPost.mainImage}
    <img src={urlFor(selectedPost.mainImage).url()} alt="image for {selectedPost.title}" />
  {/if}
  
  {#if selectedPost.audio?.asset?.url}
    <center>playing {selectedPost.title}</center>
  {/if}

  {#if selectedPost.body}
    <p><PortableText value={selectedPost.body} /></p>
  {/if}
</div>

<style>
  .window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .window img, p {
    width: 50%;
  }

  @media (max-width: 768px) {
    .window {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    .window img, p {
      width: 75%;
    }
  }
</style>
