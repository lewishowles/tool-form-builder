# Form builder

Form builder is a tool to quickly generate the code for forms using shorthand notation.

A single field can be as simple as `Your name@your_name`.

## Shortcut guide

Each field starts with the field's label, followed by one or more configuration options.

### `@` Name (required)

The name of the field, which is used to retrieve data from the form's model. This is required as the output form will use `form-wrapper`.

### `/` Field type

The type of field, one of:

- `/i`: input
- `/ta`: textarea
- `/s`: select
- `/cb`: checkbox
- `/rbg`: radio group
- `/bg`: button group

If no type is defined, we default to a text input for ease.

### `?` Help

Any help text to provide for the current field.

### `|` Placeholder

A placeholder value to use in this field. Note that placeholders only work with `text` and `textarea` fields, and should not be used to convey meaning or help.

### `<` Prefix

A prefix to apply to this field. Note that this only applies to `text` fields.

If the prefix begins with `icon`, this is assumed to be a prefix icon.

### `>` Suffix

A suffix to apply to this field. Note that this only applies to `text` fields.

If the suffix begins with `icon`, this is assumed to be a prefix icon.

### `#` ID

Used if you would like a defined ID for the field, rather than a randomly generated one.

[View the live site](https://lewishowles.github.io/form-builder/)
