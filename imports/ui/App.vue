<template>
	<div></div>
</template>

<script>
export default {
	computed: {
		count() {
			console.log(this)
			return this.$store.state.count
		},
	},
}
</script>

<style></style>
