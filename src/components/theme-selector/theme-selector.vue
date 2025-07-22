<template>
	<div class="text-sm">
		<ui-button v-if="!isDark" class="button--muted" icon-start="icon-moon" @click="toggleDark">
			View in dark mode
		</ui-button>

		<ui-button v-if="isDark" class="button--muted" icon-start="icon-sun" @click="toggleDark">
			View in light mode
		</ui-button>
	</div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({ storageKey: "howles:form-builder:colour-scheme", initialValue: "dark" });
const toggleDark = useToggle(isDark);
</script>
