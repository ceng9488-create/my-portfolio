<script lang="ts">
	import type { Chapter } from '$lib/data/resume';

	let {
		chapters,
		isActive,
		onSelect
	}: {
		chapters: Chapter[];
		/** Whether a chapter's page is on the spread currently open. */
		isActive: (page: number) => boolean;
		onSelect: (page: number) => void;
	} = $props();
</script>

<nav class="chapter-menu font-spectral" aria-label="Chapters">
	{#each chapters as chapter (chapter.page)}
		<button
			class="chapter-btn border-2 px-4 py-2"
			class:active={isActive(chapter.page)}
			aria-current={isActive(chapter.page) ? 'page' : undefined}
			onclick={() => onSelect(chapter.page)}
		>
			<span>{chapter.label}</span>
		</button>
	{/each}
</nav>

<style>
	.chapter-menu {
		position: absolute;
		top: 50%;
		right: -1rem;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 5;
	}

	.chapter-btn {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-color: var(--book-accent);
		background: rgba(241, 232, 220, 0.9);
		color: var(--book-ink);
		font-size: 0.875rem;
		letter-spacing: 0.03em;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.chapter-btn:hover {
		transform: translateY(-4px);
		box-shadow:
			0 8px 20px rgba(139, 94, 60, 0.35),
			4px 4px 0 var(--book-accent);
	}

	.chapter-btn:active {
		transform: translateY(-1px);
		box-shadow:
			0 3px 8px rgba(139, 94, 60, 0.25),
			2px 2px 0 var(--book-accent);
	}

	.chapter-btn.active {
		background: var(--book-accent);
		color: var(--book-parchment);
		font-weight: 600;
	}

	@media (prefers-reduced-motion: reduce) {
		.chapter-btn {
			transition-duration: 0.01ms;
		}
	}
</style>
