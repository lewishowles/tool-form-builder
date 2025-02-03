<template>
	<div class="max-w-3xl mx-auto flex flex-col gap-8 px-8 py-12 md:py-20">
		<div>
			<h1 class="mb-4 bg-gradient-to-br from-purple-800 to-pink-800 bg-clip-text text-5xl font-bold text-transparent">
				Form builder
			</h1>

			<div class="flex flex-col gap-4 max-w-prose">
				<p>
					A simple tool to help quickly build consistent forms using

					<link-tag href="https://github.com/lewishowles/components/?tab=readme-ov-file#forms" :external="true">
						@lewishowles/components
					</link-tag>
				</p>

				<p>Each line represents a different input, and the code to build the form will be generated as you type.</p>
			</div>
		</div>

		<form-builder />
	</div>
</template>

<script setup>
import FormBuilder from "@/components/form-builder/form-builder.vue";
</script>
