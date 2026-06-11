/**
 * FMHC Direct Hire Calculator - Automated Test Runner
 * Runs all test scenarios from CSV and validates results
 */

const fs = require('fs');
const path = require('path');

// Calculator Constants
const CPP_RATE = 0.0595;
const EI_EMPLOYER_RATE = 0.02282;
const VACATION_RATE = 0.04;
const CPP_MONTHLY_EXEMPTION = 291.67;
const WEEKS_PER_MONTH = 4.33;

// Calculator Logic (replicated from React component)
function calculateResults(
  hourlyWage,
  hoursPerWeek,
  hoursPerMonth,
  vacationStructure,
  wsibApplicable,
  wsibRate,
  scheduleBMax,
  hoursInputMode,
  otherCostsPerHour = 0
) {
  // Determine monthly hours
  const monthlyHours = hoursInputMode === "weekly"
    ? hoursPerWeek * WEEKS_PER_MONTH
    : hoursPerMonth;

  // Calculate gross monthly wages
  const grossMonthly = hourlyWage * monthlyHours;

  // Calculate vacation cost
  const vacationCost = vacationStructure === "separate" ? grossMonthly * VACATION_RATE : 0;

  // Total earnings for CPP/EI calculation
  const totalEarnings = grossMonthly + (vacationStructure === "separate" ? vacationCost : 0);

  // CPP calculation
  const pensionableEarnings = Math.max(0, totalEarnings - CPP_MONTHLY_EXEMPTION);
  const employerCPP = pensionableEarnings * CPP_RATE;

  // EI calculation
  const employerEI = totalEarnings * EI_EMPLOYER_RATE;

  // WSIB calculation
  const wsibCost = wsibApplicable ? totalEarnings * (wsibRate / 100) : 0;

  // Other costs
  const otherCostsMonthly = otherCostsPerHour * monthlyHours;

  // Total monthly cost
  const totalMonthlyCost = grossMonthly + employerCPP + employerEI + vacationCost + wsibCost + otherCostsMonthly;

  // Effective hourly rate
  const effectiveHourlyRate = totalMonthlyCost / monthlyHours;

  // Budget check
  const fitsWithinCap = effectiveHourlyRate <= scheduleBMax;
  const overageOrHeadroom = scheduleBMax - effectiveHourlyRate;
  const monthlyHeadroom = overageOrHeadroom * monthlyHours;

  return {
    hoursPerMonth: monthlyHours,
    grossWages: grossMonthly,
    employerCPP,
    employerEI,
    vacationCost,
    wsibCost,
    otherCostsMonthly,
    totalMonthlyCost,
    effectiveHourlyRate,
    fitsWithinCap,
    overageOrHeadroom,
    monthlyHeadroom
  };
}

// Parse CSV file
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');

  const scenarios = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values[0] && !values[0].includes('REAL CLIENT') && !values[0].includes('GENERIC')) {
      const scenario = {};
      headers.forEach((header, index) => {
        scenario[header.trim()] = values[index] ? values[index].trim() : '';
      });
      scenarios.push(scenario);
    }
  }

  return scenarios;
}

// Format number for comparison (2 decimal places)
function formatNum(num) {
  return parseFloat(num.toFixed(2));
}

// Run a single test scenario
function runTest(scenario) {
  const testId = scenario['Test ID'];
  const description = scenario['Scenario Description'];

  // Skip empty rows
  if (!testId || !description) return null;

  // Parse inputs
  const scheduleBMax = parseFloat(scenario['Schedule B Max ($/hr)']);
  const hoursInputMode = scenario['Hours Input Mode'].toLowerCase();
  const hoursPerWeek = scenario['Hours Per Week'] !== 'N/A' ? parseFloat(scenario['Hours Per Week']) : 0;
  const hoursPerMonth = scenario['Hours Per Month'] !== 'N/A' ? parseFloat(scenario['Hours Per Month']) : 0;
  const hourlyWage = parseFloat(scenario['Hourly Wage ($)']);
  const vacationStructure = scenario['Vacation Structure'];
  const wsibApplicable = scenario['WSIB Applicable'] === 'Yes';
  const wsibRate = parseFloat(scenario['WSIB Rate (%)']);

  // Parse expected outputs
  const expected = {
    monthlyHours: parseFloat(scenario['Expected Monthly Hours']),
    grossWages: parseFloat(scenario['Expected Gross Wages ($)']),
    employerCPP: parseFloat(scenario['Expected Employer CPP ($)']),
    employerEI: parseFloat(scenario['Expected Employer EI ($)']),
    vacationCost: parseFloat(scenario['Expected Vacation Cost ($)']),
    wsibCost: parseFloat(scenario['Expected WSIB Cost ($)']),
    totalMonthlyCost: parseFloat(scenario['Expected Total Monthly Cost ($)']),
    effectiveHourlyRate: parseFloat(scenario['Expected Effective Hourly Rate ($/hr)']),
    fitsWithinCap: scenario['Expected Fits Within Cap'] === 'Yes',
    differencePerHour: parseFloat(scenario['Expected Difference Per Hour ($/hr)'])
  };

  // Run calculator
  const actual = calculateResults(
    hourlyWage,
    hoursPerWeek,
    hoursPerMonth,
    vacationStructure,
    wsibApplicable,
    wsibRate,
    scheduleBMax,
    hoursInputMode,
    0 // otherCostsPerHour
  );

  // Compare results
  const tolerance = 0.02; // Allow 2 cent rounding difference
  const results = {
    testId,
    description,
    passed: true,
    failures: []
  };

  // Check each value
  const checks = [
    { name: 'Monthly Hours', expected: expected.monthlyHours, actual: formatNum(actual.hoursPerMonth) },
    { name: 'Gross Wages', expected: expected.grossWages, actual: formatNum(actual.grossWages) },
    { name: 'Employer CPP', expected: expected.employerCPP, actual: formatNum(actual.employerCPP) },
    { name: 'Employer EI', expected: expected.employerEI, actual: formatNum(actual.employerEI) },
    { name: 'Vacation Cost', expected: expected.vacationCost, actual: formatNum(actual.vacationCost) },
    { name: 'WSIB Cost', expected: expected.wsibCost, actual: formatNum(actual.wsibCost) },
    { name: 'Total Monthly Cost', expected: expected.totalMonthlyCost, actual: formatNum(actual.totalMonthlyCost) },
    { name: 'Effective Hourly Rate', expected: expected.effectiveHourlyRate, actual: formatNum(actual.effectiveHourlyRate) },
    { name: 'Fits Within Cap', expected: expected.fitsWithinCap, actual: actual.fitsWithinCap },
    { name: 'Difference Per Hour', expected: expected.differencePerHour, actual: formatNum(actual.overageOrHeadroom) }
  ];

  checks.forEach(check => {
    if (typeof check.expected === 'boolean') {
      if (check.expected !== check.actual) {
        results.passed = false;
        results.failures.push(`${check.name}: expected ${check.expected}, got ${check.actual}`);
      }
    } else {
      const diff = Math.abs(check.expected - check.actual);
      if (diff > tolerance) {
        results.passed = false;
        results.failures.push(`${check.name}: expected ${check.expected}, got ${check.actual} (diff: ${diff.toFixed(2)})`);
      }
    }
  });

  return results;
}

// Main test runner
function runAllTests() {
  console.log('='.repeat(80));
  console.log('FMHC DIRECT HIRE CALCULATOR - AUTOMATED TEST SUITE');
  console.log('='.repeat(80));
  console.log('');

  const csvPath = path.join(__dirname, 'FMHC_Calculator_Test_Scenarios_MASTER.csv');
  const scenarios = parseCSV(csvPath);

  console.log(`Found ${scenarios.length} test scenarios\n`);

  let passCount = 0;
  let failCount = 0;
  const failedTests = [];

  scenarios.forEach(scenario => {
    const result = runTest(scenario);
    if (!result) return;

    if (result.passed) {
      passCount++;
      console.log(`✅ ${result.testId}: ${result.description}`);
    } else {
      failCount++;
      failedTests.push(result);
      console.log(`❌ ${result.testId}: ${result.description}`);
      result.failures.forEach(failure => {
        console.log(`   - ${failure}`);
      });
    }
  });

  // Summary
  console.log('');
  console.log('='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${passCount + failCount}`);
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('');

  if (failCount > 0) {
    console.log('FAILED TESTS:');
    failedTests.forEach(test => {
      console.log(`\n${test.testId}: ${test.description}`);
      test.failures.forEach(failure => {
        console.log(`  - ${failure}`);
      });
    });
  } else {
    console.log('🎉 All tests passed!');
  }

  console.log('='.repeat(80));
}

// Run tests
runAllTests();
