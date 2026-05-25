<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let mounted = $state(false);
  onMount(() => { mounted = true; });
</script>

<main class="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
  {#if mounted}
    <div class="text-center space-y-6">
      <h1 
        class="text-5xl md:text-7xl font-bold tracking-tight"
        in:fly={{ y: 20, duration: 800, delay: 100 }}
      >
        Cheah Chue Eng
      </h1>
      <p 
        class="text-xl md:text-2xl text-zinc-400"
        in:fly={{ y: 20, duration: 800, delay: 300 }}
      >
        Frontend Engineer · Motion & Interaction
      </p>
      <p 
        class="text-sm text-zinc-500 max-w-md mx-auto"
        in:fade={{ duration: 1000, delay: 600 }}
      >
        Building expressive web experiences with code.
      </p>
    </div>
  {/if}
</main>