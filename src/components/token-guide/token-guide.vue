<template>
	<summary-details>
		<template #summary>
			Show shortcut guide
		</template>

		<div class="rounded border border-grey-100 bg-grey-50 px-4 py-3 dark:bg-grey-950/20 dark:border-transparent">
			<h2 class="font-bold mb-2">
				Shortcut guide
			</h2>

			<p class="mb-4">
				Each field starts with the field's label, followed by one or more configuration options.
			</p>

			<div class="space-y-4 divide-y divide-grey-200">
				<token-shortcut v-bind="{ colour: 'indigo', required: true }">
					<template #title>
						Name
					</template>

					<template #shortcut>
						{{ tokens.NAME }}
					</template>

					<p>
						The name of the field, which is used to retrieve data from the form's model. This is required as the output form will use <code>`form-wrapper`</code>.
					</p>
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'purple' }">
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
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'blue' }">
					<template #title>
						Help
					</template>

					<template #shortcut>
						{{ tokens.HELP }}
					</template>

					<p>Any help text to provide for the current field.</p>
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'grey' }">
					<template #title>
						Placeholder
					</template>

					<template #shortcut>
						{{ tokens.PLACEHOLDER }}
					</template>

					<p>
						A placeholder value to use in this field. Note that placeholders only work with <code>text</code> and <code>textarea</code> fields, and should not be used to convey meaning or help.
					</p>
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'orange' }">
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
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'orange' }">
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
				</token-shortcut>

				<token-shortcut v-bind="{ colour: 'pink' }">
					<template #title>
						ID
					</template>

					<template #shortcut>
						{{ tokens.ID }}
					</template>

					<p>
						Used if you would like a defined ID for the field, rather than a randomly generated one.
					</p>
				</token-shortcut>
			</div>
		</div>
	</summary-details>
</template>

<script setup>
import TokenShortcut from "./fragments/token-shortcut.vue";

import useConfiguration from "@/components/form-builder/composables/use-configuration";

// Convert our user input into a standardised configuration, which we will use
// to generate our code.
const { tokens, inputTokens } = useConfiguration();
</script>
