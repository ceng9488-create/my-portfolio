<script lang="ts">
	import { goto } from '$app/navigation';
	import StoryBook from '$lib/components/StoryBook.svelte';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-6"
	style="background-color: #CDB091; background-image: url('/images/bg2.png'); background-size: cover; background-position: center; color: #3B2F2F;"
>
	<button
		onclick={() => goto('/')}
		class="flex items-center gap-1 transition-colors back-btn font-spectral text-xl text-white"
	>
		← Back
	</button>

	<StoryBook />
</main>

<style>
	/* .back-btn {
		color: #6B5D4F;
	}
	.back-btn:hover {
		color: #3B2F2F;
	} */
</style>
