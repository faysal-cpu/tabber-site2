"use client"

import { useState, useMemo } from "react"
import { Calculator, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react"

// IMPORTANT: CPP and EI rates are set annually by CRA and Service Canada.
// Review and update these constants every January.
// Last reviewed: June 2026
const CPP_RATE = 0.0595 // employer rate, matches employee
const CPP_MONTHLY_EXEMPTION = 291.67 // $3,500 annual / 12
const EI_EMPLOYER_RATE = 0.02282 // 1.4 × employee rate of 1.63%
const VACATION_RATE = 0.04 // 4% ESA minimum
const WEEKS_PER_MONTH = 4.333 // 52/12

interface CalculatorResults {
  hoursPerMonth: number
  grossMonthly: number
  pensionableEarnings: number
  employerCPP: number
  employerEI: number
  vacationCost: number
  wsibCost: number
  totalMonthlyCost: number
  effectiveHourlyRate: number
  fitsWithinCap: boolean
  overageOrHeadroom: number
  monthlyHeadroom: number
  maxSustainableWage: number
}

function calculateResults(
  scheduleBMax: number,
  hoursPerWeek: number,
  hourlyWage: number,
  vacationStructure: "included" | "separate",
  wsibApplicable: boolean,
  wsibRate: number,
  otherCostsPerHour: number = 0
): CalculatorResults {
  const hoursPerMonth = hoursPerWeek * WEEKS_PER_MONTH
  const grossMonthly = hourlyWage * hoursPerMonth

  // Calculate vacation pay first
  const vacationCost = vacationStructure === "separate" ? grossMonthly * VACATION_RATE : 0

  // CPP and EI are calculated on total earnings (gross + vacation if separate)
  // Per CRA: vacation pay is pensionable and insurable earnings
  const totalEarnings = grossMonthly + (vacationStructure === "separate" ? vacationCost : 0)
  const pensionableEarnings = Math.max(0, totalEarnings - CPP_MONTHLY_EXEMPTION)
  const employerCPP = pensionableEarnings * CPP_RATE
  const employerEI = totalEarnings * EI_EMPLOYER_RATE

  // WSIB on gross wages only (not vacation)
  const wsibCost = wsibApplicable ? grossMonthly * (wsibRate / 100) : 0

  // Other costs (insurance, travel, supplies, etc.)
  const otherCostsMon = otherCostsPerHour * hoursPerMonth

  const totalMonthlyCost = grossMonthly + employerCPP + employerEI + vacationCost + wsibCost + otherCostsMon
  const effectiveHourlyRate = hoursPerMonth > 0 ? totalMonthlyCost / hoursPerMonth : 0
  const fitsWithinCap = effectiveHourlyRate <= scheduleBMax
  const overageOrHeadroom = scheduleBMax - effectiveHourlyRate
  const monthlyHeadroom = overageOrHeadroom * hoursPerMonth

  // Always calculate max sustainable wage
  const maxSustainableWage = findMaxSustainableWage(
    scheduleBMax,
    hoursPerWeek,
    vacationStructure,
    wsibApplicable,
    wsibRate,
    otherCostsPerHour
  )

  return {
    hoursPerMonth,
    grossMonthly,
    pensionableEarnings,
    employerCPP,
    employerEI,
    vacationCost,
    wsibCost,
    totalMonthlyCost,
    effectiveHourlyRate,
    fitsWithinCap,
    overageOrHeadroom,
    monthlyHeadroom,
    maxSustainableWage,
  }
}

function findMaxSustainableWage(
  targetRate: number,
  hoursPerWeek: number,
  vacationStructure: "included" | "separate",
  wsibApplicable: boolean,
  wsibRate: number,
  otherCostsPerHour: number = 0
): number {
  let low = 0
  let high = targetRate
  let iterations = 0

  while (high - low > 0.01 && iterations < 100) {
    const mid = (low + high) / 2
    const hoursPerMonth = hoursPerWeek * WEEKS_PER_MONTH
    const grossMonthly = mid * hoursPerMonth

    // Calculate vacation
    const vacationCost = vacationStructure === "separate" ? grossMonthly * VACATION_RATE : 0

    // CPP and EI on total earnings (gross + vacation if separate)
    const totalEarnings = grossMonthly + (vacationStructure === "separate" ? vacationCost : 0)
    const pensionableEarnings = Math.max(0, totalEarnings - CPP_MONTHLY_EXEMPTION)
    const employerCPP = pensionableEarnings * CPP_RATE
    const employerEI = totalEarnings * EI_EMPLOYER_RATE

    // WSIB on gross only
    const wsibCost = wsibApplicable ? grossMonthly * (wsibRate / 100) : 0

    // Other costs
    const otherCostsMon = otherCostsPerHour * hoursPerMonth

    const totalMonthlyCost = grossMonthly + employerCPP + employerEI + vacationCost + wsibCost + otherCostsMon
    const effectiveRate = totalMonthlyCost / hoursPerMonth

    if (effectiveRate > targetRate) {
      high = mid
    } else {
      low = mid
    }
    iterations++
  }

  return low
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-block ml-2">
      <HelpCircle className="size-4 cursor-help" style={{ color: '#2B4C7E' }} />
      <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg bg-navy p-3 text-xs text-white shadow-xl group-hover:block">
        {text}
      </div>
    </div>
  )
}

// Format currency with commas
function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function DirectHireCalculator() {
  const [scheduleBMax, setScheduleBMax] = useState(0)
  const [hoursInputMode, setHoursInputMode] = useState<"weekly" | "monthly">("weekly")
  const [hoursPerWeek, setHoursPerWeek] = useState(0)
  const [hoursPerMonth, setHoursPerMonth] = useState(0)
  const [hourlyWage, setHourlyWage] = useState(0)
  const [vacationStructure, setVacationStructure] = useState<"included" | "separate">("included")
  const [wsibApplicable, setWsibApplicable] = useState(false)
  const [wsibManualOverride, setWsibManualOverride] = useState(false)
  const [wsibRate, setWsibRate] = useState(1.05)
  const [otherCostsPerHour, setOtherCostsPerHour] = useState(0.00)

  // Sync hours between weekly and monthly
  const effectiveHoursPerWeek = hoursInputMode === "weekly"
    ? hoursPerWeek
    : hoursPerMonth / WEEKS_PER_MONTH

  // Auto-suggest WSIB based on hours (but allow manual override)
  useMemo(() => {
    if (!wsibManualOverride) {
      const shouldApply = effectiveHoursPerWeek > 24
      if (wsibApplicable !== shouldApply) {
        setWsibApplicable(shouldApply)
      }
    }
  }, [effectiveHoursPerWeek, wsibManualOverride])

  const results = useMemo(
    () => {
      const calcResults = calculateResults(
        scheduleBMax,
        effectiveHoursPerWeek,
        hourlyWage,
        vacationStructure,
        wsibApplicable,
        wsibRate,
        otherCostsPerHour
      )

      // Track calculation in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculator_use', {
          event_category: 'Direct Hire Calculator',
          event_label: calcResults.fitsWithinCap ? 'Within Budget' : 'Over Budget',
          value: Math.round(calcResults.effectiveHourlyRate * 100) / 100,
        })
      }

      return calcResults
    },
    [scheduleBMax, effectiveHoursPerWeek, hourlyWage, vacationStructure, wsibApplicable, wsibRate, otherCostsPerHour]
  )

  return (
    <div className="rounded-xl bg-white p-8 shadow-xl border-2" style={{ borderColor: '#E8EDF5' }}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Group 1: Your FMHC Setup */}
          <div>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy">Your FMHC Setup</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="scheduleBMax" className="flex items-center text-sm font-semibold text-navy mb-2">
                  Schedule B maximum hourly rate
                  <Tooltip text="The all-in hourly rate approved in your FMHC Schedule B. This caps the total per-hour cost of the service. Find it in your signed FMHC agreement." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy">$</span>
                  <input
                    id="scheduleBMax"
                    type="number"
                    step="0.01"
                    min="0"
                    value={scheduleBMax === 0 ? '' : scheduleBMax}
                    onChange={(e) => setScheduleBMax(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    onFocus={(e) => e.target.select()}
                    placeholder="38.46"
                    className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-navy mb-2">
                  Worker hours
                  <Tooltip text="The number of service hours the worker will be scheduled for. Used to calculate monthly costs and to flag WSIB applicability (>24 hrs/week)." />
                </label>
                <div className="mb-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHoursInputMode("weekly")
                      setHoursPerWeek(hoursPerMonth / WEEKS_PER_MONTH)
                    }}
                    className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      hoursInputMode === "weekly"
                        ? "text-white"
                        : "bg-gray-100 text-navy hover:bg-gray-200"
                    }`}
                    style={hoursInputMode === "weekly" ? { backgroundColor: "#2B4C7E" } : {}}
                  >
                    Per Week
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHoursInputMode("monthly")
                      setHoursPerMonth(hoursPerWeek * WEEKS_PER_MONTH)
                    }}
                    className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      hoursInputMode === "monthly"
                        ? "text-white"
                        : "bg-gray-100 text-navy hover:bg-gray-200"
                    }`}
                    style={hoursInputMode === "monthly" ? { backgroundColor: "#2B4C7E" } : {}}
                  >
                    Per Month
                  </button>
                </div>
                {hoursInputMode === "weekly" ? (
                  <input
                    id="hoursPerWeek"
                    type="number"
                    step="0.5"
                    min="0"
                    max="60"
                    value={hoursPerWeek === 0 ? '' : hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    onFocus={(e) => e.target.select()}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g., 21"
                  />
                ) : (
                  <input
                    id="hoursPerMonth"
                    type="number"
                    step="1"
                    min="0"
                    max="260"
                    value={hoursPerMonth === 0 ? '' : hoursPerMonth}
                    onChange={(e) => setHoursPerMonth(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    onFocus={(e) => e.target.select()}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g., 91"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Group 2: The Wage You're Considering */}
          <div>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy">The Wage You're Considering</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="hourlyWage" className="flex items-center text-sm font-semibold text-navy mb-2">
                  Hourly wage
                  <Tooltip text="The hourly wage you're considering offering the worker. This is what they receive on their pay stub before deductions." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy">$</span>
                  <input
                    id="hourlyWage"
                    type="number"
                    step="0.01"
                    min="0"
                    value={hourlyWage === 0 ? '' : hourlyWage}
                    onChange={(e) => setHourlyWage(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    onFocus={(e) => e.target.select()}
                    placeholder="20.00"
                    className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-navy mb-2">
                  Vacation handling
                  <Tooltip text="'Included in hourly rate': Vacation pay is baked into the wage above (typical for Ontario direct hires). 'Accrued separately': Vacation pay is calculated and paid out separately at 4% on top of wages." />
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vacationStructure === "included"}
                      onChange={() => setVacationStructure("included")}
                      className="text-[#2B4C7E] focus:ring-[#2B4C7E]"
                    />
                    <span className="text-sm text-navy">Included in hourly rate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vacationStructure === "separate"}
                      onChange={() => setVacationStructure("separate")}
                      className="text-[#2B4C7E] focus:ring-[#2B4C7E]"
                    />
                    <span className="text-sm text-navy">Accrued separately</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Group 3: WSIB */}
          <div>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy">WSIB</h3>
            <div className="space-y-4">
              {hoursInputMode === "monthly" && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs text-amber-900 leading-relaxed">
                    <strong>Important:</strong> WSIB applies if the worker exceeds 24 hours in <em>any single week</em>, even if the monthly average is below that threshold. If your worker's hours vary week-to-week, check the WSIB box manually if any week exceeds 24 hours.
                  </p>
                </div>
              )}
              <div>
                <label className="flex items-center text-sm font-semibold text-navy mb-2">
                  WSIB applicable?
                  <Tooltip text="In Ontario, domestic workers in a private residence are exempt from WSIB if they work less than 24 hours per week. WSIB applies if ANY week exceeds 24 hours — not based on monthly average. Select 'Yes' if any week will exceed 24 hours." />
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!wsibApplicable}
                      onChange={() => {
                        setWsibApplicable(false)
                        setWsibManualOverride(true)
                      }}
                      className="text-[#2B4C7E] focus:ring-[#2B4C7E]"
                    />
                    <span className="text-sm text-navy">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={wsibApplicable}
                      onChange={() => {
                        setWsibApplicable(true)
                        setWsibManualOverride(true)
                      }}
                      className="text-[#2B4C7E] focus:ring-[#2B4C7E]"
                    />
                    <span className="text-sm text-navy">Yes</span>
                  </label>
                </div>
              </div>

              {wsibApplicable && (
                <div>
                  <label htmlFor="wsibRate" className="flex items-center text-sm font-semibold text-navy mb-2">
                    WSIB rate (%)
                    <Tooltip text="Your WSIB premium rate as a percent of payroll. The rate varies by classification; check your WSIB account or recent invoice. 1.05% is a typical rate for in-home domestic worker classifications." />
                  </label>
                  <div className="relative">
                    <input
                      id="wsibRate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={wsibRate === 0 ? '' : wsibRate}
                      onChange={(e) => setWsibRate(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      placeholder="1.05"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-navy">%</span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="otherCosts" className="flex items-center text-sm font-semibold text-navy mb-2">
                  Other costs per hour (optional)
                  <Tooltip text="Add any other employer costs not captured above. This gets added to the effective hourly rate." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy">$</span>
                  <input
                    id="otherCosts"
                    type="number"
                    step="0.10"
                    min="0"
                    max="10"
                    value={otherCostsPerHour === 0 ? '' : otherCostsPerHour}
                    onChange={(e) => setOtherCostsPerHour(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    onFocus={(e) => e.target.select()}
                    className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-6">
          {/* Status Banner or Instructions */}
          {scheduleBMax === 0 || hourlyWage === 0 || (hoursInputMode === 'weekly' ? hoursPerWeek === 0 : hoursPerMonth === 0) ? (
            <div
              className="rounded-xl p-6 text-center border-2"
              style={{ backgroundColor: '#F9FAFB', borderColor: '#E8EDF5' }}
            >
              <div className="flex size-12 mx-auto mb-3 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                <Calculator className="size-6" style={{ color: '#2B4C7E' }} />
              </div>
              <p className="font-serif text-[16px] font-semibold text-navy mb-2">
                Ready to Calculate
              </p>
              <p className="text-sm text-muted-foreground">
                Enter your Schedule B max, worker hours, and hourly wage to see if your offer fits within your approved rate.
              </p>
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl p-6 text-center"
              style={{
                backgroundColor: results.fitsWithinCap ? '#E8EDF5' : '#FEF5F5',
              }}
            >
              {results.fitsWithinCap ? (
                <>
                  <CheckCircle2 className="mx-auto size-12 mb-3" style={{ color: '#16A34A' }} />
                  <p className="font-serif text-[18px] font-bold text-navy mb-3">
                    ✓ This wage fits within your Schedule B max
                  </p>
                  <p className="text-sm font-semibold text-navy">
                    Maximum sustainable wage: ${formatCurrency(results.maxSustainableWage)}/hr
                  </p>
                </>
              ) : (
                <>
                  <AlertCircle className="mx-auto size-12 mb-3" style={{ color: '#DC2626' }} />
                  <p className="font-serif text-[18px] font-bold mb-2" style={{ color: '#7F1D1D' }}>
                    ✗ This wage exceeds your Schedule B max
                  </p>
                  <p className="text-sm mb-3" style={{ color: '#7F1D1D' }}>
                    Over by ${formatCurrency(Math.abs(results.overageOrHeadroom))} per hour
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#7F1D1D' }}>
                    Maximum sustainable wage: ${formatCurrency(results.maxSustainableWage)}/hr
                  </p>
                </>
              )}
            </div>
          )}

          {/* Monthly Cost Breakdown */}
          <div className="rounded-xl bg-white border-2 p-6" style={{ borderColor: '#E8EDF5' }}>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy border-b pb-3" style={{ borderColor: '#E8EDF5' }}>
              Monthly Cost Breakdown
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-navy/70">Gross wages (hours × wage)</span>
                <span className="font-semibold text-navy">${formatCurrency(results.grossMonthly)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">Employer CPP (5.95%)</span>
                <span className="font-semibold text-navy">${formatCurrency(results.employerCPP)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">Employer EI (2.28%)</span>
                <span className="font-semibold text-navy">${formatCurrency(results.employerEI)}</span>
              </div>
              {results.vacationCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-navy/70">Vacation pay (4%)</span>
                  <span className="font-semibold text-navy">${formatCurrency(results.vacationCost)}</span>
                </div>
              )}
              {results.wsibCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-navy/70">WSIB ({wsibRate}%)</span>
                  <span className="font-semibold text-navy">${formatCurrency(results.wsibCost)}</span>
                </div>
              )}
              <div className="border-t pt-3" style={{ borderColor: '#E8EDF5' }}>
                <div className="flex justify-between">
                  <span className="font-bold text-navy">Total monthly labour cost</span>
                  <span className="font-bold text-navy">${formatCurrency(results.totalMonthlyCost)}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">Monthly service hours</span>
                <span className="font-semibold text-navy">{results.hoursPerMonth.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-navy">Effective per-hour cost</span>
                <span className="font-bold text-navy">${formatCurrency(results.effectiveHourlyRate)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Budget Check Cards - Full Width Below */}
      <div className="mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Schedule B Rate Check */}
          <div className="rounded-xl p-6" style={{ backgroundColor: '#E8EDF5' }}>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy">Schedule B Rate Check</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-navy/70">Schedule B max per hour:</span>
                <span className="font-semibold text-navy">${formatCurrency(scheduleBMax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">Your effective rate:</span>
                <span className="font-semibold text-navy">${formatCurrency(results.effectiveHourlyRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">
                  {results.fitsWithinCap ? "Difference per hour:" : "Over by:"}
                </span>
                <span className={`font-semibold ${results.fitsWithinCap ? "text-navy" : ""}`} style={{ color: results.fitsWithinCap ? '#2B4C7E' : '#DC2626' }}>
                  ${formatCurrency(Math.abs(results.overageOrHeadroom))}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Budget Check */}
          <div className="rounded-xl p-6" style={{ backgroundColor: results.fitsWithinCap ? '#E8EDF5' : '#FEF5F5' }}>
            <h3 className="mb-4 font-serif text-[18px] font-bold text-navy">Monthly Budget Check</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-navy/70">Maximum monthly budget:</span>
                <span className="font-semibold text-navy">${formatCurrency(scheduleBMax * results.hoursPerMonth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">Your monthly cost:</span>
                <span className="font-semibold text-navy">${formatCurrency(results.totalMonthlyCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70">
                  {results.fitsWithinCap ? "Monthly room:" : "Monthly overage:"}
                </span>
                <span className={`font-semibold ${results.fitsWithinCap ? "text-navy" : ""}`} style={{ color: results.fitsWithinCap ? '#2B4C7E' : '#DC2626' }}>
                  ${formatCurrency(Math.abs(results.monthlyHeadroom))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shared Note Below Both Cards */}
        {results.fitsWithinCap ? (
          <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: '#F0F9FF', borderLeft: '4px solid #2B4C7E' }}>
            <p className="text-xs text-navy/70 leading-relaxed">
              <strong>Note:</strong> This difference cannot be used to exceed approved hours or reallocated freely. Both your hourly rate and approved service hours are fixed ceilings in Schedule B.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: '#FEF5F5', borderLeft: '4px solid #DC2626' }}>
            <p className="text-xs leading-relaxed" style={{ color: '#7F1D1D' }}>
              You'd be over budget by ${formatCurrency(Math.abs(results.monthlyHeadroom))}/month. This shortfall would need to come out of pocket.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
