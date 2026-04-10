<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<div class = 'wrapper'>
		<RouterView />
	</div>
</template>

<style scoped>
 .wrapper{
	width: 100%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 };

</style>
