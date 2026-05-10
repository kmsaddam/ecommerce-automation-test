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

ecommerce-automation-test/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .gitignore
├── allure-report/
│   ├── assets/
│   │   ├── favicon-BDLHVmV7.ico
│   │   └── index-CVsGnucd.js
│   ├── data/
│   │   ├── attachments/
│   │   │   ├── 116539de21778fea.txt
│   │   ├── categories.csv
│   │   ├── categories.json
│   │   ├── suites.csv
│   │   ├── suites.json
│   │   ├── test-cases/
│   │   │   ├── 11271371c0fbcb92.json
│   │   └── timeline.json
│   ├── export/
│   │   ├── influxDbData.txt
│   │   ├── mail.html
│   │   └── prometheusData.txt
│   ├── history/
│   │   ├── categories-trend.json
│   │   ├── duration-trend.json
│   │   ├── history-trend.json
│   │   ├── history.json
│   │   └── retry-trend.json
│   ├── index.html
│   └── widgets/
│       ├── categories-trend.json
│       ├── categories.json
│       ├── duration-trend.json
│       ├── duration.json
│       ├── environment.json
│       ├── executors.json
│       ├── history-trend.json
│       ├── launch.json
│       ├── retry-trend.json
│       ├── severity.json
│       ├── status-chart.json
│       ├── suites.json
│       └── summary.json
├── allure-results/
│   ├── 001b1fa2-5c36-4622-a0e1-5122a79c1525-attachment.png  
├── final_tests/
│   ├── q1.spec.ts
│   ├── q2.spec.ts
│   └── q3.spec.ts
├── Manual-Testing/
│   ├── Q1_TestCases.xlsx
│   ├── Q2_TestCases.xlsx
│   └── Q3_TestCases.xlsx
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── utils/
    ├── BaseUrl.js
    ├── checkout.ts
    ├── logout.ts
    └── resetAppState.ts


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

npx playwright test q1.spec.ts <br />
npx playwright test q2.spec.ts <br />
npx playwright test q3.spec.ts <br />

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









