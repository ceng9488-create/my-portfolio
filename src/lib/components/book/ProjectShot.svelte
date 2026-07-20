<script lang="ts">
	import type { Project } from '$lib/data/resume';

	/**
	 * The picture half of the projects spread.
	 *
	 * A project with an `image` gets its screenshot. Without one it gets a drawn
	 * mock window — a title bar and a few bars of "content" tinted from the
	 * project's slot — so the leaf still has something the eye lands on. Swapping
	 * a real screenshot in later is just setting `image` in the data.
	 */
	let { project, index }: { project: Project; index: number } = $props();

	/** Enough separation that two adjacent projects never read as the same shot. */
	const hues = [24, 205, 150, 275];
	let hue = $derived(hues[index % hues.length]);
</script>

<figure class="shot" style="--shot-hue: {hue}">
	<div class="chrome">
		<span class="dot"></span>
		<span class="dot"></span>
		<span class="dot"></span>
	</div>

	{#if project.image}
		<img src="/images/{project.image}" alt="Screenshot of {project.name}" />
	{:else}
		<div class="mock" aria-hidden="true">
			<span class="bar w-70"></span>
			<span class="bar w-45"></span>
			<span class="bar w-85"></span>
			<span class="bar w-60"></span>
		</div>
	{/if}
</figure>

<style>
	.shot {
		width: 100%;
		margin: 0;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 30%, transparent);
		border-radius: 0.5rem;
		overflow: hidden;
		background: color-mix(in srgb, var(--book-parchment) 70%, transparent);
		box-shadow: 0 2px 8px rgba(59, 47, 47, 0.12);
	}

	.chrome {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.35rem 0.5rem;
		background: color-mix(in srgb, var(--book-tan) 55%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--book-accent-deep) 20%, transparent);
	}

	.chrome .dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--book-accent-deep) 45%, transparent);
	}

	/* 16:10 is close enough to a laptop screenshot that `cover` trims a few pixels
	   rather than eating a whole toolbar. Both the real image and the mock use it,
	   so the copy below never shifts as the carousel moves between a project that
	   has a screenshot and one that doesn't. */
	.shot img,
	.mock {
		aspect-ratio: 16 / 10;
		width: 100%;
	}

	.shot img {
		display: block;
		object-fit: cover;
		/* Anchored to the top: the app's header and stat row are the recognisable
		   part, and they're what any crop should keep. */
		object-position: top center;
	}

	.mock {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		padding: 0 0.9rem;
		background: linear-gradient(
			135deg,
			hsl(var(--shot-hue) 45% 88%),
			hsl(calc(var(--shot-hue) + 25) 40% 80%)
		);
	}

	.bar {
		height: 0.45rem;
		border-radius: 999px;
		background: hsl(var(--shot-hue) 35% 45% / 0.35);
	}

	.w-70 {
		width: 70%;
	}
	.w-45 {
		width: 45%;
	}
	.w-85 {
		width: 85%;
	}
	.w-60 {
		width: 60%;
	}
</style>
