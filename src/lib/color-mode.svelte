<script lang="ts">
	import { onMount } from 'svelte';

	const toggleColorMode = () => {
		const html = document.getElementsByTagName('html')[0];

		console.log(html);
		console.log(localStorage.getItem('theme'));

		// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		//     // dark mode
		// }
		// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		//     const newColorScheme = event.matches ? "dark" : "light";
		// });

		console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);

		if (html.classList.contains('dark')) {
			html.classList.remove('dark');
			html.classList.add('light');
			localStorage.setItem('theme', 'dark');
		} else if (html.classList.contains('light')) {
			html.classList.remove('light');
			html.classList.add('dark');
			localStorage.setItem('theme', 'light');
		} else {
			html.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}

		// // On page load or when changing themes, best to add inline in `head` to avoid FOUC

		// // Whenever the user explicitly chooses light mode
		// localStorage.theme = 'light'

		// // Whenever the user explicitly chooses dark mode
		// localStorage.theme = 'dark'

		// // Whenever the user explicitly chooses to respect the OS preference
		// localStorage.removeItem('theme')
	};

	onMount(async () => {
		const html = document.getElementsByTagName('html')[0];
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}

		// const module = await import('my-non-ssr-component');
		// MyComponent = module.default;
	});
</script>

<button on:click={toggleColorMode}> toggleColorMode </button>
