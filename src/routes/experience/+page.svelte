<script lang="ts">
	import { goto } from '$app/navigation';
	import ExperienceBook from '$lib/components/ExperienceBook.svelte';
	import { House } from '@lucide/svelte';
</script>

<main
	class="relative flex min-h-screen flex-col items-center justify-center"
	style="background-color: #CDB091; background-image: url('/images/bg2.png'); background-size: cover; background-position: center; color: #3B2F2F;"
>
	<!-- <div class="w-full mb-8">
		<button
			onclick={() => goto('/')}
			aria-label="Back to home"
			class="back-btn absolute top-4 left-340 flex items-center justify-center text-white transition-colors"
		>
			<House size={24} />
		</button>
	</div> -->

	<ExperienceBook />
</main>

<style>
	@keyframes shimmerAnimation {
		0% {
			transform: translateX(-350%);
		}
		40% {
			transform: translateX(500%);
		}
		100% {
			transform: translateX(500%);
		}
	}
	.back-btn {
		position: relative;
		overflow: hidden;
	}
	.back-btn:hover {
		box-shadow: 0 8px 20px rgba(255, 255, 255, 0.35);
	}
	.shimmer {
		position: absolute;
		inset: 0;
		width: 30%;
		height: 100%;
		background: linear-gradient(
			45deg,
			transparent 0%,
			hsl(36deg 80% 85% / 0.25) 35%,
			hsl(40deg 100% 96% / 1) 50%,
			hsl(36deg 80% 85% / 0.25) 65%,
			transparent 100%
		);
		transform: translateX(-350%);
		animation: shimmerAnimation 3.5s ease-in-out infinite;
	}
</style>
