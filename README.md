# example-tests

An example Playwright suite used to demo and exercise **[PlayRun](https://github.com/PlayRunTests/playrun)**.

It shows how PlayRun groups a real test repo:

- **Folders → areas.** Each top-level folder under `tests/` becomes an area in
  the flow-maker palette.
- **Folders matching Main Tags → domains.** `auth/`, `checkout/`, `search/`,
  `account/` line up with PlayRun's configured Main Tags, so tests are grouped
  by product domain.
- **Inline tags → filters.** Every added test carries a domain tag
  (`@auth`, `@checkout`, `@search`, `@account`) and a type tag
  (`@smoke`, `@regression`, `@sanity`) via Playwright's `{ tag: [...] }` option.

## Layout

```
tests/
  auth/            login / logout / invalid password      @auth
  checkout/        add / fulfil / remove cart items        @checkout
  account/         preference filters + clear              @account
  search/          docs site load + navigation            @search
  api-mocking/     ┐ upstream Playwright examples, kept
  clock/           ┘ as extra ungrouped "areas"
```

Tests run against stable public apps (`demo.playwright.dev`, `playwright.dev`,
`the-internet.herokuapp.com`) so they need no local server.

```bash
npm install
npx playwright install
npx playwright test                 # all
npx playwright test --grep @smoke   # by tag
```

## Credits

The `api-mocking` and `clock` examples are derived from
[microsoft/playwright-examples](https://github.com/microsoft/playwright-examples)
(MIT). See `LICENSE`. (The upstream `boxed-steps` examples were dropped — their
target site, `cloudtesting.contosotraders.com`, no longer resolves.)
