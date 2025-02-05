import { computed, ref } from "vue";

import { isNonEmptyString } from "@lewishowles/helpers/string";

// Our available tokens.
const tokens = {
	TYPE: "/",
	NAME: "@",
	HELP: "?",
	PLACEHOLDER: "|",
	PREFIX: "<",
	SUFFIX: ">",
	ID: "#",
	OPTIONS: "[",
};

// Our conversion table from token to configuration attribute.
const tokenMap = {
	[tokens.TYPE]: "type",
	[tokens.NAME]: "name",
	[tokens.HELP]: "help",
	[tokens.PLACEHOLDER]: "placeholder",
	[tokens.PREFIX]: "prefix",
	[tokens.SUFFIX]: "suffix",
	[tokens.ID]: "id",
	[tokens.OPTIONS]: "options",
};

// Our available input tokens.
const inputTokens = {
	TEXT: "i",
	TEXTAREA: "ta",
	SELECT: "s",
	CHECKBOX: "cb",
	RADIO_GROUP: "rbg",
	BUTTON_GROUP: "bg",
};

// Our conversion table from input token to form-field input type.
const inputMap = {
	[inputTokens.TEXT]: "text",
	[inputTokens.TEXTAREA]: "textarea",
	[inputTokens.SELECT]: "select",
	[inputTokens.CHECKBOX]: "checkbox",
	[inputTokens.RADIO_GROUP]: "radio-group",
	[inputTokens.BUTTON_GROUP]: "button-group",
};

// Our RegEx tokens, based on our shortcuts.
const tokenList = Object.keys(tokenMap).map(token => `\\${token}`).join("|");
const tokenRegex = new RegExp(`(${tokenList})`, "g");

/**
 * Encapsulate the functionality to convert user input to a standardised
 * configuration.
 *
 * @param  {string}  input
 *     The user's form input, to convert into a standardised configuration.
 */
export default function useConfiguration(input) {
	const userInput = ref(input);

	// A programmatic conversion of the user's input into a re-usable
	// configuration, which we can use to build our form code.
	const formConfiguration = computed(() => {
		if (!isNonEmptyString(userInput.value)) {
			return "";
		}

		// Start by splitting our configuration, expecting one input per line.
		const configurationLines = userInput.value.split("\n");

		return configurationLines.map(line => {
			// This splits our line into a list of [token, content, token,
			// content], etc.
			const parts = line.split(tokenRegex);

			let result = [{ attribute: "label", content: parts[0] }];

			for (let i = 1; i < parts.length; i += 2) {
				let attribute = tokenMap[parts[i]];
				let content = parts[i + 1];

				if (!isNonEmptyString(attribute)|| !isNonEmptyString(content)) {
					continue;
				}

				switch (attribute) {
					case "type":
						content = inputMap[content] || "text";

						break;
					// We treat options a little differently, allowing the user
					// to type them in a more familiar format, but splitting
					// them as we would other tokens.
					case "options":
						content = content.replace("]", "");

						break;
					// For a prefix and suffix, if the content starts with
					// `icon-`, switch the attribute to the icon variant.
					case "prefix":
					case "suffix":
						if (content.startsWith("icon-")) {
							attribute = `${attribute}-icon`;
						}

						break;
				}

				result.push({ attribute, content });
			}

			// So that we don't need ot make any assumptions going forward, if
			// we cannot find a type, add our default.
			const hasTypeAttribute = result.some(item => item.attribute === "type");

			if (!hasTypeAttribute) {
				result.push({ attribute: "type", content: "text" });
			}

			return result;
		});
	});

	return {
		formConfiguration,
		tokens,
		inputTokens,
	};
}
