<template>
	<div class="pb-4">
		<div class="flex items-baseline gap-2 mb-2">
			<h3 class="font-bold">
				<slot name="title" />
			</h3>

			<pill-badge v-bind="{ colour }" class="font-mono">
				<slot name="shortcut" />
			</pill-badge>

			<pill-badge v-if="required" colour="red">
				Required
			</pill-badge>
		</div>

		<slot />
	</div>
</template>

<script setup>
defineProps({
	/**
	 * The colour of the shortcut, to differentiate it from others.
	 */
	colour: {
		type: String,
		default: null,
	},

	/**
	 * Whether this shortcut is required for a field.
	 */
	required: {
		type: Boolean,
		default: false,
	},
});
</script>
