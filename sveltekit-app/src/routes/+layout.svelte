<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
	<header class="header">

	</header>
	<main>
		<slot />
	</main>
	<footer class="footer">

	</footer>
</div>

<style>
	.container {
		margin: 0 auto;
	}
</style>
