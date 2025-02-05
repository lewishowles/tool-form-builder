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
});
