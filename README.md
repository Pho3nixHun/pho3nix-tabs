# pho3nix-tabs
Simple tabbed container.

## Attributes
- tabLocation: `string`
  - Location of tab buttons (`a`) within the container.
  - Possible values: `top` | `bottom` | `left` | `right`
  - Default value: `top`
- selected: `number`
  - The selected tab (0 based)

## Example

```HTML
    <pho3nix-tabs tabLocation="bottom" selected="0">
        <a for="tab1"> Tab 1 </a>
        <a for="tab2"> Tab 2 </a>
        <a for="tab3"> Tab 3 </a>
        <section name="tab1">This is Tab 1</section>
        <section name="tab2">This is Tab 2</section>
        <section name="tab3">This is Tab 3</section>
    </pho3nix-tabs>
```

Build it and see index.html for more elaborate example.

## Notes

Don't use yarn install, build npm command does not work that way.