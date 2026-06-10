<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ArrowRight, Star } from '@lucide/svelte';

	let mounted = $state(false);
	let stars = $state<{ id: number; top: number; left: number }[]>([]);
	let nextId = 0;

	onMount(() => {
		mounted = true;
	});

	const spawnStar = () => {
		const id = nextId++;
		stars.push({ id, top: Math.random() * 90, left: Math.random() * 90 });
		setTimeout(() => {
			stars = stars.filter((s) => s.id !== id);
		}, 2000);
	};
</script>

<main class="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100 relative">
	{#each stars as star (star.id)}
		<div class="star absolute pointer-events-none" style="top:{star.top}vh; left:{star.left}vw">
			<Star size={20} color="yellow" strokeWidth={3} fill="orange" />
		</div>
	{/each}
	{#if mounted}
		<div class="space-y-6 text-center">
			<h1
				class="text-5xl font-bold tracking-tight md:text-7xl"
				in:fly={{ y: 20, duration: 800, delay: 100 }}
			>
				Cheah Chue Eng
			</h1>

			<p class="text-xl text-zinc-400 md:text-2xl flex justify-center" 
      in:fly={{ y: 20, duration: 800, delay: 300 }} >
				<span class="px-2">Frontend-focused Full Stack Developer </span>
        <Star onclick={spawnStar} size={20} color="yellow" strokeWidth={3} fill="orange"/>

			</p>
			<p class="mx-auto max-w-md text-sm text-zinc-500" in:fade={{ duration: 1000, delay: 600 }}>
				Building expressive web experiences with code.
			</p>
			<div class=" flex justify-center">
				<button class="border-2 border-gray-800 px-4 py-2 flex">
					<span>Read my story</span>
					<ArrowRight size={24} color="white" strokeWidth={2} />
				</button>
			</div>
		</div>
	{/if}
</main>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
  @keyframes fadeOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5); }
  }
  .star {
    animation: fadeIn 1s ease-out, fadeOut 2s ease-out 1s forwards;
  }


</style>
