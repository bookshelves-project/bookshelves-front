<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
	import ColorMode from '$lib/color-mode.svelte';
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<img
						class="block lg:hidden h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
						alt="Workflow"
					/>
					<img
						class="hidden lg:block h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
						alt="Workflow"
					/>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<a
							sveltekit:prefetch
							href="/"
							class:active={$page.url.pathname === '/'}
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:no-underline"
						>
							Home
						</a>
						<a
							sveltekit:prefetch
							href="/about"
							class:active={$page.url.pathname === '/about'}
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:no-underline"
							>About</a
						>
						<a
							sveltekit:prefetch
							href="/books"
							class:active={$page.url.pathname === '/books'}
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:no-underline"
							>Books</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Profile dropdown -->
				<div class="ml-3 relative">
					<ColorMode />
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	.active {
		@apply bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium;
	}
</style>
