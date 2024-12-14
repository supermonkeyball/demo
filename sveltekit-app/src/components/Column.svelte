<script lang="ts">
  export let columnData: string[];
  export let selected: any;
  export let onSelect: (item: any) => void;
  export let label: string;
</script>

<div class="column">
  <ul>
    {#each columnData as item}
      <li>
        <button 
          on:click={() => onSelect(item)} 
          class:selected={selected === item}
        >
          |_{item}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  
  button {
    all: unset;
    width: 100%;
    cursor: pointer;
  }

  button.selected {
    background-color: var(--highlight);
  }

  ul, li {
    all: unset;
    padding: 0;
  }

  /* Use :global to ensure these styles are applied across components */
  :global(button.selected) {
    background-color: var(--highlight);
  }

  :global(ul) {
    padding: 0;
    list-style: none;
  }

  :global(li) {
    margin-bottom: 5px;
  }
</style>
