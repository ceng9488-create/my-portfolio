<script lang="ts">
	import type { Skill } from '$lib/data/timeline';

	/** The focal year's skills. Re-keyed by the caller, so `chip-in` replays as a
	 * new year lands. */
	let { skills }: { skills: Skill[] } = $props();
</script>

<ul class="tl-skills">
	{#each skills as skill (skill.name)}
		<li class="skill-chip">
			{#if skill.icon}
				<svg class="skill-logo" viewBox="0 0 24 24" fill="#{skill.icon.hex}" aria-hidden="true">
					<path d={skill.icon.path} />
				</svg>
			{:else if skill.lucide}
				{@const Lucide = skill.lucide}
				<!-- Literal hex, not var(--book-accent): this lands on the SVG `stroke`
				     presentation attribute, where custom properties don't resolve. -->
				<Lucide class="skill-logo" size={18} color="#8b5e3c" />
			{/if}
			<span>{skill.name}</span>
		</li>
	{/each}
</ul>

<style>
	.tl-skills {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
		margin: 0;
		animation: chip-in 0.45s ease both;
	}

	@keyframes chip-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.skill-chip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--book-ink-soft);
	}

	.skill-chip :global(.skill-logo) {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.tl-skills {
			animation-duration: 0.01ms;
		}
	}
</style>
