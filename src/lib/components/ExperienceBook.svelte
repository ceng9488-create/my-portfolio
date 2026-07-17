<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageFlip } from 'page-flip';
	import {
		siTypescript,
		siJavascript,
		siSvelte,
		siReact,
		siNextdotjs,
		siNodedotjs,
		siTailwindcss,
		siGreensock,
		siGit,
		siVite
	} from 'simple-icons';
	import { Webhook } from '@lucide/svelte';

	const skills = [
		{ name: 'TypeScript', icon: siTypescript },
		{ name: 'JavaScript', icon: siJavascript },
		{ name: 'Svelte', icon: siSvelte },
		{ name: 'SvelteKit', icon: siSvelte },
		{ name: 'React', icon: siReact },
		{ name: 'Next.js', icon: siNextdotjs },
		{ name: 'Node.js', icon: siNodedotjs },
		{ name: 'REST APIs', lucide: Webhook },
		{ name: 'Tailwind CSS', icon: siTailwindcss },
		{ name: 'GSAP', icon: siGreensock },
		{ name: 'Git', icon: siGit },
		{ name: 'Vite', icon: siVite }
	];

	let bookEl: HTMLDivElement;
	let pageFlip: PageFlip;
	let currentPage = $state(0);
	let totalPages = $state(0);

	let totalSpreads = $derived(totalPages > 0 ? Math.ceil(totalPages / 2) : 1);
	let currentSpread = $derived(Math.floor(currentPage / 2));

	const chapters = [
		{ label: 'About Me', page: 1 },
		{ label: 'Skills', page: 4 },
		{ label: 'Experience', page: 5 },
		{ label: 'Education', page: 6 },
		{ label: 'Projects', page: 7 },
		{ label: 'Contact', page: 8 }
	];

	function goToPage(page: number) {
		pageFlip?.flip(page);
	}

	onMount(() => {
		import('page-flip').then(({ PageFlip }) => {
			pageFlip = new PageFlip(bookEl, {
				width: 400,
				height: 580,
				showCover: false,
				mobileScrollSupport: false,
				usePortrait: false
			});
			pageFlip.loadFromHTML(bookEl.querySelectorAll('.page'));

			totalPages = pageFlip.getPageCount();
			pageFlip.turnToPage(0);
			currentPage = pageFlip.getCurrentPageIndex();

			pageFlip.on('flip', (e) => {
				currentPage = (e as { data: number }).data;
			});
		});

		return () => {
			pageFlip?.destroy();
		};
	});

	function goPrev() {
		pageFlip?.flipPrev();
	}

	function goNext() {
		pageFlip?.flipNext();
	}
</script>

<div class="book-container">
	<img src="/images/book.png" alt="Experience Book" class="book-image" />

	<nav class="chapter-menu font-spectral">
		{#each chapters as chapter (chapter.page)}
			<button
				class="chapter-btn readbtn border-2 px-4 py-2"
				class:active={currentSpread === Math.floor(chapter.page / 2)}
				style="border-color: #8B5E3C; color: #3B2F2F;"
				onclick={() => goToPage(chapter.page)}
			>
				<span>{chapter.label}</span>
			</button>
		{/each}
	</nav>

	<div class="flipbook-wrapper font-spectral text-black">
		<div bind:this={bookEl}>
			<!-- Page 0 — Table of Contents -->
			<div class="page">
				<div class="page-content" style="background-image: url('/images/page6.png');">
					<div class="toc-block">
						<h2 class="page-content-title">Contents</h2>
						<ul class="toc-list">
							{#each chapters as chapter (chapter.page)}
								<li>
									<button class="toc-entry" onclick={() => goToPage(chapter.page)}>
										<span class="toc-label">{chapter.label}</span>
										<span class="toc-leader"></span>
										<span class="toc-page">{chapter.page + 1}</span>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 1 — About Me (Intro) -->
			<div class="page">
				<div class="page-content" style="background-image: url('/images/page2.png');">
					<div class="max-w-80">
						<h2 class="page-content-title">About Me</h2>
						<p class="page-text pt-8">
							I am a Singapore-based Full-Stack Developer with over 5 years of experience
							specializing in the JavaScript ecosystem, React, and TypeScript. My background
							uniquely bridges creative engineering and robust product delivery—spanning everything
							from hardware-integrated installations to scalable software deployment. I love tackling technical challenges with a creative twist. Flip to the next page to see how my skills have evolved across my career timeline.
						</p>
					</div>
				</div>
			</div>

			<!-- Page 3 — Skills -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 3rem; background-image: url('/images/page2.png');"
				>
					<div class="max-w-80">
						<h2 class="page-title">Skills</h2>
						<ul class="skill-grid">
							{#each skills as skill (skill.name)}
								<li class="skill-chip">
									{#if skill.icon}
										<svg
											class="skill-logo"
											viewBox="0 0 24 24"
											fill="#{skill.icon.hex}"
											aria-hidden="true"
										>
											<path d={skill.icon.path} />
										</svg>
									{:else if skill.lucide}
										{@const Lucide = skill.lucide}
										<Lucide class="skill-logo" size={18} color="#8b5e3c" />
									{/if}
									<span>{skill.name}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 4 — Work Experience -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 3rem; background-image: url('/images/page2.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-80">
						<h2 class="page-title">Experience</h2>
						<p class="company">Frontend Developer</p>
						<p class="period">Company Name · 2023 — Present</p>
						<ul class="page-list">
							<li>Built responsive UIs with React and TypeScript.</li>
							<li>Shipped features used by thousands of users.</li>
							<li>Collaborated with design to craft micro-interactions.</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 5 — Education -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 3rem; background-image: url('/images/page3.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-80">
						<h2 class="page-title">Education</h2>
						<p class="company">B.Sc. in Computer Science</p>
						<p class="period">University Name · 2019 — 2023</p>
						<ul class="page-list">
							<li>Focus on web development and human-computer interaction.</li>
							<li>Relevant coursework: Algorithms, UI/UX, Databases.</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 6 — Projects -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 3rem; background-image: url('/images/page7.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-80">
						<h2 class="page-title">Projects</h2>
						<div class="project">
							<p class="project-name">Portfolio Site</p>
							<p class="project-desc">
								This site — built with SvelteKit, Tailwind, and page-flip animations.
							</p>
						</div>
						<div class="project mt-4">
							<p class="project-name">Project Two</p>
							<p class="project-desc">
								A short one-line description of what it does and the stack.
							</p>
						</div>
						<div class="project mt-4">
							<p class="project-name">Project Three</p>
							<p class="project-desc">Another highlight — swap in your real work here.</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Page 7 — Contact -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 3rem; background-image: url('/images/page5.png'); background-size: cover; background-position: center;"
				>
					<div class="max-w-80">
						<h2 class="page-title">Get In Touch</h2>
						<p class="page-text">Let's build something great together.</p>
						<ul class="page-list mt-4">
							<li>📧 eng5128@gmail.com</li>
							<li>🐙 github.com/yourusername</li>
							<li>💼 linkedin.com/in/yourusername</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Page 9 — Closing (keeps the page count even so no half-spread is left) -->
			<div class="page">
				<div
					class="page-content"
					style="--content-top: 18rem; background-image: url('/images/page3.png');"
				>
					<div class="max-w-80">
						<p class="page-text text-center">Thanks for reading.</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="pagination text-white">
		<button class="nav-btn" onclick={goPrev} disabled={currentPage <= 0} aria-label="Previous page">
			&#8249;
		</button>
		<div class="page-dots">
			{#each Array(totalSpreads) as _, i (i)}
				<span class="dot" class:active={i === currentSpread}></span>
			{/each}
		</div>
		<button
			class="nav-btn"
			onclick={goNext}
			disabled={currentPage >= totalPages - 1}
			aria-label="Next page"
		>
			&#8250;
		</button>
	</div>
</div>

<style>
	.book-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		/* border: 1px solid green; */
	}

	.book-image {
		width: 1000px;
		height: 700px;
		max-width: 100%;
	}

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
		background: rgba(241, 232, 220, 0.9);
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
			4px 4px 0 #8b5e3c;
	}

	.chapter-btn:active {
		transform: translateY(-1px);
		box-shadow:
			0 3px 8px rgba(139, 94, 60, 0.25),
			2px 2px 0 #8b5e3c;
	}

	.chapter-btn.active {
		background: #8b5e3c;
		color: #f1e8dc !important;
		font-weight: 600;
	}

	.flipbook-wrapper {
		position: absolute;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 800px;
		height: 580px;
		overflow: hidden;
	}

	:global(.page) {
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}

	:global(.page-bg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}

	.page-content {
		position: relative;
		z-index: 1;
		height: 100%;
		display: flex;
		flex-direction: column;

		justify-content: flex-start;
		align-items: center;

		padding-top: var(--content-top, 6rem);
		padding-left: 1.2rem;
		padding-right: 1.2rem;
		text-align: left;
		box-sizing: border-box;
		color: #3b2f2f;
		border: 1px solid green;
	}

	.page-content-title {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0;
		text-align: center;
		color: #5c3d1e;
	}

	.page-title {
		position: absolute;
		top: 15rem;
		left: 0;
		right: 0;
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0;
		text-align: center;
		color: #5c3d1e;
	}

	.toc-block {
		width: 100%;
		max-width: 16rem;
		margin: 0 auto;
	}

	.toc-list {
		list-style: none;
		padding-top: 50px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.toc-entry {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: #4a3728;
		font: inherit;
		font-size: 0.95rem;
		letter-spacing: 0.02em;
		text-align: left;
		transition: color 0.2s ease;
	}

	.toc-entry:hover {
		color: #8b5e3c;
	}

	.toc-leader {
		flex: 1;
		border-bottom: 1px dotted #b39678;
		transform: translateY(-0.25rem);
	}

	.toc-page {
		font-variant-numeric: tabular-nums;
		color: #8b5e3c;
	}

	.company {
		font-size: 1rem;
		font-weight: 600;
		color: #8b5e3c;
		margin: 0;
	}

	.period {
		font-size: 0.875rem;
		color: #888;
		margin: 0 0 0.6rem;
	}

	.page-content ul {
		font-size: 0.875rem;
		line-height: 1.6;
		list-style: none;
		padding-left: 0;
		margin: 0;
		color: #4a3728;
	}

	.skill-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem 0.75rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.skill-chip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #4a3728;
	}

	.skill-chip :global(.skill-logo) {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.page-content p {
		font-size: 1rem;
		line-height: 1.6;
		margin: 0.2rem 0;
	}

	.page-content p.page-intro {
		font-size: 1.25rem;
		font-weight: 700;
	}

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
		border: 1px solid #8b5e3c;
		background: transparent;
		color: #ffffff;
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.nav-btn:hover:not(:disabled) {
		background: rgba(139, 94, 60, 0.15);
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
</style>
