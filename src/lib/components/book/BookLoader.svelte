<script lang="ts">
	import { fade } from 'svelte/transition';

	/**
	 * Cover for the experience page while the book's textures download. The page
	 * pulls in several megabytes of PNG, so without this the book pops in half
	 * dressed. Shown until the images resolve *and* MIN_MS has passed, so a warm
	 * cache doesn't produce a single-frame flash.
	 */
	let { assets, onReady }: { assets: string[]; onReady?: () => void } = $props();

	const MIN_MS = 1100;

	let done = $state(false);

	const preload = (src: string) =>
		new Promise<void>((resolve) => {
			const img = new Image();
			// Resolve on error too: a missing texture should never wedge the loader.
			img.onload = img.onerror = () => resolve();
			img.src = src;
		});

	$effect(() => {
		let cancelled = false;

		Promise.all([
			...assets.map(preload),
			new Promise((r) => setTimeout(r, MIN_MS))
		]).then(() => {
			if (cancelled) return;
			done = true;
			onReady?.();
		});

		return () => {
			cancelled = true;
		};
	});
</script>

{#if !done}
	<div class="loader" out:fade={{ duration: 600 }}>
		<div class="book" aria-hidden="true">
			<span class="leaf"></span>
			<span class="leaf"></span>
			<span class="leaf"></span>
		</div>
		<p class="caption">Opening the book…</p>
	</div>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		background-color: #cdb091;
		background-image: url('/images/bg2.png');
		background-size: cover;
		background-position: center;
	}

	/* Spine plus two static covers; the .leaf spans are the pages turning over it. */
	.book {
		position: relative;
		width: 180px;
		height: 135px;
		perspective: 900px;
		/* bg2 is a dark vignette; the book needs its own light to sit on. */
		filter: drop-shadow(0 0 40px rgba(232, 213, 183, 0.28));
	}

	.book::before,
	.book::after {
		content: '';
		position: absolute;
		top: 0;
		width: 89px;
		height: 100%;
		background: #f3e4cd;
		border: 2px solid #c99a66;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
	}

	.book::before {
		left: 0;
		border-radius: 4px 0 0 4px;
	}

	.book::after {
		right: 0;
		border-radius: 0 4px 4px 0;
	}

	.leaf {
		position: absolute;
		top: 0;
		left: 89px;
		width: 89px;
		height: 100%;
		background: #fbf3e4;
		border: 2px solid #c99a66;
		border-radius: 0 4px 4px 0;
		transform-origin: left center;
		transform-style: preserve-3d;
		animation: turn 2.1s ease-in-out infinite;
	}

	.leaf:nth-child(2) {
		animation-delay: 0.35s;
	}

	.leaf:nth-child(3) {
		animation-delay: 0.7s;
	}

	@keyframes turn {
		0% {
			transform: rotateY(0deg);
		}
		/* Held open past the flip so the leaves read as a stack, not a loop. */
		55%,
		100% {
			transform: rotateY(-180deg);
		}
	}

	.caption {
		color: #e8d5b7;
		font-size: 1rem;
		letter-spacing: 0.08em;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
		animation: breathe 2.1s ease-in-out infinite;
	}

	@keyframes breathe {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.leaf,
		.caption {
			animation: none;
		}
		.leaf:not(:first-child) {
			display: none;
		}
	}
</style>
