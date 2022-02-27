<script lang="ts">
	import type { Book } from '$types';

	export let books: Book[];
</script>

<svelte:head>
	<title>Books</title>
</svelte:head>

<div class="books">
	<div>
		<div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
			<div class="space-y-8 sm:space-y-12">
				<div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
					<h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Books</h2>
					<p class="text-xl text-gray-500">
						Risus velit condimentum vitae tincidunt tincidunt. Mauris ridiculus fusce amet urna
						nunc. Ut nisl ornare diam in.
					</p>
				</div>
				<ul
					class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
				>
					{#each books as book}
						<li>
							<div class="space-y-4">
								<img
									class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24 object-cover"
									src={book.cover.thumbnail}
									alt={book.title}
								/>
								<div class="space-y-2">
									<div class="text-xs font-medium lg:text-sm">
										<h3>{book.title}</h3>
										{#if book.serie}
											<p class="text-indigo-600">
												{book.serie?.title}
											</p>
										{/if}
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
