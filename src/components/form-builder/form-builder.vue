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
							{{ TOKEN_NAME }}
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
							{{ TOKEN_TYPE }}
						</template>

						<div class="flex flex-col gap-2">
							<p>
								The type of field, one of:
							</p>

							<dl class="grid grid-cols-[5em_1fr]">
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_TEXT }}
									</pill-badge>
								</dt>
								<dd>input</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_TEXTAREA }}
									</pill-badge>
								</dt>
								<dd>textarea</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_SELECT }}
									</pill-badge>
								</dt>
								<dd>select</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_CHECKBOX }}
									</pill-badge>
								</dt>
								<dd>checkbox</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_RADIO_GROUP }}
									</pill-badge>
								</dt>
								<dd>radio group</dd>
								<dt>
									<pill-badge colour="purple" class="font-mono">
										{{ TOKEN_TYPE }}{{ INPUT_BUTTON_GROUP }}
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
							{{ TOKEN_HELP }}
						</template>

						<p>Any help text to provide for the current field.</p>
					</form-builder-shortcut>

					<form-builder-shortcut v-bind="{ colour: 'grey' }">
						<template #title>
							Placeholder
						</template>

						<template #shortcut>
							{{ TOKEN_PLACEHOLDER }}
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
							{{ TOKEN_PREFIX }}
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
							{{ TOKEN_SUFFIX }}
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
							{{ TOKEN_ID }}
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
import { computed, ref } from "vue";
import { isNonEmptyString } from "@lewishowles/helpers/string";
import { useClipboard } from "@vueuse/core";

import FormBuilderShortcut from "./fragments/form-builder-shortcut.vue";

const { copy, copied, isSupported } = useClipboard();

// Our original code, provided by the user. This is what we are converting.
const userInput = ref("Your name?Your name will only be used to identify your account");

// Our available tokens.
const TOKEN_TYPE = "/";
const TOKEN_NAME = "@";
const TOKEN_HELP = "?";
const TOKEN_PLACEHOLDER = "|";
const TOKEN_PREFIX = "<";
const TOKEN_SUFFIX = ">";
const TOKEN_ID = "#";
const TOKEN_OPTIONS = "[";

// Our conversion table from token to configuration attribute.
const tokenMap = {
	[TOKEN_TYPE]: "type",
	[TOKEN_NAME]: "name",
	[TOKEN_HELP]: "help",
	[TOKEN_PLACEHOLDER]: "placeholder",
	[TOKEN_PREFIX]: "prefix",
	[TOKEN_SUFFIX]: "suffix",
	[TOKEN_ID]: "id",
	[TOKEN_OPTIONS]: "options",
};

// Our available input tokens.
const INPUT_TEXT = "i";
const INPUT_TEXTAREA = "ta";
const INPUT_SELECT = "s";
const INPUT_CHECKBOX = "cb";
const INPUT_RADIO_GROUP = "rbg";
const INPUT_BUTTON_GROUP = "bg";

// Our conversion table from input token to form-field input type.
const inputMap = {
	[INPUT_TEXT]: "text",
	[INPUT_TEXTAREA]: "textarea",
	[INPUT_SELECT]: "select",
	[INPUT_CHECKBOX]: "checkbox",
	[INPUT_RADIO_GROUP]: "radio-group",
	[INPUT_BUTTON_GROUP]: "button-group",
};

// TODO: Differentiate prefix and prefix icon etc

// Our RegEx tokens, based on our shortcuts.
const tokenList = Object.keys(tokenMap).map(token => `\\${token}`).join("|");
const tokenRegex = new RegExp(`(${tokenList})`, "g");

// A programmatic conversion of the user's input into a re-usable configuration,
// which we can use to build our form code.
const formConfiguration = computed(() => {
	if (!isNonEmptyString(userInput.value)) {
		return "";
	}

	// Start by splitting our configuration, expecting one input per line.
	const configurationLines = userInput.value.split("\n");

	return configurationLines.map(line => {
		// This splits our line into a list of token, content, token, content,
		// etc.
		const parts = line.split(tokenRegex);

		let result = [{ attribute: "label", content: parts[0] }];

		for (let i = 1; i < parts.length; i++) {
			const attribute = tokenMap[parts[i]];

			let content = parts[i + 1];

			if (!isNonEmptyString(attribute)|| !isNonEmptyString(content)) {
				continue;
			}

			switch (attribute) {
				case "type":
					content = inputMap[content] || "text";

					break;
				// We treat options a little differently, allowing the user to
				// type them in a more familiar format, but splitting them as we
				// would other tokens.
				case "options":
					content = content.replace("]", "");

					break;
			}

			result.push({ attribute, content });

			// Skip the next match as it has been already used as content
			i++;
		}

		return result;
	});
});
</script>
