import { describe, expect, test } from "vitest";
import useConfiguration from "./use-configuration";

describe("useConfiguration", () => {
	describe("Computed", () => {
		describe("formConfiguration", () => {
			test("should convert a single line of input into appropriate configuration", () => {
				const { formConfiguration } = useConfiguration("Your name/t?Your name will only be used to identify your account");

				expect(formConfiguration.value).toEqual([
					{
						label: "Your name",
						type: "text",
						help: "Your name will only be used to identify your account",
					},
				]);
			});

			test("should add a default type", () => {
				const { formConfiguration } = useConfiguration("Your name");

				expect(formConfiguration.value).toEqual([
					{
						label: "Your name",
						type: "text",
					},
				]);
			});

			test("should convert multiple lines of input into appropriate configuration", () => {
				const { formConfiguration } = useConfiguration("Your name/t?Your name will only be used to identify your account\nAbout you/ta");

				expect(formConfiguration.value).toEqual([
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
						{
							label: "Field label",
							type: "text",
							[attribute]: "content",
						},
					]);
				});
			});

			test("should recognise a prefix icon", () => {
				const { formConfiguration } = useConfiguration("Field label/t<icon-user");

				expect(formConfiguration.value).toEqual([
					{
						label: "Field label",
						type: "text",
						prefix_icon: "icon-user",
					},
				]);
			});

			test("should recognise a suffix icon", () => {
				const { formConfiguration } = useConfiguration("Field label/t>icon-user");

				expect(formConfiguration.value).toEqual([
					{
						label: "Field label",
						type: "text",
						suffix_icon: "icon-user",
					},
				]);
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
						{
							label: "Field label",
							type: type,
						},
					]);
				});
			});
		});
	});
});
