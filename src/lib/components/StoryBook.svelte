<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { PageFlip } from 'page-flip';

	let bookContainer: HTMLElement;
	let pageFlip: PageFlip;

	let currentPage = $state(1);
	let totalPages = $state(0);

	let totalSpreads = $derived(totalPages > 0 ? Math.ceil(totalPages / 2) : 1);
	let currentSpread = $derived(Math.floor(currentPage / 2));

	onMount(async () => {
		const { PageFlip } = await import('page-flip');
		pageFlip = new PageFlip(bookContainer, {
			width: 400,
			height: 550,
			showCover: true,
			mobileScrollSupport: false,
			usePortrait: false
		});
		pageFlip.loadFromHTML(document.querySelectorAll<HTMLElement>('.page'));
		totalPages = pageFlip.getPageCount();
		pageFlip.turnToPage(1);

		pageFlip.on('flip', (e: any) => {
			currentPage = e.data;
		});
	});

	onDestroy(() => {
		pageFlip?.destroy();
	});

	function prevPage() {
		pageFlip?.flipPrev();
	}

	function nextPage() {
		pageFlip?.flipNext();
	}
</script>

<div class="story-book-wrapper">
	<div class="story-book font-spectral text-black">
		<div bind:this={bookContainer}>
			<!-- Cover -->
			<div class="page" data-density="hard">
				<div
					class="page-content cover"
					style="background-image: url('/images/1.png'); background-size: cover; background-position: center;"
				>
					<h1 class="text-3xl font-bold tracking-tight" style="color: #EEE7D2;">Cheah Chue Eng</h1>
					<p class="mt-2 text-sm" style="color: #C9B79C;">Full Stack Developer</p>
				</div>
			</div>

			<!-- Page 1 — About Me (Intro) -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/2.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-60 self-auto">
						<h2 class="page-title">About Me</h2>
						<p class="page-text">
							I'm a full-stack developer based in Singapore, working mainly with React and JavaScript.
						</p>
						<br/>
						<p class="page-text mt-3">
							I love coding for two reasons.
						</p>
					</div>
				</div>
			</div>
			<!-- Page 2 — About Me (Part 1) -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/2.png'); background-size: cover; background-position: center;"
				>
					<div class=" self-auto">
						<p class="page-text">
							The FIRST is PEOPLE. I love building products that feel made for the person using them.</p>
							<hr class="w-48 mx-auto bg-olive-400 border-0 rounded-sm z-10">
							<p>There's something quietly magical about watching how someone moves through a website —
							which button they reach for, where they pause — and designing those little moments so
							the product feels alive, surprising them with a small delight just when they don't
							expect it.
						</p>
					</div>
				</div>
			</div>

			<!-- Page 2 — About Me (Part 2) -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/2.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-55 self-auto">
						<p class="page-text">
							The second is curiosity. I love debugging and chasing down problems. I'm never satisfied
							with just making an issue disappear — tend to understand it, to know how and why it
							happened in the first place. Getting to the root of a problem is one of the most
							rewarding feelings I know.
						</p>
						<!-- <p class="page-text mt-3">
							Both come back to the same thing: a love for the craft. The animations, the
							micro-interactions, the small touches that make an interface feel human. And one day, I
							hope to build products that sit where technology, the mind, and wellbeing meet — things
							that genuinely help people grow.
						</p> -->
					</div>
				</div>
			</div>

			<!-- Page 3 — Skills -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/3.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-55 self-auto">
						<h2 class="page-title">Skills</h2>
						<ul class="page-list">
							<li>TypeScript · JavaScript</li>
							<li>Svelte · SvelteKit</li>
							<li>React · Next.js</li>
							<li>Node.js · REST APIs</li>
							<li>Tailwind CSS · GSAP</li>
							<li>Git · Vite</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 4 — Projects -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/4.png'); background-size: cover; background-position: center;"
				>
					<h2 class="page-title">Projects</h2>
					<div class="project">
						<p class="project-name">Portfolio Site</p>
						<p class="project-desc">
							This site — built with SvelteKit, Tailwind, and page animations.
						</p>
					</div>
					<div class="project mt-4">
						<p class="project-name">More coming soon...</p>
						<p class="project-desc">Always building something new.</p>
					</div>
				</div>
			</div>

			<!-- Page 5 — Contact -->
			<div class="page">
				<div
					class="page-content"
					style="background-image: url('/images/5.png'); background-size: cover; background-position: center;"
				>
					<h2 class="page-title">Get In Touch</h2>
					<p class="page-text">Let's build something great together.</p>
					<ul class="page-list mt-4">
						<li>📧 eng5128@gmail.com</li>
						<li>🐙 github.com</li>
						<li>💼 LinkedIn</li>
					</ul>
				</div>
			</div>

			<!-- Back cover -->
			<div class="page" data-density="hard">
				<div
					class="page-content cover"
					style="background-image: url('/images/5.png'); background-size: cover; background-position: center;"
				>
					<p class="text-sm" style="color: #C9B79C;">Thanks for reading.</p>
				</div>
			</div>
		</div>
	</div>

	<div class="pagination font-spectral">
		<button
			onclick={prevPage}
			disabled={currentPage <= 1}
			class="page-btn"
			aria-label="Previous page"
		>
			&#8249;
		</button>

		<div class="page-dots">
			{#each Array(totalSpreads) as _, i}
				<span class="dot" class:active={i === currentSpread}></span>
			{/each}
		</div>

		<button
			onclick={nextPage}
			disabled={currentPage >= totalPages - 2}
			class="page-btn"
			aria-label="Next page"
		>
			&#8250;
		</button>
	</div>
</div>

<style>
	:global(.page) {
		background: #c9b48a;
		border: 1px solid #9e845a;
	}

	.page-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2.5rem;
		box-sizing: border-box;
		text-align: center;
	}

	.cover {
		background: linear-gradient(135deg, #5a3e2b 0%, #3b2a1e 100%);
	}

	.page-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #3b2f2f;
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.page-text {
		font-size: 16px;
		color: #000000;
		line-height: 1.6;
	}

	.page-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #6b5d4f;
	}

	.project-name {
		font-weight: 600;
		color: #3b2f2f;
		font-size: 0.9rem;
	}

	.project-desc {
		font-size: 0.8rem;
		color: #8b7d6b;
		margin-top: 0.25rem;
	}

	.story-book-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.pagination {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.page-btn {
		font-size: 2rem;
		line-height: 1;
		color: #8b5e3c;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0 0.25rem;
		transition:
			color 0.2s ease,
			transform 0.15s ease;
	}

	.page-btn:hover:not(:disabled) {
		color: #3b2f2f;
		transform: scale(1.2);
	}

	.page-btn:disabled {
		color: #c9b48a;
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
		/* border: 1.5px solid #9e845a; */
		transition:
			background 0.25s ease,
			transform 0.25s ease;
	}

	.dot.active {
		background: #9e845a;
		transform: scale(1.3);
	}
</style>
