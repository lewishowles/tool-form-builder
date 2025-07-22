<template>
	<div class="px-8 py-12 md:px-24 md:py-20">
		<div class="page-title flex flex-col gap-4 md:flex-row md:items-center mb-8">
			<icon-pencil class="page-title__icon text-white p-5 rounded-full size-16 shrink-0" />

			<h1 class="flex flex-col gap-2 md:gap-0">
				<span class="text-5xl font-bold text-grey-950 dark:text-white">Form Builder</span>
			</h1>

			<theme-selector class="order-first md:order-none md:ms-auto" />
		</div>

		<div class="w-full grid md:grid-cols-3 gap-8 md:gap-x-24">
			<div class="prose dark:prose-invert">
				<p>
					A simple tool to help quickly build consistent forms using
					<link-tag v-bind="{ href: 'https://components.howles.dev/', external: true }">
						@lewishowles/components
					</link-tag>.
				</p>

				<p>Each line represents a different input, and the code to build the form will be generated as you type.</p>
			</div>

			<form-builder />
		</div>
	</div>
</template>

<script setup>
import FormBuilder from "@/components/form-builder/form-builder.vue";
import ThemeSelector from "@/components/theme-selector/theme-selector.vue";
</script>

<style>
.page-title {
	--fade-in-end: 0.8;

	position: relative;

	&:where(.dark, .dark *) {
		&:before {
			background: radial-gradient(ellipse at center, var(--color-neon-pink), transparent 70%);
			content: "";
			height: 20rem;
			left: 0;
			opacity: 0.5;
			position: absolute;
			right: 0;
			top: -14rem;
			z-index: -1;
		}
	}
}

.page-title__icon {
	--ring: inset 0 0 0 2px var(--color-neon-pink);
	--glow: 0 0 32px var(--color-neon-pink);
	--offset: 0 4px 0 0 var(--color-grey-200);
	--offset-dark: 0 4px 0 0 var(--color-pink-900);

	background-image: linear-gradient(to bottom, color-mix(in oklab, var(--color-neon-pink), white 30%), var(--color-neon-pink) 50%);
	box-shadow: var(--ring), var(--offset);

	&:where(.dark, .dark *) {
		box-shadow: var(--ring), var(--glow), var(--offset-dark);
	}
}
</style>
