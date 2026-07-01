<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageFlip } from 'page-flip';

	let bookEl: HTMLDivElement;
	let pageFlip: PageFlip;
	let currentPage = $state(0);
	let totalPages = $state(0);

	onMount(() => {
		import('page-flip').then(({ PageFlip }) => {
			pageFlip = new PageFlip(bookEl, {
				width: 390,
				height: 470,
				flippingTime: 700,
				drawShadow: false,
				usePortrait: false,
				showCover: false,
				mobileScrollSupport: false,
				startPage: 0
			});
			pageFlip.loadFromHTML(bookEl.querySelectorAll('.page'));

			totalPages = pageFlip.getPageCount();
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

	<div class="flipbook-wrapper font-spectral text-black">
		<div bind:this={bookEl}>
			<!-- Page 1 -->
			<div class="page page-left">
				<img src="/images/leftPage.png" alt="" class="page-bg" />
				<div class="page-content">
					<h2>Software Engineer</h2>
					<p class="company">Acme Corp</p>
					<p class="period">2023 – Present</p>
					<ul>
						<li>Built scalable web apps with SvelteKit & TypeScript</li>
						<li>Improved CI/CD pipelines reducing build time by 40%</li>
						<li>Led frontend architecture for 3 major product releases</li>
					</ul>
				</div>
			</div>

			<!-- Page 2 -->
			<div class="page page-right">
				<img src="/images/rightPage.png" alt="" class="page-bg" />
				<div class="page-content">
					<h2>Frontend Developer</h2>
					<p class="company">Beta Studio</p>
					<p class="period">2021 – 2023</p>
					<ul>
						<li>Developed component libraries used across 5 products</li>
						<li>Implemented GSAP animations for marketing campaigns</li>
						<li>Collaborated with design team on design systems</li>
					</ul>
				</div>
			</div>

			<!-- Page 3 -->
			<div class="page page-left">
				<img src="/images/leftPage.png" alt="" class="page-bg" />
				<div class="page-content">
					<h2>Junior Developer</h2>
					<p class="company">Gamma Agency</p>
					<p class="period">2019 – 2021</p>
					<ul>
						<li>Built responsive landing pages for 20+ clients</li>
						<li>Maintained React & Vue projects</li>
						<li>Integrated third-party APIs and payment gateways</li>
					</ul>
				</div>
			</div>

			<!-- Page 4 -->
			<div class="page page-right">
				<img src="/images/rightPage.png" alt="" class="page-bg" />
				<div class="page-content">
					<h2>Education</h2>
					<p class="company">University of Technology</p>
					<p class="period">2015 – 2019</p>
					<p>B.Sc. Computer Science</p>
					<br />
					<h2>Skills</h2>
					<p>TypeScript · Svelte · React · Node.js · GSAP · SQL</p>
				</div>
			</div>

		</div>
	</div>

	<div class="pagination text-white">
		<button class="nav-btn" onclick={goPrev} disabled={currentPage <= 0} aria-label="Previous page">
			&#8249;
		</button>
		<span class="page-indicator">{currentPage + 1} / {totalPages}</span>
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
	}

	.book-image {
		max-width: 900px;
		width: 100%;
		height: auto;
	}

	.flipbook-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 780px;
		height: 470px;
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
		padding: 1.5rem 1.2rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		color: #3b2f2f;
	}

	.page-content h2 {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0 0 0.2rem;
		color: #5c3d1e;
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
		padding-left: 1rem;
		margin: 0;
		color: #4a3728;
	}

	.page-content p {
		font-size: 1rem;
		line-height: 1.6;
		margin: 0.2rem 0;
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

	.page-indicator {
		font-size: 0.875rem;
	color: #ffffff;
		min-width: 3.5rem;
		text-align: center;
	}
</style>
