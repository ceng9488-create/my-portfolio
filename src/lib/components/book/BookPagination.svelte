<script lang="ts">
	let {
		totalSpreads,
		currentSpread,
		canGoPrev,
		canGoNext,
		onPrev,
		onNext
	}: {
		totalSpreads: number;
		currentSpread: number;
		canGoPrev: boolean;
		canGoNext: boolean;
		onPrev: () => void;
		onNext: () => void;
	} = $props();
</script>

<div class="pagination">
	<button class="nav-btn" onclick={onPrev} disabled={!canGoPrev} aria-label="Previous page">
		&#8249;
	</button>
	<div class="page-dots">
		{#each { length: totalSpreads }, i (i)}
			<span class="dot" class:active={i === currentSpread}></span>
		{/each}
	</div>
	<button class="nav-btn" onclick={onNext} disabled={!canGoNext} aria-label="Next page">
		&#8250;
	</button>
</div>

<style>
	.pagination {
		position: absolute;
		bottom: -3rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		border: 1px solid var(--book-accent);
		background: transparent;
		color: #ffffff;
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.nav-btn:hover:not(:disabled) {
		background: var(--book-accent-wash);
	}

	.nav-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}

	.page-dots {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ffffff;
		transition:
			background 0.25s ease,
			transform 0.25s ease;
	}

	.dot.active {
		background: #9e845a;
		transform: scale(1.3);
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-btn,
		.dot {
			transition-duration: 0.01ms;
		}
	}
</style>
