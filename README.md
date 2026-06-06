# Playwright QA Automation Framework — SauceDemo

A production-grade test automation framework built with **Playwright** and the **Page Object Model (POM)** pattern, covering the full e-commerce flow on [SauceDemo](https://www.saucedemo.com). Tests run across **3 browsers** with **CI/CD via GitHub Actions** and **visual regression via Percy**.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Cross-browser test automation |
| Page Object Model | Maintainable, scalable test architecture |
| GitHub Actions | CI/CD pipeline — runs on every push |
| Percy | Visual regression testing |
| GitHub Copilot | AI-assisted test generation |
| Node.js | Runtime environment |

---

## 📁 Project Structure

```
playwright-qa-project/
├── pages/
│   ├── LoginPage.js          # Login page actions & locators
│   ├── InventoryPage.js      # Products page actions & locators
│   ├── CartPage.js           # Cart page actions & locators
│   └── CheckoutPage.js       # Checkout page actions & locators
├── tests/
│   ├── login.spec.js         # Login validation tests (9 tests)
│   ├── inventory.spec.js     # Product listing & sort tests (18 tests)
│   ├── cart.spec.js          # Cart management tests (9 tests)
│   ├── checkout.spec.js      # Checkout flow & validation tests (12 tests)
│   └── visual.spec.js        # Percy visual regression tests
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions pipeline
├── playwright.config.js      # Multi-browser configuration
└── README.md
```

---

## ✅ Test Coverage

| Spec File | Tests | Coverage |
|---|---|---|
| login.spec.js | 9 | Valid login, invalid credentials, empty fields |
| inventory.spec.js | 18 | Page load, product count, sort, cart badge, logout |
| cart.spec.js | 9 | Add single item, add multiple items, remove & checkout |
| checkout.spec.js | 12 | Happy path, missing first/last name, missing postal code |
| **Total** | **48+** | **Full e-commerce flow** |

All tests run across **Chromium, Firefox and WebKit (Safari)**.

---

## ⚙️ CI/CD Pipeline

Tests run automatically on every push via **GitHub Actions**.

- ✅ Runs on: `push` and `pull_request` to `main`
- ✅ Browsers: Chromium, Firefox, WebKit
- ✅ HTML report uploaded as artifact on failure
- ✅ Pipeline currently **green** across all browsers

---

## 🏗️ Page Object Model Design

Each page class encapsulates:
- **Locators** — all selectors defined in the constructor
- **Actions** — reusable methods for user interactions
- **No assertions** — assertions stay in spec files for separation of concerns

Example:
```js
// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

## 🛠️ Setup & Installation

```bash
# Clone the repo
git clone https://github.com/Ahtsham-QA/Ahtsham-QA.git
cd playwright-qa-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run all tests headed (visible browser)
npx playwright test --headed

# Run specific spec file
npx playwright test tests/login.spec.js

# Run on specific browser
npx playwright test --project=chromium

# View HTML report
npx playwright show-report
```

---

## 👤 Author

**Ahtsham** — QA Automation Lead | AI-Assisted Testing | Playwright & Selenium | CSM  
[LinkedIn](https://linkedin.com/in/ahtshamijaz1984/) · [GitHub](https://github.com/Ahtsham-QA)

---

## 📄 License

MIT
