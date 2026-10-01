/**
 * Node.js automated test runner for Student Registration Webpage.
 * Tests index.html existence, doctype, form structure, and required elements.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const HTML_FILE_PATH = path.join(__dirname, '..', 'index.html');

console.log('====================================================');
console.log('  Running HTML Webpage & Form Structure Test Suite  ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✔ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${testName}`);
    console.error(`     Reason: ${err.message}`);
  }
}

// 1. File existence
runTest('index.html exists in root directory', () => {
  assert.strictEqual(fs.existsSync(HTML_FILE_PATH), true, `index.html not found at ${HTML_FILE_PATH}`);
});

let htmlContent = '';
if (fs.existsSync(HTML_FILE_PATH)) {
  htmlContent = fs.readFileSync(HTML_FILE_PATH, 'utf-8');
}

// 2. File not empty
runTest('index.html is not empty', () => {
  assert.ok(htmlContent.trim().length > 0, 'index.html is empty');
});

// 3. Doctype and title
runTest('Contains HTML5 DOCTYPE and Title', () => {
  assert.match(htmlContent, /<!doctype\s+html>/i, 'Missing <!DOCTYPE html>');
  assert.match(htmlContent, /<title>.*registration.*<\/title>/i, 'Missing or invalid <title> tag');
});

// 4. Form element exists
runTest('Contains <form> element with id or name', () => {
  assert.match(htmlContent, /<form[^>]+(id|name)=["'][^"']+["'][^>]*>/i, 'Form tag missing or lacking id/name attribute');
});

// 5. Full name input
runTest('Contains Full Name input field', () => {
  assert.match(htmlContent, /<input[^>]+(id|name)=["'](fullName|firstName|name)["'][^>]*>/i, 'Missing full name input');
});

// 6. Email input
runTest('Contains Email input field with type="email"', () => {
  assert.match(htmlContent, /<input[^>]+type=["']email["'][^>]*>/i, 'Missing input with type="email"');
});

// 7. Phone input
runTest('Contains Phone input field', () => {
  assert.match(htmlContent, /<input[^>]+(type=["']tel["']|(id|name)=["'][^"']*phone[^"']*["'])[^>]*>/i, 'Missing phone input');
});

// 8. Date of birth input
runTest('Contains Date of Birth input field', () => {
  assert.match(htmlContent, /<input[^>]+(type=["']date["']|(id|name)=["'][^"']*dob[^"']*["'])[^>]*>/i, 'Missing date of birth input');
});

// 9. Gender selection
runTest('Contains Gender radio inputs or dropdown', () => {
  const hasRadio = /<input[^>]+type=["']radio["'][^>]+name=["']gender["']/i.test(htmlContent);
  const hasSelect = /<select[^>]+name=["']gender["']/i.test(htmlContent);
  assert.ok(hasRadio || hasSelect, 'Missing gender radio options or select dropdown');
});

// 10. Course select dropdown
runTest('Contains Academic Course <select> dropdown with options', () => {
  assert.match(htmlContent, /<select[^>]+(id|name)=["'](course|program)["'][^>]*>/i, 'Missing course select element');
  assert.match(htmlContent, /<option[^>]*>.*<\/option>/i, 'Missing option tags inside select');
});

// 11. Address textarea
runTest('Contains Residential Address field', () => {
  assert.match(htmlContent, /<(textarea|input)[^>]+(id|name)=["'][^"']*address[^"']*["'][^>]*>/i, 'Missing address textarea/input');
});

// 12. Submit button
runTest('Contains Submit button', () => {
  const hasSubmitBtn = /<button[^>]+type=["']submit["']/i.test(htmlContent);
  const hasSubmitInput = /<input[^>]+type=["']submit["']/i.test(htmlContent);
  assert.ok(hasSubmitBtn || hasSubmitInput, 'Missing submit button');
});

console.log('\n----------------------------------------------------');
console.log(`Test Summary: ${passedTests}/${totalTests} tests passed`);
console.log('----------------------------------------------------');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
