<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import type { PageFlip } from 'page-flip';

	let bookContainer: HTMLElement;
	let pageFlip: PageFlip;
	let pageWrapper: HTMLElement;

	onMount(async () => {
		gsap.fromTo(pageWrapper, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power1.inOut' });
		const { PageFlip } = await import('page-flip');
		pageFlip = new PageFlip(bookContainer, {
			width: 380,
			height: 500,
			showCover: true,
			mobileScrollSupport: false,
			usePortrait: false
		});
		pageFlip.loadFromHTML(document.querySelectorAll<HTMLElement>('.page'));
	});

	onDestroy(() => {
		pageFlip?.destroy();
	});
</script>

<div bind:this={pageWrapper} class="story-book">
	<div bind:this={bookContainer}>
		<!-- Cover -->
		<div class="page" data-density="hard">
			<div class="page-content cover">
				<h1 class="text-3xl font-bold tracking-tight" style="color: #EEE7D2;">Cheah Chue Eng</h1>
				<p class="mt-2 text-sm" style="color: #C9B79C;">Frontend-focused Full Stack Developer</p>
			</div>
		</div>

		<!-- Page 1 — About -->
		<div class="page">
			<div class="page-content">
				<h2 class="page-title">About Me</h2>
				<p class="page-text">
					I'm a full stack developer with a strong focus on the frontend. I love crafting expressive,
					performant web experiences that feel alive.
				</p>
				<p class="page-text mt-3">
					Based in Malaysia, I build with modern tools and care deeply about design details and user
					experience.
				</p>
			</div>
		</div>

		<!-- Page 2 — Skills -->
		<div class="page">
			<div class="page-content">
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

		<!-- Page 3 — Projects -->
		<div class="page">
			<div class="page-content">
				<h2 class="page-title">Projects</h2>
				<div class="project">
					<p class="project-name">Portfolio Site</p>
					<p class="project-desc">This site — built with SvelteKit, Tailwind, and page animations.</p>
				</div>
				<div class="project mt-4">
					<p class="project-name">More coming soon...</p>
					<p class="project-desc">Always building something new.</p>
				</div>
			</div>
		</div>

		<!-- Page 4 — Contact -->
		<div class="page">
			<div class="page-content">
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
			<div class="page-content cover">
				<p class="text-sm" style="color: #C9B79C;">Thanks for reading.</p>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.page) {
		background: #C9B48A;
		border: 1px solid #9E845A;
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
		background: linear-gradient(135deg, #5A3E2B 0%, #3B2A1E 100%);
	}

	.page-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #3B2F2F;
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.page-text {
		font-size: 0.875rem;
		color: #6B5D4F;
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
		color: #6B5D4F;
	}

	.project-name {
		font-weight: 600;
		color: #3B2F2F;
		font-size: 0.9rem;
	}

	.project-desc {
		font-size: 0.8rem;
		color: #8B7D6B;
		margin-top: 0.25rem;
	}
</style>
