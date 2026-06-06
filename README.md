# Ahtsham-QA — Playwright Automation Suite
> End-to-end test automation for SauceDemo using Playwright, GitHub Copilot (MCP), and GitHub Actions CI/CD

![Playwright](https://img.shields.io/badge/Playwright-latest-green)
![Copilot](https://img.shields.io/badge/GitHub%20Copilot-MCP-blue)
![CI](https://github.com/Ahtsham-QA/Ahtsham-QA/actions/workflows/playwright.yml/badge.svg)
---

## 📌 Project Overview

This project demonstrates a modern QA automation workflow combining **Playwright** with **AI-assisted development via GitHub Copilot MCP**. It covers a full e-commerce user journey on [SauceDemo](https://www.saucedemo.com) — from login through checkout — with assertions validating each critical step.

Built as part of an upskilling initiative to migrate from Selenium to Playwright and integrate AI tools into real QA workflows.

---

## 🧪 What's Being Tested

| # | Test Flow | Description |
|---|-----------|-------------|
| 1 | **Login** | Authenticate with valid credentials |
| 2 | **Add to Cart** | Add product(s) to shopping cart |
| 3 | **Remove from Cart** | Remove product(s) and validate cart update |
| 4 | **Checkout** | Complete checkout flow with user details |
| 5 | **Order Confirmation** | Assert successful order completion message |

---

## 🤖 How GitHub Copilot Was Used

This project was built with **GitHub Copilot MCP** as an active co-pilot throughout:

- **Test generation** — Copilot suggested Playwright locators, actions, and assertions from plain comments
- **Debugging** — Copilot identified root cause of Chrome browser configuration issue in GitHub Actions YAML
- **Git workflow** — Copilot assisted with commit messages and push commands
- **YAML fix** — Resolved cross-browser compatibility by updating the CI config from Chrome-only to all browsers

> 💡 *Key insight: Copilot accelerates boilerplate and suggests patterns, but QA judgment is still required to validate what it generates — especially for assertions and edge cases.*

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Test automation framework |
| JavaScript | Test language |
| GitHub Copilot MCP | AI-assisted test writing & debugging |
| GitHub Actions | CI/CD pipeline |
| SauceDemo | Target application under test |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git git clone https://github.com/Ahtsham-QA/Ahtsham-QA.git
cd Ahtsham-QA
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run with UI mode (great for debugging)
npx playwright test --ui

# Run a specific spec file
npx playwright test tests/cart.spec.js
```

### View Test Report

```bash
npx playwright show-report
```

---

## 📁 Project Structure

```
├── tests/
│   ├── login.spec.js        # Login validation tests
│   ├── cart.spec.js         # Cart management tests
│   ├── checkout.spec.js     # Checkout flow tests
│   └── visual.spec.js       # Percy visual regression tests
├── playwright.config.js
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

---

## ⚙️ CI/CD Pipeline

Tests run automatically on every push via **GitHub Actions**.

### Pipeline Fix — Chrome to All Browsers
Initial YAML was configured for Chrome only. Fixed the config to run across all Playwright browsers (Chromium, Firefox, WebKit) for broader coverage.

✅ Pipeline is currently **green** across all browsers.

---

## 👤 Author

**Ahtsham** — QA Automation Lead | AI-Assisted Testing | Playwright & Selenium | CSM  
[LinkedIn](https://linkedin.com/in/ahtshamijaz1984/) · [GitHub](https://github.com/Ahtsham-QA)

---

## 📄 License

MIT
