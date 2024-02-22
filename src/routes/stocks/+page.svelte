<script lang="ts">
	import Pagination from '$lib/components/client/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from './$types';

	export let data: PageData;
	const handler = new DataHandler(data.stocks, { rowsPerPage: 10 });
	const rows = handler.getRows();
</script>

<div>
	<h1>My Blog</h1>
	<main>
		<div class="table-container space-y-4">
			<table class="table table-hover table-compact table-auto w-full">
				<tbody>
					{#each $rows as row}
						<tr>
							<td>{row.name}</td>
							<td>{row.negative}</td>
							<!-- <td>{row.email}</td> -->
						</tr>
					{/each}
				</tbody>
				<footer class="flex justify-between">
					<!-- <RowCount {handler} /> -->
					<Pagination {handler} />
				</footer>
			</table>
		</div>
	</main>
</div>
