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

<svelte:head>
	<title>CCE — Full-Stack Developer Portfolio</title>
	<meta
		name="description"
		content="Full-stack developer building products that connect people, with a focus on interactive and cognitive-training tools."
	/>

	<meta property="og:title" content="CCE — Full-Stack Developer Portfolio" />
	<meta
		property="og:description"
		content="Full-stack developer building products that connect people, with a focus on interactive and cognitive-training tools."
	/>
	<meta
		property="og:image"
		content="https://my-portfolio-three-chi-75.vercel.app/og-image.png"
	/>
	<meta property="og:url" content="https://my-portfolio-three-chi-75.vercel.app/" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main
	class="flex min-h-screen items-center justify-center text-zinc-100 relative"
	style="background-color: #CDB091; background-image: url('/images/bg1.png'); background-size: cover; background-position: center; color: #3B2F2F;"
>
	{#each stars as star (star.id)}
		<div class="star absolute pointer-events-none z-0" style="top:{star.top}vh; left:{star.left}vw">
			<Star size={20} color="#8A3324" strokeWidth={3} fill="#8A3324" />
		</div>
	{/each}
	{#if mounted}
		<div class="relative z-10 space-y-6 text-center">
			<h1
				class="text-5xl font-bold tracking-tight md:text-7xl"
				style="color: #3B2F2F;"
				in:fly={{ y: 20, duration: 800, delay: 100 }}
			>
				Cheah Chue Eng
			</h1>

			<p class="text-xl md:text-2xl flex justify-center"
				style="color: #6B5D4F;"
      in:fly={{ y: 20, duration: 800, delay: 300 }} >
				<span class="px-2">Frontend-focused Full Stack Developer </span>
        <Star onclick={spawnStar} size={20} color="#8A3324" strokeWidth={3} fill="#8A3324" class="mainStar"/>

			</p>
			<p class="mx-auto max-w-md text-sm" style="color: #8B7D6B;" in:fade={{ duration: 1000, delay: 600 }}>
				Building expressive web experiences with code.
			</p>
			<div class="flex justify-center gap-4 flex-wrap">
				<!-- <a href="/story" class="border-2 px-4 py-2 flex readbtn" style="border-color: #8B5E3C; color: #3B2F2F;">
					<span>Read my story</span>
					<ArrowRight size={24} color="#8B5E3C" strokeWidth={2} class="moveArrow"/>
					<span class="shimmer"></span>
				</a> -->
				<a href="/experience" class="border-2 px-4 py-2 flex items-center gap-2 readbtn" style="border-color: #8B5E3C; color: #3B2F2F;">
					
					<span>Read my story</span>
					<span class="shimmer"></span>
				</a>
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
  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }
  :global(.moveArrow) {
    animation: bounceRight 2000ms ease-in-out infinite;
  }
  .star {
    animation: fadeIn 1s ease-out, fadeOut 2s ease-out 1s forwards;
  }

  @keyframes windmill {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  :global(.mainStar) {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  :global(.mainStar:hover) {
    animation: windmill 600ms linear infinite;
  }

  @keyframes shimmerAnimation {
    0%   { transform: translateX(-350%); }
    40%  { transform: translateX(500%); }
    100% { transform: translateX(500%); }
  }
  .readbtn {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .readbtn:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(139, 94, 60, 0.35), 4px 4px 0 #8B5E3C;
  }
  .readbtn:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(139, 94, 60, 0.25), 2px 2px 0 #8B5E3C;
  }
  .shimmer {
    position: absolute;
    inset: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      hsl(36deg 80% 85% / 0.25) 35%,
      hsl(40deg 100% 96% / 1) 50%,
      hsl(36deg 80% 85% / 0.25) 65%,
      transparent 100%
    );
    transform: translateX(-350%);
    animation: shimmerAnimation 3.5s ease-in-out infinite;
  }

</style>
