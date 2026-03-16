# SauceDemo Test Cases

## Scope

These test cases cover the main [SauceDemo](https://www.saucedemo.com/) web UI flows and can be used for either manual testing or automation planning.

## Environment

- URL: `https://www.saucedemo.com/`
- Browser: Chromium (latest)
- Test user (valid): `standard_user`
- Password: `secret_sauce`

## Legend

- Priority: `P0` (critical), `P1` (high), `P2` (medium)
- Type: `Happy Path`, `Negative`, `Regression`

## How to Read This

Think of this as a practical QA checklist. Start with the `P0` happy paths to confirm the app is usable, then move into negative and regression coverage.

## Login

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-LOGIN-001 | Login with valid credentials | Happy Path | P0 | User is on login page | 1. Enter `standard_user` 2. Enter `secret_sauce` 3. Click **Login** | User is redirected to `inventory.html` and sees `Products` title |
| SD-LOGIN-002 | Login with invalid password | Negative | P0 | User is on login page | 1. Enter `standard_user` 2. Enter invalid password 3. Click **Login** | Error message appears: username and password do not match |
| SD-LOGIN-003 | Login with locked out user | Negative | P1 | User is on login page | 1. Enter `locked_out_user` 2. Enter `secret_sauce` 3. Click **Login** | Error message indicates user is locked out |
| SD-LOGIN-004 | Login with empty username | Negative | P1 | User is on login page | 1. Leave username blank 2. Enter password 3. Click **Login** | Error message indicates username is required |
| SD-LOGIN-005 | Login with empty password | Negative | P1 | User is on login page | 1. Enter username 2. Leave password blank 3. Click **Login** | Error message indicates password is required |

## Product Inventory

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-INV-001 | Inventory page loads after login | Happy Path | P0 | User logged in | Open inventory page | Product list is visible |
| SD-INV-002 | Sort products by price low to high | Regression | P1 | User logged in on inventory page | Select sort `Price (low to high)` | Products are sorted ascending by price |
| SD-INV-003 | Sort products by name Z to A | Regression | P1 | User logged in on inventory page | Select sort `Name (Z to A)` | Products are sorted descending alphabetically |

## Product Page

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-PDP-001 | Open product detail page from inventory | Happy Path | P0 | User logged in on inventory page | 1. Click a product name or image | Product detail page opens with product name, description, price, and image |
| SD-PDP-002 | Product detail content matches inventory item | Regression | P1 | User logged in on inventory page | 1. Capture product name and price in inventory 2. Open that product detail page | Name and price in detail page match inventory values |
| SD-PDP-003 | Add to cart from product detail page | Happy Path | P0 | User logged in and on product detail page | 1. Click **Add to cart** 2. Open cart | Cart badge updates and selected product is present in cart |
| SD-PDP-004 | Remove from cart from product detail page | Regression | P1 | Product already added from detail page | 1. Click **Remove** | Cart badge decrements or disappears |
| SD-PDP-005 | Back to Products button returns to inventory | Regression | P2 | User on product detail page | 1. Click **Back to products** | User is navigated to `inventory.html` |

## Cart

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-CART-001 | Add one item to cart | Happy Path | P0 | User logged in on inventory page | 1. Click **Add to cart** on one product 2. Open cart | Cart badge shows `1`; selected product appears in cart |
| SD-CART-002 | Remove item from cart on inventory page | Regression | P1 | One item added in inventory page | Click **Remove** | Cart badge decrements or disappears |
| SD-CART-003 | Remove item from cart page | Regression | P1 | One item added and cart opened | Click **Remove** in cart | Item no longer appears in cart |

## Checkout

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-CHK-001 | Complete checkout with valid information | Happy Path | P0 | User has at least one item in cart | 1. Open cart 2. Click **Checkout** 3. Fill First/Last/Postal Code 4. Continue 5. Finish | Confirmation page appears with success message |
| SD-CHK-002 | Continue checkout with missing first name | Negative | P1 | User is at checkout info page | Leave First Name empty and click **Continue** | Validation error is displayed |
| SD-CHK-003 | Continue checkout with missing postal code | Negative | P1 | User is at checkout info page | Leave Postal Code empty and click **Continue** | Validation error is displayed |
| SD-CHK-004 | Cancel from checkout information page | Regression | P2 | User is at checkout info page | Click **Cancel** | User returns to cart page |

## Navigation and Session

| ID | Test Case | Type | Priority | Preconditions | Steps | Expected Result |
|---|---|---|---|---|---|---|
| SD-NAV-001 | Logout from side menu | Happy Path | P1 | User logged in | 1. Open menu 2. Click **Logout** | User returns to login page |
| SD-NAV-002 | Open cart from inventory header | Regression | P2 | User logged in | Click cart icon | Cart page opens |
| SD-NAV-003 | Back to products from cart | Regression | P2 | User on cart page | Click **Continue Shopping** | Inventory page opens |

## Suggested Automation Order

1. SD-LOGIN-001
2. SD-INV-001
3. SD-PDP-001
4. SD-CART-001
5. SD-CHK-001
6. SD-NAV-001
7. Add the negative and regression cases after the core user journey is stable

## Notes

- Keep selectors stable (`#user-name`, `#password`, `#login-button`, `.title`).
- Start with `P0` cases if you are building a quick smoke pack.
- Converting one case into one test or spec is usually the easiest way to keep reporting traceable.
