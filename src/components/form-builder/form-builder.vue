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

					<form-builder-shortcut v-bind="{ colour: 'green' }">
						<template #title>
							Options
						</template>

						<template #shortcut>
							[]
						</template>

						<div class="flex flex-col gap-2">
							<p>Options for the current field, which can take two forms. Note that this only applies to <code>select</code>, <code>checkbox group</code>, or <code>radio</code> fields.</p>

							<p>Options can take two forms:</p>

							<dl>
								<dt class="font-bold">
									Simple
								</dt>
								<dd class="mb-4">
									<p class="mb-2">
										Where labels and values are the same.
									</p>
									<span class="text-green-600 font-mono">
										[value one,value two]
									</span>
								</dd>
								<dt class="font-bold">
									Complete
								</dt>
								<dd>
									<p class="mb-2">
										Where labels and values are defined separately.
									</p>
									<span class="text-green-600 font-mono">
										[Label one=value one,Label two=value two]
									</span>
								</dd>
							</dl>
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

		<ui-button v-if="isSupported" class="button--muted relative mb-8" @click="copy(form)">
			<span :class="{ 'invisible': copied }">
				Copy form code
			</span>

			<span v-show="copied" class="button-padding-y animate-fade-in-up absolute inset-0 text-center" v-bind="{ 'aria-hidden': copied ? null : true }">
				Copied
			</span>
		</ui-button>

		<pre class="text-sm">{{ formConfiguration }}</pre>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";

import FormBuilderShortcut from "./fragments/form-builder-shortcut.vue";
import useConfiguration from "./composables/use-configuration";

const { copy, copied, isSupported } = useClipboard();

// Our original code, provided by the user. This is what we are converting.
const userInput = ref("Your name?Your name will only be used to identify your account");

const { tokens, inputTokens, formConfiguration } = useConfiguration(userInput);
</script>
