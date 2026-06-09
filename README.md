# Playwright QA Automation Framework — SauceDemo

A production-grade test automation framework built with **Playwright** and the **Page Object Model (POM)** pattern, covering the full e-commerce flow on [SauceDemo](https://www.saucedemo.com). Tests run across **3 browsers** with **CI/CD via GitHub Actions**, **visual regression via Percy**, and **AI-assisted bug logging via Jira MCP integration**.

![Playwright](https://img.shields.io/badge/Playwright-latest-green)
![CI](https://img.shields.io/badge/CI-passing-brightgreen)
![Tests](https://img.shields.io/badge/Tests-69%20passed-brightgreen)
![Copilot](https://img.shields.io/badge/GitHub%20Copilot-MCP-blue)
![Jira](https://img.shields.io/badge/Jira-MCP%20Integrated-blue)

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Cross-browser test automation |
| Page Object Model | Maintainable, scalable test architecture |
| GitHub Actions | CI/CD pipeline — runs on every push |
| Percy | Visual regression testing (in progress) |
| GitHub Copilot MCP | AI-assisted test generation & debugging |
| Jira MCP | AI-triggered automatic bug logging with screenshot evidence |
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
| visual.spec.js | — | Percy visual regression (in progress) |
| **Total** | **69 passed** | **Full e-commerce flow** |

All tests run across **Chromium, Firefox and WebKit (Safari)**.

---

## 🤖 AI-Assisted Workflow

This framework was built using a modern AI-assisted QA workflow — not just written manually line by line.

### GitHub Copilot MCP
- Generated POM class scaffolding from plain comments
- Suggested locators, assertions, and test data
- Assisted with CI/CD YAML configuration and debugging
- Helped with git commits and pipeline fixes

### Jira MCP Integration ⭐
The most advanced feature of this framework — **automatic AI-triggered bug logging into Jira.**

**How it works:**
1. A test failure or bug is identified during exploration
2. GitHub Copilot Agent Mode (MCP) is prompted with the bug details
3. Copilot automatically creates a Jira ticket with:
   - Bug title and description
   - Steps to reproduce
   - Screenshot evidence attached
   - Severity and priority set
4. Ticket appears instantly in Jira backlog — zero manual effort

> 💡 *This demonstrates how AI tooling can eliminate the manual overhead of bug logging — one of the most time-consuming parts of a QA engineer's workflow.*

---

## ⚙️ CI/CD Pipeline

Tests run automatically on every push via **GitHub Actions**.

- ✅ Runs on: `push` and `pull_request` to `main`
- ✅ Browsers: Chromium, Firefox, WebKit
- ✅ 10 successful pipeline runs and counting
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

## 📈 Framework Evolution

This framework was built iteratively — not from a tutorial:

| Stage | What Was Built |
|-------|---------------|
| Week 1 | Basic cart.spec.js — login, add/remove, checkout |
| Week 2 | POM refactor — LoginPage, InventoryPage, CartPage, CheckoutPage |
| Week 3 | CI/CD pipeline — GitHub Actions green across 3 browsers |
| Week 4 | Jira MCP integration — AI-triggered bug logging with screenshots |
| In Progress | Percy visual regression testing |

---

## 🛠️ Setup & Installation

```bash
# Clone the repo
git clone https://github.com/Ahtsham-QA/Ahtsham-QA.git
cd Ahtsham-QA

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

**Ahtsham** — QA Automation Lead & Consultant | AI-Assisted Testing | Playwright | CSM

[LinkedIn](https://linkedin.com/in/ahtshamijaz1984/) · [GitHub](https://github.com/Ahtsham-QA)

---

## 📄 License

MIT
