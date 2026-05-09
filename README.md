# Ecommerce Automation Project

This repository contains automated end-to-end tests using [Playwright](https://playwright.dev/).

## 📌 Overview

Ecommerce Automation Project to verify Login, Cart and Checkout using Playwright + TypeScript 

## 🚀 Features

* Cross-browser testing (Chrome, Firefox, Safari)
* Headless and headed execution
* Parallel test execution
* Auto-waiting for elements
* Built-in screenshots and video recording on failure
* HTML test reports
* Allure test reports

---

## 📁 Project Structure



## ⚙️ Installation

### 1. Clone the repository

git clone https://github.com/kmsaddam/ecommerce-automation-test.git <br >
cd ecommerce-automation-test


### 2. Install dependencies

npm install

### 3. Install Playwright browsers

npm init playwright@latest

### 4. Install Allure 

npm install -D allure-playwright <br >
npm install -D allure-commandline



## ▶️ Running Tests

### Run all tests

npx playwright test

### Run tests in headed mode

npx playwright test --headed


### Run a specific file

npx playwright test tests/locked-out-user.spec.ts


## 📊 Viewing Reports

After execution, view the HTML report: <br >

npx playwright show-report <br >
npx allure generate allure-results --clean -o allure-report <br >
npx allure open allure-report <br >


## 🛠 Configuration

Playwright configuration is located in: <br >

playwright.config.ts <br >


You can configure: <br >

* Browsers
* Timeouts
* Base URL
* Retries
* Parallelism


## 📦 Tech Stack

* Playwright
* TypeScript / JavaScript
* Node.js
* npm


## 📸 Optional Features

* Trace viewer on failure
* Video recording
* Screenshots on failure









