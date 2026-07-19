<script lang="ts">
	/**
	 * A chapter heading: the "Chapter N" eyebrow over the title itself.
	 *
	 * `chapter` is deliberately a plain number rather than a lookup into
	 * `chapters` — not every title is a chapter opening. The right leaf of a
	 * spread (Certifications) and any future sub-heading want the same treatment
	 * without claiming a number, so they just leave it off.
	 */
	let { chapter, title }: { chapter?: number; title: string } = $props();
</script>

<h2 class="spread-title">
	{#if chapter !== undefined}
		<span class="chapter-eyebrow">Chapter {chapter}</span>
	{/if}
	{title}
</h2>

<style>
	.spread-title {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0 0 1.2rem;
		text-align: center;
		color: var(--book-accent-deep);
	}
</style>
