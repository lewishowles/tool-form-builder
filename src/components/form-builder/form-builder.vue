<template>
	<div>
		<form-textarea v-model="userInput" class="mb-8 text-sm" v-bind="{ inputAttributes: { class: 'font-mono' } }">
			Form configuration

			<template #help>
				Enter one input per line
			</template>
		</form-textarea>

		<token-guide />
	</div>

	<div class="col-start-2 col-span-2 flex flex-col items-start gap-8">
		<pre class="text-sm w-full">{{ formString }}</pre>

		<ui-button v-if="isSupported" class="button--muted relative" @click="copy(formString)">
			<span :class="{ 'invisible': copied }">
				Copy code
			</span>

			<span v-show="copied" class="button-padding-y animate-fade-in-up absolute inset-0 text-center" v-bind="{ 'aria-hidden': copied ? null : true }">
				Copied
			</span>
		</ui-button>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { isNonEmptyString } from "@lewishowles/helpers/string";
import { useClipboard, useStorage } from "@vueuse/core";

import useConfiguration from "@/components/form-builder/composables/use-configuration";
import useTemplateGenerator from "@/components/form-builder/composables/use-template-generator";

import TokenGuide from "@/components/token-guide/token-guide.vue";

const { copy, copied, isSupported } = useClipboard();

// Our original code, provided by the user. This is what we are converting.
const userInput = useStorage("form-builder:user-input", "Your name@your_name?Your name will only be used to identify your account");

// Convert our user input into a standardised configuration, which we will use
// to generate our code.
const { formConfiguration } = useConfiguration(userInput);

// Convert our configuration into form field strings, which we can show to the
// user.
const { formFieldsString } = useTemplateGenerator(formConfiguration);

// Combine our form fields with a general form wrapper.
const formString = computed(() => {
	if (!isNonEmptyString(formFieldsString.value)) {
		return "";
	}

	// We split our form field string so that we can indent each line
	// appropriately to match the form wrapper.
	const indentedFormFields = formFieldsString.value.split("\n").map(line => `\t${line}`).join("\n");

	return `<form-wrapper v-model="formData" @submit="createUser">
${indentedFormFields}

	<template #submit-button-label>
		Create user
	</template>
</form-wrapper>`;
});
</script>
