"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight } from "lucide-react"

type QuizAnswer = {
  text: string
  scores: { agency: number; contractor: number; directHire: number }
}

type QuizQuestion = {
  id: number
  question: string
  answers: QuizAnswer[]
  conditional?: (previousAnswers: number[]) => boolean
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Do you already have a specific caregiver in mind?",
    answers: [
      { text: "Yes, I have someone I'd like to hire", scores: { agency: 0, contractor: 2, directHire: 2 } },
      { text: "No, I need help finding the right person", scores: { agency: 3, contractor: 0, directHire: 0 } },
      { text: "Not yet, but I'm open to either approach", scores: { agency: 1, contractor: 1, directHire: 1 } }
    ]
  },
  {
    id: 2,
    question: "How important is it that the same person provides care every visit?",
    answers: [
      { text: "Very important — continuity matters for our situation", scores: { agency: 0, contractor: 2, directHire: 2 } },
      { text: "Helpful but not critical", scores: { agency: 1, contractor: 1, directHire: 1 } },
      { text: "Not particularly important to us", scores: { agency: 2, contractor: 0, directHire: 0 } }
    ]
  },
  {
    id: 3,
    question: "How much administrative work are you comfortable taking on each month?",
    answers: [
      { text: "As little as possible", scores: { agency: 3, contractor: 0, directHire: 0 } },
      { text: "Some — I can manage invoices and basic oversight", scores: { agency: 0, contractor: 2, directHire: 1 } },
      { text: "Significant — I'm comfortable with payroll, CRA deadlines, and year-end reporting", scores: { agency: 0, contractor: 1, directHire: 3 } }
    ]
  },
  {
    id: 4,
    question: "How would you describe the working relationship with your caregiver?",
    conditional: (previousAnswers) => previousAnswers[0] === 0, // Only show if Q1 answer was "Yes, I have someone"
    answers: [
      { text: "They work independently — set their own approach, may have other clients, handle their own taxes and insurance", scores: { agency: 0, contractor: 3, directHire: 0 } },
      { text: "I set the hours and routines; they primarily work in our home following my direction", scores: { agency: 0, contractor: 0, directHire: 3 } },
      { text: "I'm not sure yet — we're still figuring this out", scores: { agency: 1, contractor: 1, directHire: 1 } }
    ]
  }
]

type Result = {
  title: string
  description: string
  variant: "agency" | "contractor" | "directHire" | "tie" | "all"
}

function calculateResult(scores: { agency: number; contractor: number; directHire: number }): Result {
  const { agency, contractor, directHire } = scores
  const max = Math.max(agency, contractor, directHire)

  // Check for ties
  const winners = []
  if (agency === max) winners.push("agency")
  if (contractor === max) winners.push("contractor")
  if (directHire === max) winners.push("directHire")

  if (winners.length === 3) {
    return {
      title: "A starting point isn't clear yet",
      description: "Your situation has aspects of all three paths. Read through the sections below and reach out — a short conversation usually surfaces the deciding factor.",
      variant: "all"
    }
  }

  if (winners.length === 2) {
    if (winners.includes("agency")) {
      // Agency wins ties
      return {
        title: "Your starting point: Working with a Registered Agency",
        description: "Based on your answers — particularly your preference for minimal administrative work — an agency is the path that fits best right now. You can start receiving care quickly, with the agency handling all the employment and reporting complexity. Read the section below for more on what this involves.",
        variant: "agency"
      }
    }

    // Contractor and DirectHire tie
    return {
      title: "Your situation could go either way: Contractor or Direct Hire",
      description: "Both paths give you a consistent caregiver. The right one depends on the genuine nature of the working relationship — and whether that relationship has contractor or employment characteristics is a question only you (and, if needed, a tax advisor or CRA) can answer for your specific situation. Read both sections below, and reach out if you'd like to talk it through.",
      variant: "tie"
    }
  }

  // Single winner
  if (agency === max) {
    return {
      title: "Your starting point: Working with a Registered Agency",
      description: "Based on your answers — particularly your preference for minimal administrative work — an agency is the path that fits best right now. You can start receiving care quickly, with the agency handling all the employment and reporting complexity. Read the section below for more on what this involves.",
      variant: "agency"
    }
  }

  if (contractor === max) {
    return {
      title: "Your starting point: Hiring an Independent Contractor",
      description: "Based on your answers — particularly that you have a specific caregiver in mind, value continuity, and the working relationship has the markers of genuine self-employment — independent contracting is the path that fits best. You'll get the consistency of a chosen caregiver and the highest hours-per-dollar of FMHC funding. The section below has more, including the CRA criteria worth confirming before you commit.",
      variant: "contractor"
    }
  }

  return {
    title: "Your starting point: Hiring a Direct Employee",
    description: "Based on your answers — particularly that you have a chosen caregiver, the working relationship is one of direction and supervision, and you're comfortable with employer obligations — direct hire is the path that fits best. You'll have full control and consistency of care, with the trade-off of higher administrative load. Read the section below for what's involved.",
    variant: "directHire"
  }
}

export function DecisionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [totalScores, setTotalScores] = useState({ agency: 0, contractor: 0, directHire: 0 })

  const activeQuestions = questions.filter((q, index) => {
    if (!q.conditional) return true
    return q.conditional(answers)
  })

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    const selectedAnswer = activeQuestions[currentQuestion].answers[answerIndex]
    const newScores = {
      agency: totalScores.agency + selectedAnswer.scores.agency,
      contractor: totalScores.contractor + selectedAnswer.scores.contractor,
      directHire: totalScores.directHire + selectedAnswer.scores.directHire
    }
    setTotalScores(newScores)

    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setTotalScores({ agency: 0, contractor: 0, directHire: 0 })
  }

  const result = showResult ? calculateResult(totalScores) : null

  if (showResult && result) {
    return (
      <section className="bg-secondary py-10 md:py-14">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="rounded-xl border-2 border-border bg-card p-8">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                <CheckCircle2 className="size-8" style={{ color: '#2B4C7E' }} />
              </div>
            </div>

            <h3 className="mb-4 text-center font-serif text-[24px] font-bold text-navy">
              {result.title}
            </h3>

            <p className="mb-6 text-center text-[15px] leading-[1.7] text-muted-foreground">
              {result.description}
            </p>

            <div className="mb-6 rounded-lg bg-secondary p-4">
              <div className="text-center text-[14px] text-navy">
                <strong>Your scores</strong> — Agency: {totalScores.agency} / Contractor: {totalScores.contractor} / Direct Hire: {totalScores.directHire}
              </div>
            </div>

            <div className="rounded-lg bg-secondary p-5 text-center text-[14px] leading-[1.6] text-muted-foreground">
              <p className="mb-4">
                This is a starting point, not a verdict. Real situations have nuances no quiz can capture. If you'd like to talk through your specific circumstances, we're happy to help.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="rounded-lg px-6 text-white"
                  style={{ backgroundColor: '#2B4C7E' }}
                >
                  <a href="#contact-form">Contact Us</a>
                </Button>
                <Button
                  variant="outline"
                  onClick={resetQuiz}
                  className="rounded-lg border-2 px-6"
                  style={{ borderColor: '#2B4C7E', color: '#2B4C7E' }}
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-secondary py-10 md:py-14">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="mb-6 text-center">
          <h2 className="mb-3 font-serif text-[26px] font-bold text-navy md:text-[32px]">
            Find Your Starting Point
          </h2>
          <p className="text-[15px] leading-[1.7] text-muted-foreground">
            Not sure where to start? Answer 4 quick questions and we'll point you toward a recommended path. Think of it as orientation, not a verdict — you can always change direction as your situation becomes clearer.
          </p>
        </div>

        <div className="rounded-xl border-2 border-border bg-card p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-navy">
              <span>Question {currentQuestion + 1} of {activeQuestions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / activeQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / activeQuestions.length) * 100}%`,
                  backgroundColor: '#2B4C7E'
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="mb-6 font-serif text-[20px] font-semibold text-navy">
              {activeQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {activeQuestions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="group w-full rounded-lg border-2 border-border bg-secondary p-4 text-left transition-all duration-200 hover:border-[#2B4C7E] hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-navy">{answer.text}</span>
                    <ChevronRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Skip Option */}
          {currentQuestion > 0 && (
            <div className="text-center">
              <button
                onClick={() => setShowResult(true)}
                className="text-[14px] text-muted-foreground underline hover:text-navy"
              >
                Skip to results
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
