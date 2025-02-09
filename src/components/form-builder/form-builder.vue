<template>
	<div>
		<form-textarea v-model="userInput" class="mb-8 text-sm" v-bind="{ inputAttributes: { class: 'font-mono' } }">
			Form configuration

			<template #help>
				Enter one input per line
			</template>
		</form-textarea>

		<summary-details class="mb-8">
			<template #summary>
				Show shortcut guide
			</template>

			<div class="rounded border border-grey-100 bg-grey-50 px-4 py-3">
				<h2 class="font-bold mb-2">
					Shortcut guide
				</h2>

				<p class="mb-4">
					Each field starts with the field's label, followed by one or more configuration options.
				</p>

				<div class="space-y-4 divide-y divide-grey-200">
					<form-builder-shortcut v-bind="{ colour: 'indigo', required: true }">
						<template #title>
							Name
						</template>

						<template #shortcut>
							{{ tokens.NAME }}
						</template>

						<p>
							The name of the field, which is used to retrieve data from the form's model. This is required as the output form will use <code>`form-wrapper`</code>.
						</p>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'purple' }">
						<template #title>
							Field type
						</template>

						<template #shortcut>
							{{ tokens.TYPE }}
						</template>

						<div class="flex flex-col gap-2">
							<p>
								The type of field, one of:
							</p>

							<dl class="grid grid-cols-[5em_1fr]">
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.TEXT }}
									</pill-badge>
								</dt>
								<dd>input</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.TEXTAREA }}
									</pill-badge>
								</dt>
								<dd>textarea</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.SELECT }}
									</pill-badge>
								</dt>
								<dd>select</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.CHECKBOX }}
									</pill-badge>
								</dt>
								<dd>checkbox</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.RADIO_GROUP }}
									</pill-badge>
								</dt>
								<dd>radio group</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ tokens.TYPE }}{{ inputTokens.BUTTON_GROUP }}
									</pill-badge>
								</dt>
								<dd>button group</dd>
							</dl>

							<p>If no type is defined, we default to a text input for ease.</p>
						</div>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'blue' }">
						<template #title>
							Help
						</template>

						<template #shortcut>
							{{ tokens.HELP }}
						</template>

						<p>Any help text to provide for the current field.</p>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'grey' }">
						<template #title>
							Placeholder
						</template>

						<template #shortcut>
							{{ tokens.PLACEHOLDER }}
						</template>

						<p>
							A placeholder value to use in this field. Note that placeholders only work with <code>text</code> and <code>textarea</code> fields, and should not be used to convey meaning or help.
						</p>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'orange' }">
						<template #title>
							Prefix
						</template>

						<template #shortcut>
							{{ tokens.PREFIX }}
						</template>

						<div class="flex flex-col gap-2">
							<p>
								A prefix to apply to this field. Note that this only applies to <code>text</code> fields.
							</p>

							<p>If the prefix begins with <code>`icon`</code>, this is assumed to be a prefix icon.</p>
						</div>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'orange' }">
						<template #title>
							Suffix
						</template>

						<template #shortcut>
							{{ tokens.SUFFIX }}
						</template>

						<div class="flex flex-col gap-2">
							<p>
								A suffix to apply to this field. Note that this only applies to <code>text</code> fields.
							</p>

							<p>If the suffix begins with <code>`icon`</code>, this is assumed to be a prefix icon.</p>
						</div>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'pink' }">
						<template #title>
							ID
						</template>

						<template #shortcut>
							{{ tokens.ID }}
						</template>

						<p>
							Used if you would like a defined ID for the field, rather than a randomly generated one.
						</p>
					</form-builder-shortcut>
				</div>
			</div>
		</summary-details>

		<ui-button v-if="isSupported" class="button--muted relative mb-8" @click="copy(formString)">
			<span :class="{ 'invisible': copied }">
				Copy form code
			</span>

			<span v-show="copied" class="button-padding-y animate-fade-in-up absolute inset-0 text-center" v-bind="{ 'aria-hidden': copied ? null : true }">
				Copied
			</span>
		</ui-button>

		<pre class="text-sm">{{ formString }}</pre>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { isNonEmptyString } from "@lewishowles/helpers/string";
import { useClipboard } from "@vueuse/core";

import FormBuilderShortcut from "./fragments/form-builder-shortcut.vue";
import useConfiguration from "./composables/use-configuration";
import useTemplateGenerator from "./composables/use-template-generator";

const { copy, copied, isSupported } = useClipboard();

// Our original code, provided by the user. This is what we are converting.
const userInput = ref("Your name?Your name will only be used to identify your account");

// Convert our user input into a standardised configuration, which we will use
// to generate our code.
const { tokens, inputTokens, formConfiguration } = useConfiguration(userInput);

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

	return `<form-wrapper v-model="" @submit="">
${indentedFormFields}

	<template #submit-button-label>
		Your submit button
	</template>
</form-wrapper>`;
});
</script>
