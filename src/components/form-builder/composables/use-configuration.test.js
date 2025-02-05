import { describe, expect, test } from "vitest";
import useConfiguration from "./use-configuration";

describe("useConfiguration", () => {
	describe("Computed", () => {
		describe("formConfiguration", () => {
			test("should convert a single line of input into appropriate configuration", () => {
				const { formConfiguration } = useConfiguration("Your name/t?Your name will only be used to identify your account");

				expect(formConfiguration.value).toEqual([
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

			test("should add a default type", () => {
				const { formConfiguration } = useConfiguration("Your name");

				expect(formConfiguration.value).toEqual([
					[
						{
							attribute: "label",
							content: "Your name",
						},
						{
							attribute: "type",
							content: "text",
						},
					],
				]);
			});

			test("should convert multiple lines of input into appropriate configuration", () => {
				const { formConfiguration } = useConfiguration("Your name/t?Your name will only be used to identify your account\nAbout you/ta");

				expect(formConfiguration.value).toEqual([
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
					const { formConfiguration } = useConfiguration(`Field label/t${token}content`);

					expect(formConfiguration.value).toEqual([
						[
							{
								attribute: "label",
								content: "Field label",
							},
							{
								attribute: "type",
								content: "text",
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
					const { formConfiguration } = useConfiguration(`Field label/${typeToken}`);

					expect(formConfiguration.value).toEqual([
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
