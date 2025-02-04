import { createMount } from "@unit/support/mount";
import { describe, expect, test } from "vitest";
import FormBuilder from "./form-builder.vue";

const mount = createMount(FormBuilder, {});

describe("form-builder", () => {
	describe("Initialisation", () => {
		test("should exist as a Vue component", () => {
			const wrapper = mount();

			expect(wrapper.vm).toBeTypeOf("object");
		});
	});

	describe("Computed", () => {
		describe("formConfiguration", () => {
			test("should convert a single line of input into appropriate configuration", () => {
				const wrapper = mount();
				const vm = wrapper.vm;

				vm.userInput = "Your name/t?Your name will only be used to identify your account";

				expect(vm.formConfiguration).toEqual([
					[
						{
							attribute: "label",
							content: "Your name",
						},
						{
							attribute: "type",
							content: "text",
						},
						{
							attribute: "help",
							content: "Your name will only be used to identify your account",
						},
					],
				]);
			});

			test("should convert multiple lines of input into appropriate configuration", () => {
				const wrapper = mount();
				const vm = wrapper.vm;

				vm.userInput = "Your name?Your name will only be used to identify your account\nAbout you/ta";

				expect(vm.formConfiguration).toEqual([
					[
						{
							attribute: "label",
							content: "Your name",
						},
						{
							attribute: "help",
							content: "Your name will only be used to identify your account",
						},
					],
					[
						{
							attribute: "label",
							content: "About you",
						},
						{
							attribute: "type",
							content: "textarea",
						},
					],
				]);
			});

			describe("should recognise each attribute token", () => {
				test.for([
					["name", "@"],
					["help", "?"],
					["placeholder", "|"],
					["prefix", "<"],
					["suffix", ">"],
					["id", "#"],
					["options", "["],
				])("%s", ([attribute, token]) => {
					const wrapper = mount();
					const vm = wrapper.vm;

					vm.userInput = `Field label${token}content`;

					expect(vm.formConfiguration).toEqual([
						[
							{
								attribute: "label",
								content: "Field label",
							},
							{
								attribute,
								content: "content",
							},
						],
					]);
				});
			});

			describe("should recognise each input type", () => {
				test.for([
					["text", "i"],
					["textarea", "ta"],
					["select", "s"],
					["checkbox", "cb"],
					["radio-group", "rbg"],
					["button-group", "bg"],
				])("%s", ([type, typeToken]) => {
					const wrapper = mount();
					const vm = wrapper.vm;

					vm.userInput = `Field label/${typeToken}`;

					expect(vm.formConfiguration).toEqual([
						[
							{
								attribute: "label",
								content: "Field label",
							},
							{
								attribute: "type",
								content: type,
							},
						],
					]);
				});
			});
		});
	});
});
