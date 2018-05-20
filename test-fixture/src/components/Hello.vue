<template lang="pug">
#hello
	span {{ text }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'Hello'
})
export default class Hello extends Vue {
	text: string = 'Hello, World!'
}
</script>

<style lang="scss">
#hello {
	span {
		color: purple;
	}
}
</style>
