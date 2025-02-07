import { describe, expect, test } from "vitest";
import useTemplateGenerator from "./use-template-generator";

describe("useTemplateGenerator", () => {
	test("should convert a single field into an appropriate template", () => {
		const { formTemplate } = useTemplateGenerator([
			{
				label: "Your name",
				type: "text",
				help: "Your name will only be used to identify your account",
			},
		]);

		expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Your name

	<template #help>
		Your name will only be used to identify your account
	</template>
</form-field>`);
	});

	test("should convert multiple fields into an appropriate template", () => {
		const { formTemplate } = useTemplateGenerator([
			{
				label: "Your name",
				type: "text",
				help: "Your name will only be used to identify your account",
			},
			{
				label: "About you",
				type: "textarea",
			},
		]);

		expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Your name

	<template #help>
		Your name will only be used to identify your account
	</template>
</form-field>

<form-field v-bind="{ type: 'textarea' }">
	About you
</form-field>`);
	});

	describe("should recognise each attribute", () => {
		test("name", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					name: "field_name",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text', name: 'field_name' }">
	Field label
</form-field>`);
		});

		test("help", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					help: "Help content",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Field label

	<template #help>
		Help content
	</template>
</form-field>`);
		});

		test("placeholder", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					placeholder: "Field placeholder",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text', placeholder: 'Field placeholder' }">
	Field label
</form-field>`);
		});

		test("prefix", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					prefix: "Prefix content",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Field label

	<template #prefix>
		Prefix content
	</template>
</form-field>`);
		});

		test("prefix-icon", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					prefix_icon: "icon-prefix",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Field label

	<template #prefix>
		<icon-prefix />
	</template>
</form-field>`);
		});

		test("suffix", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					suffix: "Suffix content",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Field label

	<template #suffix>
		Suffix content
	</template>
</form-field>`);
		});

		test("suffix-icon", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					suffix_icon: "icon-suffix",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text' }">
	Field label

	<template #suffix>
		<icon-suffix />
	</template>
</form-field>`);
		});

		test("id", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "text",
					id: "field-id",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'text', id: 'field-id' }">
	Field label
</form-field>`);
		});
	});

	describe("should add options for field types that require them", () => {
		test("select", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "select",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'select', options }">
	Field label
</form-field>`);
		});

		test("radio-group", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "radio-group",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'radio-group', options }">
	Field label
</form-field>`);
		});

		test("button-group", () => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type: "button-group",
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: 'button-group', options }">
	Field label
</form-field>`);
		});
	});

	describe("should recognise standard input types", () => {
		test.for([
			["text"],
			["textarea"],
			["checkbox"],
		])("%s", ([type]) => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type,
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: '${type}' }">
	Field label
</form-field>`);
		});
	});

	describe("should recognise optioned input types", () => {
		test.for([
			["select"],
			["radio-group"],
			["button-group"],
		])("%s", ([type]) => {
			const { formTemplate } = useTemplateGenerator([
				{
					label: "Field label",
					type,
				},
			]);

			expect(formTemplate.value).toEqual(`<form-field v-bind="{ type: '${type}', options }">
	Field label
</form-field>`);
		});
	});
});
