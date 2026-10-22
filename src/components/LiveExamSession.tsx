"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
  Flag,
  X,
  RotateCcw,
  Eraser,
  Pen,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  Minus,
  Maximize2,
  Highlighter,
  Strikethrough,
  Presentation,
  FileText
} from "lucide-react";

export interface QuestionItem {
  id: number;
  domain: string;
  stem: string;
  keyPhrase?: string;
  options: {
    id: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

const mockQuestions: QuestionItem[] = [
  {
    id: 1,
    domain: "Care Management",
    stem: "A case manager is planning the discharge of an older adult from hospital to home.",
    keyPhrase: "What should the case manager do first?",
    options: [
      { id: "A", text: "Arrange home health services" },
      { id: "B", text: "Assess the patient's needs and support at home" },
      { id: "C", text: "Confirm insurance coverage for equipment" },
      { id: "D", text: "Schedule follow-up appointments with specialists" }
    ],
    correctAnswer: "B",
    explanation: "Assessment is the foundational first step of the case management process. Assessing patient functional needs, informal caregiver capabilities, and home safety must precede arranging specific services."
  },
  {
    id: 2,
    domain: "Reimbursement Methods",
    stem: "A patient's plan pays 80% of a $1,250 bill after the deductible is met.",
    keyPhrase: "How much does the patient pay?",
    options: [
      { id: "A", text: "$150" },
      { id: "B", text: "$250" },
      { id: "C", text: "$1,000" },
      { id: "D", text: "$200" }
    ],
    correctAnswer: "B",
    explanation: "The insurance pays 80%, leaving the patient with 20% coinsurance: $1,250 × 0.20 = $250."
  },
  {
    id: 3,
    domain: "Ethical, Legal and Practice Standards",
    stem: "An acute care case manager learns that an alert, oriented patient with full decision-making capacity refuses recommended post-acute rehabilitation against medical advice.",
    keyPhrase: "The case manager's primary ethical obligation is to:",
    options: [
      { id: "A", text: "Persuade the patient's surrogate to override the refusal" },
      { id: "B", text: "Respect the patient's autonomy while verifying informed understanding" },
      { id: "C", text: "Immediately discharge the patient without further home safety planning" },
      { id: "D", text: "Petition for emergency hospital guardianship" }
    ],
    correctAnswer: "B",
    explanation: "Autonomy is the ethical principle upholding a competent patient's right to self-determination and refusal of care once risks and alternatives are explained."
  },
  {
    id: 4,
    domain: "Psychosocial Concepts & Support Systems",
    stem: "A 68-year-old caregiver of a spouse with advanced Alzheimer's disease exhibits fatigue, weight loss, and emotional distress during a home visit.",
    keyPhrase: "Which intervention by the case manager is most appropriate initially?",
    options: [
      { id: "A", text: "Recommend immediate hospice placement for the patient" },
      { id: "B", text: "Explore community respite care and caregiver support group resources" },
      { id: "C", text: "Advise the caregiver to hire private-duty registered nurses" },
      { id: "D", text: "File an adult protective services report for caregiver burnout" }
    ],
    correctAnswer: "B",
    explanation: "Caregiver strain is addressed by mobilizing community-based respite care services and support groups to prevent decompensation while maintaining home care."
  },
  {
    id: 5,
    domain: "Quality and Outcomes Evaluation",
    stem: "A hospital case management department monitors clinical metrics to reduce avoidable readmissions under the Hospital Readmissions Reduction Program (HRRP).",
    keyPhrase: "Which metric represents a clinical quality outcome rather than a financial utilization measure?",
    options: [
      { id: "A", text: "30-day all-cause hospital readmission rate" },
      { id: "B", text: "Average length of stay (ALOS) in days" },
      { id: "C", text: "Hospital cost per case-mix adjusted discharge" },
      { id: "D", text: "Commercial insurance claim denial percentage" }
    ],
    correctAnswer: "A",
    explanation: "30-day all-cause readmission rate measures patient health quality and transition efficacy, whereas length of stay and costs are utilization/operational metrics."
  },
  {
    id: 6,
    domain: "Rehabilitation Concepts and Strategies",
    stem: "A patient recovering from an acute ischemic stroke requires physical, occupational, and speech therapy for at least 3 hours per day, 5 days per week.",
    keyPhrase: "Which post-acute level of care is most appropriate for this patient?",
    options: [
      { id: "A", text: "Skilled Nursing Facility (SNF) subacute level" },
      { id: "B", text: "Inpatient Rehabilitation Facility (IRF)" },
      { id: "C", text: "Long-Term Acute Care Hospital (LTACH)" },
      { id: "D", text: "Outpatient community physical therapy" }
    ],
    correctAnswer: "B",
    explanation: "The '3-hour rule' (intensive therapy for 3 hours/day, 5 days/week or 15 hours/7 days) is the defining admission criterion for Medicare Inpatient Rehabilitation Facilities (IRFs)."
  },
  {
    id: 7,
    domain: "Care Management",
    stem: "During utilization review, a Medicare Advantage plan denies continued inpatient acute care for a patient with stabilizing pneumonia who still requires intravenous antibiotics.",
    keyPhrase: "What is the case manager's next most timely advocacy action?",
    options: [
      { id: "A", text: "Discharge the patient without medications to avoid hospital penalties" },
      { id: "B", text: "Facilitate a peer-to-peer discussion between attending physician and medical director" },
      { id: "C", text: "Instruct the patient to pay out-of-pocket for remaining hospital days" },
      { id: "D", text: "Transfer the patient to an out-of-network academic medical center" }
    ],
    correctAnswer: "B",
    explanation: "Facilitating an expedited physician-to-physician (peer-to-peer) discussion allows clinical context clarification before an official denial is finalized."
  },
  {
    id: 8,
    domain: "Reimbursement Methods",
    stem: "Under Medicare Part A Inpatient Prospective Payment System (IPPS), acute hospital reimbursement is predominantly packaged and established by:",
    keyPhrase: "Which reimbursement mechanism applies?",
    options: [
      { id: "A", text: "Fee-For-Service itemized daily billing" },
      { id: "B", text: "Medicare Severity Diagnosis-Related Group (MS-DRG)" },
      { id: "C", text: "Current Procedural Terminology (CPT) hourly codes" },
      { id: "D", text: "Resource-Based Relative Value Scale (RBRVS)" }
    ],
    correctAnswer: "B",
    explanation: "Medicare Part A reimburses acute hospitalizations prospectively based on MS-DRGs, which package standard inpatient services into a single fixed payment."
  }
];

export interface DomainScoreItem {
  name: string;
  weight: number;
  mockScore: number;
  needsWork?: boolean;
  missedCount?: number;
}

export const mockDomainScores: DomainScoreItem[] = [
  { name: "Care Management", weight: 30, mockScore: 78, needsWork: false },
  { name: "Psychosocial Concepts and Support Systems", weight: 20, mockScore: 64, needsWork: true, missedCount: 11 },
  { name: "Ethical, Legal and Practice Standards", weight: 18, mockScore: 81, needsWork: false },
  { name: "Reimbursement Methods", weight: 12, mockScore: 58, needsWork: true, missedCount: 8 },
  { name: "Quality and Outcomes Evaluation", weight: 10, mockScore: 73, needsWork: false },
  { name: "Rehabilitation Concepts and Strategies", weight: 10, mockScore: 76, needsWork: false },
];

export interface PracticeQuestion {
  id: number;
  domain: string;
  shortDomain: string;
  stem: string;
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  isMissedInMock: boolean;
}

export const mockPracticeQuestions: PracticeQuestion[] = [
  {
    id: 1,
    domain: "Psychosocial Concepts and Support Systems",
    shortDomain: "Psychosocial Concepts",
    stem: 'A client with diabetes says they know they should change their diet but "just can\'t." Which approach best helps the client find their own motivation to change?',
    options: [
      { id: "A", text: "Give the client a written meal plan" },
      { id: "B", text: "Use motivational interviewing" },
      { id: "C", text: "Refer the client to a dietitian" },
      { id: "D", text: "Set weekly diet goals for the client" }
    ],
    correctAnswer: "B",
    explanation: "Motivational interviewing is a collaborative, goal-oriented style of communication that helps clients explore and resolve ambivalence, strengthening personal motivation for positive change.",
    isMissedInMock: true
  },
  {
    id: 2,
    domain: "Reimbursement Methods",
    shortDomain: "Reimbursement Methods",
    stem: "Under Medicare Part A Inpatient Prospective Payment System (IPPS), acute hospital reimbursement is predominantly packaged and established by which payment mechanism?",
    options: [
      { id: "A", text: "Fee-For-Service itemized daily billing" },
      { id: "B", text: "Medicare Severity Diagnosis-Related Group (MS-DRG)" },
      { id: "C", text: "Current Procedural Terminology (CPT) hourly codes" },
      { id: "D", text: "Resource-Based Relative Value Scale (RBRVS)" }
    ],
    correctAnswer: "B",
    explanation: "Medicare Part A reimburses acute hospitalizations prospectively based on MS-DRGs, which package standard inpatient services into a single predetermined payment.",
    isMissedInMock: true
  },
  {
    id: 3,
    domain: "Psychosocial Concepts and Support Systems",
    shortDomain: "Psychosocial Concepts",
    stem: "A 68-year-old caregiver of a spouse with advanced Alzheimer's disease exhibits severe fatigue, sleep disruption, and tearfulness during a home visit. Which initial intervention is most appropriate?",
    options: [
      { id: "A", text: "Recommend immediate permanent institutional nursing facility placement" },
      { id: "B", text: "Connect the caregiver with local respite care programs and support resources" },
      { id: "C", text: "Advise the caregiver to hire private-duty nurses out-of-pocket" },
      { id: "D", text: "Report the family to Adult Protective Services for caregiver burnout" }
    ],
    correctAnswer: "B",
    explanation: "Mobilizing community respite services and caregiver support groups directly alleviates caregiver strain while preserving patient comfort at home.",
    isMissedInMock: true
  },
  {
    id: 4,
    domain: "Reimbursement Methods",
    shortDomain: "Reimbursement Methods",
    stem: "A patient's commercial health plan pays 80% of covered expenses after a deductible is met. If remaining covered charges are $1,250, how much does the patient pay as coinsurance?",
    options: [
      { id: "A", text: "$150" },
      { id: "B", text: "$250" },
      { id: "C", text: "$1,000" },
      { id: "D", text: "$200" }
    ],
    correctAnswer: "B",
    explanation: "The insurance pays 80%, leaving the patient with 20% coinsurance liability: $1,250 × 0.20 = $250.",
    isMissedInMock: true
  },
  {
    id: 5,
    domain: "Care Management",
    shortDomain: "Care Management",
    stem: "During utilization review, a Medicare Advantage plan denies continued inpatient acute care for a patient with stabilizing pneumonia who still requires IV antibiotics. What is the case manager's next most timely advocacy action?",
    options: [
      { id: "A", text: "Discharge the patient without medications to avoid hospital penalties" },
      { id: "B", text: "Facilitate a peer-to-peer discussion between attending physician and medical director" },
      { id: "C", text: "Instruct the patient to pay out-of-pocket for remaining hospital days" },
      { id: "D", text: "Transfer the patient to an out-of-network academic medical center" }
    ],
    correctAnswer: "B",
    explanation: "Facilitating an expedited physician-to-physician (peer-to-peer) discussion allows clinical context clarification before an official denial is finalized.",
    isMissedInMock: false
  },
  {
    id: 6,
    domain: "Ethical, Legal and Practice Standards",
    shortDomain: "Ethical Standards",
    stem: "An acute care case manager learns that an alert, oriented patient with full decision-making capacity refuses recommended post-acute rehabilitation against medical advice. The case manager's primary ethical obligation is to:",
    options: [
      { id: "A", text: "Persuade the patient's surrogate to override the refusal" },
      { id: "B", text: "Respect the patient's autonomy while verifying informed understanding" },
      { id: "C", text: "Immediately discharge the patient without further home safety planning" },
      { id: "D", text: "Petition for emergency hospital guardianship" }
    ],
    correctAnswer: "B",
    explanation: "Autonomy is the ethical principle upholding a competent patient's right to self-determination and refusal of care once risks and alternatives are explained.",
    isMissedInMock: false
  },
  {
    id: 7,
    domain: "Quality and Outcomes Evaluation",
    shortDomain: "Quality & Outcomes",
    stem: "Which metric represents a clinical quality outcome rather than an administrative utilization metric under the Hospital Readmissions Reduction Program (HRRP)?",
    options: [
      { id: "A", text: "30-day all-cause hospital readmission rate" },
      { id: "B", text: "Average length of stay (ALOS) in days" },
      { id: "C", text: "Hospital cost per case-mix adjusted discharge" },
      { id: "D", text: "Commercial insurance claim denial percentage" }
    ],
    correctAnswer: "A",
    explanation: "30-day all-cause readmission rate measures patient health quality and transition efficacy, whereas length of stay and costs are utilization/operational metrics.",
    isMissedInMock: false
  },
  {
    id: 8,
    domain: "Rehabilitation Concepts and Strategies",
    shortDomain: "Rehab Strategies",
    stem: "A patient recovering from an acute ischemic stroke requires physical, occupational, and speech therapy for at least 3 hours per day, 5 days per week. Which post-acute level of care is most appropriate?",
    options: [
      { id: "A", text: "Skilled Nursing Facility (SNF) subacute level" },
      { id: "B", text: "Inpatient Rehabilitation Facility (IRF)" },
      { id: "C", text: "Long-Term Acute Care Hospital (LTACH)" },
      { id: "D", text: "Outpatient community physical therapy" }
    ],
    correctAnswer: "B",
    explanation: "The '3-hour rule' (intensive therapy for 3 hours/day, 5 days/week or 15 hours/7 days) is the defining admission criterion for Medicare Inpatient Rehabilitation Facilities (IRFs).",
    isMissedInMock: false
  }
];

export interface LiveExamSessionProps {
  id?: string;
  title?: string;
  totalQuestions?: number;
}

export function LiveExamSession({
  id = "ccm-mock-1",
  title = "CCM Mock Exam 1",
  totalQuestions = 180,
}: LiveExamSessionProps) {
  const router = useRouter();

  // Navigation & Answers State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({
    0: "B" // Pre-selected for Q1 demonstration
  });
  const [strikeouts, setStrikeouts] = useState<Record<number, ("A" | "B" | "C" | "D")[]>>({
    0: ["C"] // Pre-struck for Q1 demonstration
  });
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [highlightedQuestions, setHighlightedQuestions] = useState<Record<number, boolean>>({
    0: true
  });

  // Tools Modal States
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isHighlighterToolActive, setIsHighlighterToolActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<100 | 125 | 150>(100);
  const [isTimeHidden, setIsTimeHidden] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "FLAGGED" | "UNANSWERED">("ALL");

  // Post-Exam View State: ACTIVE_EXAM | EXAM_COMPLETE | PRACTICE_SETUP | PRACTICE_SESSION | ATTEMPT_ENDED
  const [viewMode, setViewMode] = useState<
    "ACTIVE_EXAM" | "EXAM_COMPLETE" | "PRACTICE_SETUP" | "PRACTICE_SESSION" | "ATTEMPT_ENDED"
  >("ACTIVE_EXAM");

  // Attempt Ended Edge Case State
  const [attemptStoppedAt, setAttemptStoppedAt] = useState(41);
  const [attemptTimeUsed, setAttemptTimeUsed] = useState("0:47:50");

  // Practice Configuration State
  const [selectedPracticeDomains, setSelectedPracticeDomains] = useState<string[]>([
    "Psychosocial Concepts and Support Systems",
    "Reimbursement Methods"
  ]);
  const [practiceQuestionCount, setPracticeQuestionCount] = useState<10 | 20 | 30>(20);
  const [practiceMode, setPracticeMode] = useState<"LEARN" | "TIMED">("LEARN");
  const [includeMissedInMock, setIncludeMissedInMock] = useState(true);

  // Practice Interactive Session State
  const [practiceCurrentIndex, setPracticeCurrentIndex] = useState(0);
  const [practiceSelectedOption, setPracticeSelectedOption] = useState<string | null>(null);
  const [practiceIsChecked, setPracticeIsChecked] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  // Top nav markup toggles (Show/Hide highlights & strikeouts)
  const [showHighlights, setShowHighlights] = useState(true);
  const [showStrikeouts, setShowStrikeouts] = useState(true);

  // Scoring Structure Popup Modal State
  const [isScoringInfoOpen, setIsScoringInfoOpen] = useState(false);

  // Timer State (2 hours, 51 minutes, 10 seconds = 10,270s)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(10270);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Proctored Exam Rule: Switching tabs or leaving the app during active exam stops the attempt
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && viewMode === "ACTIVE_EXAM" && !isExamCompleted) {
        setAttemptStoppedAt(currentIndex + 1);
        const elapsed = 10270 - timeRemainingSeconds;
        setAttemptTimeUsed(formatTimer(elapsed > 0 ? elapsed : 47 * 60 + 50));
        setViewMode("ATTEMPT_ENDED");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [viewMode, isExamCompleted, currentIndex, timeRemainingSeconds]);

  // Dynamic practice questions filter based on selected domains & missed toggle
  const activePracticeQuestions = useMemo(() => {
    let filtered = mockPracticeQuestions.filter((q) =>
      selectedPracticeDomains.includes(q.domain)
    );
    if (includeMissedInMock) {
      filtered = [
        ...filtered.filter((q) => q.isMissedInMock),
        ...filtered.filter((q) => !q.isMissedInMock)
      ];
    }
    if (filtered.length === 0) {
      filtered = mockPracticeQuestions;
    }
    const result: PracticeQuestion[] = [];
    for (let i = 0; i < practiceQuestionCount; i++) {
      result.push({
        ...filtered[i % filtered.length],
        id: i + 1
      });
    }
    return result;
  }, [selectedPracticeDomains, includeMissedInMock, practiceQuestionCount]);

  const currentPracticeQ = activePracticeQuestions[practiceCurrentIndex] || activePracticeQuestions[0];
  const totalPracticeQCount = activePracticeQuestions.length;

  const currentQ = mockQuestions[currentIndex % mockQuestions.length];
  const questionNumber = currentIndex + 1;
  const isCurrentFlagged = !!flaggedQuestions[currentIndex];

  // Option Selection & Strikeout Handlers
  const handleSelectOption = (optId: "A" | "B" | "C" | "D") => {
    const currentStruck = strikeouts[currentIndex] || [];
    if (currentStruck.includes(optId)) {
      setStrikeouts({
        ...strikeouts,
        [currentIndex]: currentStruck.filter((s) => s !== optId)
      });
    }
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optId
    });
  };

  const handleToggleStrikeout = (optId: "A" | "B" | "C" | "D", e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStruck = strikeouts[currentIndex] || [];
    const isStruck = currentStruck.includes(optId);

    if (isStruck) {
      setStrikeouts({
        ...strikeouts,
        [currentIndex]: currentStruck.filter((s) => s !== optId)
      });
    } else {
      setStrikeouts({
        ...strikeouts,
        [currentIndex]: [...currentStruck, optId]
      });
      if (selectedAnswers[currentIndex] === optId) {
        const updated = { ...selectedAnswers };
        delete updated[currentIndex];
        setSelectedAnswers(updated);
      }
    }
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [currentIndex]: !isCurrentFlagged
    });
  };

  const handleToggleHighlight = () => {
    setHighlightedQuestions({
      ...highlightedQuestions,
      [currentIndex]: !highlightedQuestions[currentIndex]
    });
  };

  const handleZoomCycle = () => {
    if (zoomLevel === 100) setZoomLevel(125);
    else if (zoomLevel === 125) setZoomLevel(150);
    else setZoomLevel(100);
  };

  // Calculator State & Engine
  const [calcDisplay, setCalcDisplay] = useState("250");
  const [calcFormula, setCalcFormula] = useState("1250 × 0.2");
  const [calcWaitingForOperand, setCalcWaitingForOperand] = useState(false);
  const [calcPrevValue, setCalcPrevValue] = useState<number | null>(null);
  const [calcOperation, setCalcOperation] = useState<string | null>(null);

  const handleCalcInputDigit = (digit: string) => {
    if (calcWaitingForOperand) {
      setCalcDisplay(digit);
      setCalcWaitingForOperand(false);
    } else {
      setCalcDisplay(calcDisplay === "0" ? digit : calcDisplay + digit);
    }
  };

  const handleCalcDot = () => {
    if (calcWaitingForOperand) {
      setCalcDisplay("0.");
      setCalcWaitingForOperand(false);
    } else if (!calcDisplay.includes(".")) {
      setCalcDisplay(calcDisplay + ".");
    }
  };

  const handleCalcClear = () => {
    setCalcDisplay("0");
    setCalcFormula("");
    setCalcPrevValue(null);
    setCalcOperation(null);
    setCalcWaitingForOperand(false);
  };

  const handleCalcClearEntry = () => {
    setCalcDisplay("0");
  };

  const handleCalcBackspace = () => {
    if (calcDisplay.length > 1) {
      setCalcDisplay(calcDisplay.slice(0, -1));
    } else {
      setCalcDisplay("0");
    }
  };

  const handleCalcPlusMinus = () => {
    const val = parseFloat(calcDisplay);
    if (!isNaN(val)) {
      setCalcDisplay((-val).toString());
    }
  };

  const handleCalcOperator = (nextOp: string) => {
    const inputValue = parseFloat(calcDisplay);

    if (calcPrevValue === null) {
      setCalcPrevValue(inputValue);
      setCalcFormula(`${calcDisplay} ${nextOp}`);
    } else if (calcOperation) {
      const current = calcPrevValue || 0;
      let result = current;
      if (calcOperation === "+") result = current + inputValue;
      else if (calcOperation === "−") result = current - inputValue;
      else if (calcOperation === "×") result = current * inputValue;
      else if (calcOperation === "÷") result = inputValue !== 0 ? current / inputValue : 0;

      setCalcDisplay(String(result));
      setCalcPrevValue(result);
      setCalcFormula(`${result} ${nextOp}`);
    }

    setCalcWaitingForOperand(true);
    setCalcOperation(nextOp);
  };

  const handleCalcEquals = () => {
    const inputValue = parseFloat(calcDisplay);
    if (calcPrevValue !== null && calcOperation) {
      let result = calcPrevValue;
      if (calcOperation === "+") result = calcPrevValue + inputValue;
      else if (calcOperation === "−") result = calcPrevValue - inputValue;
      else if (calcOperation === "×") result = calcPrevValue * inputValue;
      else if (calcOperation === "÷") result = inputValue !== 0 ? calcPrevValue / inputValue : 0;

      setCalcFormula(`${calcPrevValue} ${calcOperation} ${inputValue}`);
      setCalcDisplay(String(result));
      setCalcPrevValue(null);
      setCalcOperation(null);
      setCalcWaitingForOperand(true);
    }
  };

  // Full-Screen Whiteboard State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [whiteboardMode, setWhiteboardMode] = useState<"DRAW" | "TEXT" | "SPLIT">("DRAW");
  const [penColor, setPenColor] = useState("#1F2937");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [whiteboardText, setWhiteboardText] = useState("");

  // Native Text Selection & Long-Press Markup State
  const [floatingMenu, setFloatingMenu] = useState<{
    x: number;
    y: number;
    selectedText: string;
    hasHighlight?: boolean;
    hasStrike?: boolean;
    targetElement?: HTMLElement | null;
  } | null>(null);
  const currentSelectionRangeRef = useRef<Range | null>(null);
  const [questionMarkups, setQuestionMarkups] = useState<Record<number, { stemHtml?: string; optionsHtml?: Record<string, string> }>>({});
  const stemContainerRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-resize canvas to fill parent viewport crisp & responsive
  useEffect(() => {
    if (!isWhiteboardOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const timer = setTimeout(() => {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const ctx = canvas.getContext("2d");
        let tempImage: ImageData | null = null;
        if (ctx && canvas.width > 0 && canvas.height > 0) {
          try {
            tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
          } catch (e) {}
        }
        canvas.width = rect.width;
        canvas.height = rect.height;
        if (ctx && tempImage) {
          ctx.putImageData(tempImage, 0, 0);
        }
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [isWhiteboardOpen, whiteboardMode]);

  // Canvas Mouse & Touch Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = isEraserActive ? "#FFFFFF" : penColor;
    ctx.lineWidth = isEraserActive ? strokeWidth * 4 : strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.strokeStyle = isEraserActive ? "#FFFFFF" : penColor;
    ctx.lineWidth = isEraserActive ? strokeWidth * 4 : strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleClearWhiteboard = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setWhiteboardText("");
  };

  // Save Question DOM Markup to State
  const saveQuestionDomMarkup = () => {
    if (!stemContainerRef.current) return;
    const stemHtml = stemContainerRef.current.innerHTML;
    const optHtmls: Record<string, string> = {};
    currentQ.options.forEach((opt) => {
      const el = optionRefs.current[opt.id];
      if (el) optHtmls[opt.id] = el.innerHTML;
    });
    setQuestionMarkups((prev) => ({
      ...prev,
      [currentIndex]: { stemHtml, optionsHtml: optHtmls },
    }));
  };

  // Sync Question DOM on question index change
  useEffect(() => {
    const qMarkup = questionMarkups[currentIndex];
    if (stemContainerRef.current) {
      if (qMarkup?.stemHtml !== undefined) {
        stemContainerRef.current.innerHTML = qMarkup.stemHtml;
      } else {
        const defaultHtml = currentQ.keyPhrase
          ? `${currentQ.stem} <mark class="exam-highlight bg-amber-200 text-gray-900 rounded-[2px] px-0.5 cursor-pointer hover:bg-amber-300 transition-colors" title="Highlighted text (tap to remove)">${currentQ.keyPhrase}</mark>`
          : currentQ.stem;
        stemContainerRef.current.innerHTML = defaultHtml;
      }
    }

    currentQ.options.forEach((opt) => {
      const el = optionRefs.current[opt.id];
      if (el) {
        if (qMarkup?.optionsHtml?.[opt.id] !== undefined) {
          el.innerHTML = qMarkup.optionsHtml[opt.id];
        } else {
          el.innerHTML = opt.text;
        }
      }
    });
    setFloatingMenu(null);
  }, [currentIndex]);

  // Selection Change Listener (Desktop Mouse & Mobile Touch)
  useEffect(() => {
    const handleSelectionCheck = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setFloatingMenu(null);
        currentSelectionRangeRef.current = null;
        return;
      }

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element = container.nodeType === Node.ELEMENT_NODE ? (container as Element) : container.parentElement;

      // Check if selection is within our selectable question area
      const isInside = element?.closest(".exam-selectable-text");
      if (!isInside) {
        setFloatingMenu(null);
        currentSelectionRangeRef.current = null;
        return;
      }

      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setFloatingMenu(null);
        return;
      }

      const hasHighlight = !!element?.closest(".exam-highlight");
      const hasStrike = !!element?.closest(".exam-strikethrough");
      const targetElement = (hasHighlight ? element?.closest(".exam-highlight") : hasStrike ? element?.closest(".exam-strikethrough") : null) as HTMLElement | null;

      currentSelectionRangeRef.current = range.cloneRange();
      setFloatingMenu({
        x: Math.max(80, Math.min(window.innerWidth - 80, rect.left + rect.width / 2)),
        y: Math.max(10, rect.top - 10),
        selectedText: selection.toString().trim(),
        hasHighlight,
        hasStrike,
        targetElement,
      });
    };

    const handleMouseUp = () => {
      setTimeout(handleSelectionCheck, 20);
    };

    const handleTouchEnd = () => {
      setTimeout(handleSelectionCheck, 60);
    };

    document.addEventListener("selectionchange", handleSelectionCheck);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionCheck);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Open contextual menu above an existing highlight or strikethrough element
  const openMenuForElement = (el: HTMLElement) => {
    const isHighlight = !!el.closest(".exam-highlight");
    const isStrike = !!el.closest(".exam-strikethrough");
    const rect = el.getBoundingClientRect();

    setFloatingMenu({
      x: Math.max(80, Math.min(window.innerWidth - 80, rect.left + rect.width / 2)),
      y: Math.max(10, rect.top - 10),
      selectedText: el.innerText,
      hasHighlight: isHighlight,
      hasStrike: isStrike,
      targetElement: el,
    });
  };

  // Apply Highlight to Current Selection
  const handleApplyHighlight = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const range = currentSelectionRangeRef.current;
    if (!range) return;

    const mark = document.createElement("mark");
    mark.className = "exam-highlight bg-amber-200 text-gray-900 rounded-[2px] px-0.5 cursor-pointer hover:bg-amber-300 transition-colors";
    mark.title = "Highlighted text (long press to clear)";
    try {
      const contents = range.extractContents();
      mark.appendChild(contents);
      range.insertNode(mark);
    } catch (err) {}

    window.getSelection()?.removeAllRanges();
    setFloatingMenu(null);
    currentSelectionRangeRef.current = null;
    saveQuestionDomMarkup();
  };

  // Clear Highlight from Target or Current Selection
  const handleClearHighlight = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const targetEl = (floatingMenu?.targetElement?.closest(".exam-highlight") || currentSelectionRangeRef.current?.commonAncestorContainer.parentElement?.closest(".exam-highlight")) as HTMLElement | null;
    if (targetEl && targetEl.parentNode) {
      while (targetEl.firstChild) {
        targetEl.parentNode.insertBefore(targetEl.firstChild, targetEl);
      }
      targetEl.parentNode.removeChild(targetEl);
      saveQuestionDomMarkup();
    }
    window.getSelection()?.removeAllRanges();
    setFloatingMenu(null);
    currentSelectionRangeRef.current = null;
  };

  // Apply Strike to Current Selection
  const handleApplyStrike = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const range = currentSelectionRangeRef.current;
    if (!range) return;

    const span = document.createElement("span");
    span.className = "exam-strikethrough line-through text-gray-400 decoration-gray-400 decoration-2 cursor-pointer hover:text-gray-600 transition-colors";
    span.title = "Struck text (long press to clear)";
    try {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    } catch (err) {}

    window.getSelection()?.removeAllRanges();
    setFloatingMenu(null);
    currentSelectionRangeRef.current = null;
    saveQuestionDomMarkup();
  };

  // Clear Strike from Target or Current Selection
  const handleClearStrike = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const targetEl = (floatingMenu?.targetElement?.closest(".exam-strikethrough") || currentSelectionRangeRef.current?.commonAncestorContainer.parentElement?.closest(".exam-strikethrough")) as HTMLElement | null;
    if (targetEl && targetEl.parentNode) {
      while (targetEl.firstChild) {
        targetEl.parentNode.insertBefore(targetEl.firstChild, targetEl);
      }
      targetEl.parentNode.removeChild(targetEl);
      saveQuestionDomMarkup();
    }
    window.getSelection()?.removeAllRanges();
    setFloatingMenu(null);
    currentSelectionRangeRef.current = null;
  };

  // Tap on existing highlighted or struck text to show options
  const handleMarkupClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const highlightEl = target.closest(".exam-highlight") as HTMLElement | null;
    const strikeEl = target.closest(".exam-strikethrough") as HTMLElement | null;

    if (highlightEl || strikeEl) {
      openMenuForElement((highlightEl || strikeEl)!);
    }
  };

  // Right-click Context Menu on Desktop
  const handleContextMenuText = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const highlightEl = target.closest(".exam-highlight") as HTMLElement | null;
    const strikeEl = target.closest(".exam-strikethrough") as HTMLElement | null;

    if (highlightEl || strikeEl) {
      e.preventDefault();
      e.stopPropagation();
      openMenuForElement((highlightEl || strikeEl)!);
    }
  };

  // Touch Long Press Helper
  const handleTouchStartText = (e: React.TouchEvent) => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    const touch = e.touches[0];
    const clientX = touch.clientX;
    const clientY = touch.clientY;
    const target = e.target as HTMLElement;
    const highlightEl = target.closest(".exam-highlight") as HTMLElement | null;
    const strikeEl = target.closest(".exam-strikethrough") as HTMLElement | null;

    longPressTimerRef.current = setTimeout(() => {
      if (highlightEl || strikeEl) {
        openMenuForElement((highlightEl || strikeEl)!);
      } else {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          let range: Range | null = null;
          if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(clientX, clientY);
          }
          if (range) {
            selection?.removeAllRanges();
            selection?.addRange(range);
            try {
              (selection as any)?.modify?.("move", "backward", "word");
              (selection as any)?.modify?.("extend", "forward", "word");
            } catch (err) {}
          }
        }
      }
    }, 380);
  };

  const handleTouchEndText = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Review Summary
  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = mockQuestions.length - answeredCount;

  const filteredQuestions = mockQuestions.filter((_, idx) => {
    if (reviewFilter === "FLAGGED") return !!flaggedQuestions[idx];
    if (reviewFilter === "UNANSWERED") return selectedAnswers[idx] === undefined;
    return true;
  });

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted font-sans select-none">
      {/* 1. Header (Strictly matching Skyscape Product Design System: h-[56px] bg-primary) */}
      <header className="h-[56px] shrink-0 bg-primary flex items-center justify-between px-3 gap-2 z-20 shadow-sm relative text-white">
        {/* Left: Back / Exit with Confirmation */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={() => {
              if (isExamCompleted) {
                setViewMode("EXAM_COMPLETE");
              } else {
                setIsExitModalOpen(true);
              }
            }}
            aria-label={isExamCompleted ? "Return to results" : "Exit exam"}
            className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={2} />
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-[15px] font-semibold tracking-tight truncate leading-tight">
              {title}
            </span>
            <span className="text-white/80 text-[11px] font-normal truncate">
              {isExamCompleted ? "Completed Exam Review" : "Full Mock Exam"}
            </span>
          </div>
        </div>

        {/* Right: Timer & Question Counter Pills styled with product glass tokens */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Time Remaining Pill */}
          <button
            onClick={() => setIsTimeHidden(!isTimeHidden)}
            aria-label="Show or hide time remaining"
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-[3px] py-1.5 px-2.5 text-xs font-medium transition-colors cursor-pointer backdrop-blur-xs"
          >
            <Clock className="w-3.5 h-3.5 text-white/90 shrink-0" />
            <span className="tabular-nums">
              {isTimeHidden ? "Timer hidden" : formatTimer(timeRemainingSeconds)}
            </span>
          </button>

          {/* Progress / Review Pill */}
          <button
            onClick={() => setIsReviewOpen(true)}
            aria-label="Review questions grid"
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-[3px] py-1.5 px-2.5 text-xs font-medium transition-colors cursor-pointer backdrop-blur-xs"
          >
            <List className="w-3.5 h-3.5 text-white/90 shrink-0" />
            <span className="tabular-nums font-semibold">{questionNumber}/{totalQuestions}</span>
          </button>
        </div>
      </header>

      {/* Review Mode Banner */}
      {isExamCompleted && (
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 flex items-center justify-between text-xs text-amber-900 shrink-0 z-20">
          <span className="font-semibold">Reviewing Question {questionNumber} of {totalQuestions}</span>
          <button
            onClick={() => setViewMode("EXAM_COMPLETE")}
            className="px-2.5 py-1 bg-[#23466e] hover:bg-[#1a3554] text-white rounded-[3px] font-medium cursor-pointer transition-colors"
          >
            Return to Results
          </button>
        </div>
      )}

      {/* 2. Exam Tools Navigation Bar (Clean Product Surface with rounded-[3px]) */}
      <nav
        aria-label="Exam tools"
        className="flex items-center gap-1 px-3 py-1.5 border-b border-gray-200 bg-white shrink-0 z-10 shadow-2xs"
      >
        {/* Calculator Button */}
        <button
          onClick={() => {
            setCalcDisplay("250");
            setCalcFormula("1250 × 0.2");
            setIsCalculatorOpen(true);
          }}
          aria-label="Calculator"
          title="Calculator tool"
          className="w-9 h-9 rounded-[3px] text-secondary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all cursor-pointer border border-transparent hover:border-primary/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <rect x="8" y="7" width="8" height="3" rx="1" />
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
          </svg>
        </button>

        {/* Highlighter Tool */}
        <button
          onClick={() => {
            if (currentSelectionRangeRef.current && !currentSelectionRangeRef.current.collapsed) {
              handleApplyHighlight();
            } else {
              setShowHighlights((prev) => !prev);
            }
          }}
          aria-label={showHighlights ? "Highlights visible (click to toggle or highlight selection)" : "Highlights hidden (click to show)"}
          title={showHighlights ? "Highlighter ON: Highlights visible (Click with text selected to highlight, or click to toggle visibility)" : "Highlighter OFF: Click to show highlights"}
          className={`w-9 h-9 rounded-[3px] flex items-center justify-center transition-all cursor-pointer border ${
            showHighlights
              ? "bg-amber-100 border-amber-300 text-amber-950 shadow-2xs"
              : "border-transparent text-secondary hover:text-primary hover:bg-primary/5 hover:border-primary/20 opacity-60"
          }`}
        >
          <Highlighter className="w-[18px] h-[18px]" />
        </button>

        {/* Strikethrough Tool */}
        <button
          onClick={() => {
            if (currentSelectionRangeRef.current && !currentSelectionRangeRef.current.collapsed) {
              handleApplyStrike();
            } else {
              setShowStrikeouts((prev) => !prev);
            }
          }}
          aria-label={showStrikeouts ? "Strikeouts visible (click to toggle or strike selection)" : "Strikeouts hidden (click to show)"}
          title={showStrikeouts ? "Strikeout ON: Strikeouts visible (Click with text selected to strike, or click to toggle visibility)" : "Strikeout OFF: Click to show strikeouts"}
          className={`w-9 h-9 rounded-[3px] flex items-center justify-center transition-all cursor-pointer border ${
            showStrikeouts
              ? "bg-gray-200 border-gray-400 text-gray-900 shadow-2xs"
              : "border-transparent text-secondary hover:text-primary hover:bg-primary/5 hover:border-primary/20 opacity-60"
          }`}
        >
          <Strikethrough className="w-[18px] h-[18px]" />
        </button>

        {/* Whiteboard / Scratchpad Tool */}
        <button
          onClick={() => setIsWhiteboardOpen(true)}
          aria-label="Whiteboard notes"
          title="Open Mobile Whiteboard & Scratchpad"
          className="w-9 h-9 rounded-[3px] text-secondary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all cursor-pointer border border-transparent hover:border-primary/20"
        >
          <Presentation className="w-[18px] h-[18px]" />
        </button>

        {/* Zoom Tool */}
        <button
          onClick={handleZoomCycle}
          aria-label="Adjust font size"
          title="Toggle zoom level"
          className="min-w-[36px] h-9 px-1.5 rounded-[3px] text-secondary hover:text-primary hover:bg-primary/5 font-semibold text-xs flex items-center justify-center transition-all cursor-pointer border border-transparent hover:border-primary/20"
        >
          <span>{zoomLevel}%</span>
        </button>

        <span className="flex-1" />

        {/* Flag for Review Button with Product Styling */}
        <button
          onClick={handleToggleFlag}
          aria-label="Flag question for review"
          className={`flex items-center gap-1.5 min-h-[34px] px-2.5 rounded-[3px] border text-xs font-medium transition-all cursor-pointer ${
            isCurrentFlagged
              ? "bg-primary/10 border-primary text-primary shadow-xs font-semibold"
              : "bg-white border-gray-200 text-secondary hover:text-primary hover:border-primary/40"
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? "fill-primary text-primary" : "text-secondary"}`} />
          <span>{isCurrentFlagged ? "Flagged" : "Flag for review"}</span>
        </button>
      </nav>

      {/* 3. Main Question Content Area with Dynamic Zoom & Product Cards */}
      <main
        className={`flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide ${!showHighlights ? "hide-highlights" : ""} ${!showStrikeouts ? "hide-strikeouts" : ""}`}
        style={{
          fontSize: zoomLevel === 100 ? "15px" : zoomLevel === 125 ? "17px" : "19px"
        }}
      >
        {/* Question Card Container matching Product Design System */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs select-none">
            <span className="font-semibold text-secondary uppercase tracking-wider text-[11.5px]">
              {currentQ.domain}
            </span>
            <span className="text-gray-400 font-normal">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>

          {/* Question Stem with Interactive Highlight & Strike */}
          <div
            ref={stemContainerRef}
            onClick={handleMarkupClick}
            onContextMenu={handleContextMenuText}
            onTouchStart={handleTouchStartText}
            onTouchEnd={handleTouchEndText}
            className="exam-selectable-text text-gray-800 leading-[1.6] font-normal select-text cursor-text"
          />
        </div>

        {/* Answer Options Radio Group */}
        <div role="radiogroup" aria-label="Answer options" className="flex flex-col gap-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswers[currentIndex] === opt.id;
            const isStruck = showStrikeouts && (strikeouts[currentIndex] || []).includes(opt.id);

            return (
              <div key={opt.id} className="flex items-stretch gap-2">
                {/* Main Option Card */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isStruck}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`flex-1 flex items-start gap-3 p-3.5 rounded-[3px] border text-left transition-all cursor-pointer ${
                    isStruck
                      ? "border-gray-200 bg-gray-50/70 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "border-primary bg-primary/5 text-gray-900 shadow-xs"
                      : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
                  }`}
                >
                  {/* Radio Indicator (Consistent with CandidateAgreement & Quiz Mode) */}
                  <span
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all select-none ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : isStruck
                        ? "border-gray-300 bg-gray-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>

                  {/* Option Label & Text */}
                  <span className={`text-[14px] leading-snug ${isStruck ? "line-through text-gray-400" : ""}`}>
                    <strong className="mr-1.5 font-semibold text-secondary select-none">{opt.id}.</strong>
                    <span
                      ref={(el) => {
                        optionRefs.current[opt.id] = el;
                      }}
                      onClick={handleMarkupClick}
                      onContextMenu={handleContextMenuText}
                      onTouchStart={handleTouchStartText}
                      onTouchEnd={handleTouchEndText}
                      className="exam-selectable-text select-text cursor-text"
                    />
                  </span>
                </button>

                {/* Strikethrough Action Button */}
                <button
                  type="button"
                  aria-label={`Cross out option ${opt.id}`}
                  title={isStruck ? "Restore option" : "Cross out option"}
                  onClick={(e) => handleToggleStrikeout(opt.id, e)}
                  className={`w-11 rounded-[3px] border flex items-center justify-center transition-all cursor-pointer shrink-0 select-none ${
                    isStruck
                      ? "border-gray-300 bg-gray-100 text-gray-700 shadow-inner"
                      : "border-gray-200 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* 4. Footer Actions (Previous, Review, Next) strictly matching Product Design System */}
      <footer className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] p-3 px-4 flex gap-2.5 z-10">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className={`flex-1 min-h-[46px] rounded-[3px] border font-medium text-sm transition-all flex items-center justify-center gap-1 ${
            currentIndex === 0
              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border-gray-200 bg-white hover:border-gray-300 text-secondary cursor-pointer shadow-sm active:scale-[0.99]"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => setIsReviewOpen(true)}
          className="flex-1 min-h-[46px] rounded-[3px] border border-gray-200 hover:border-primary/50 bg-white hover:bg-gray-50 text-secondary hover:text-primary font-medium text-sm transition-all cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center"
        >
          Review ({answeredCount}/{mockQuestions.length})
        </button>

        <button
          onClick={() => {
            if (currentIndex < mockQuestions.length - 1) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              setIsReviewOpen(true);
            }
          }}
          className="flex-1 min-h-[46px] rounded-[3px] bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center gap-1"
        >
          <span>{currentIndex === mockQuestions.length - 1 ? "Finish" : "Next"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* 5. Authentic Test-Center Calculator Drawer (Redesigned to Match Product Tokens) */}
      {isCalculatorOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150">
          <div
            className="w-full bg-white rounded-t-[12px] p-4 pb-5 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-bottom duration-200 border-t border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-10 h-1.5 rounded-full bg-gray-300 mx-auto shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <h2 className="text-[15px] font-medium text-secondary">Calculator</h2>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                aria-label="Close calculator"
                className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula & Numeric Display */}
            <div className="border border-gray-200 rounded-[3px] p-3 text-right bg-gray-50/70">
              <div className="text-xs text-gray-500 font-medium min-h-[18px] tabular-nums">
                {calcFormula}
              </div>
              <div className="text-[30px] font-bold text-gray-900 tabular-nums leading-tight truncate">
                {calcDisplay}
              </div>
            </div>

            {/* Keypad Grid with Product Button Tokens */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleCalcClear}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-secondary transition-colors cursor-pointer"
              >
                C
              </button>
              <button
                onClick={handleCalcClearEntry}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-secondary transition-colors cursor-pointer"
              >
                CE
              </button>
              <button
                onClick={handleCalcBackspace}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-secondary transition-colors cursor-pointer"
              >
                ⌫
              </button>
              <button
                onClick={() => handleCalcOperator("÷")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-base text-secondary transition-colors cursor-pointer"
              >
                ÷
              </button>

              <button
                onClick={() => handleCalcInputDigit("7")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                7
              </button>
              <button
                onClick={() => handleCalcInputDigit("8")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                8
              </button>
              <button
                onClick={() => handleCalcInputDigit("9")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                9
              </button>
              <button
                onClick={() => handleCalcOperator("×")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-base text-secondary transition-colors cursor-pointer"
              >
                ×
              </button>

              <button
                onClick={() => handleCalcInputDigit("4")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                4
              </button>
              <button
                onClick={() => handleCalcInputDigit("5")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                5
              </button>
              <button
                onClick={() => handleCalcInputDigit("6")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                6
              </button>
              <button
                onClick={() => handleCalcOperator("−")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-base text-secondary transition-colors cursor-pointer"
              >
                −
              </button>

              <button
                onClick={() => handleCalcInputDigit("1")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                1
              </button>
              <button
                onClick={() => handleCalcInputDigit("2")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                2
              </button>
              <button
                onClick={() => handleCalcInputDigit("3")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                3
              </button>
              <button
                onClick={() => handleCalcOperator("+")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-base text-secondary transition-colors cursor-pointer"
              >
                +
              </button>

              <button
                onClick={handleCalcPlusMinus}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-secondary transition-colors cursor-pointer"
              >
                ±
              </button>
              <button
                onClick={() => handleCalcInputDigit("0")}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-white hover:bg-gray-50 text-base text-gray-800 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                0
              </button>
              <button
                onClick={handleCalcDot}
                className="min-h-[46px] rounded-[3px] border border-gray-200 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-secondary transition-colors cursor-pointer"
              >
                .
              </button>
              <button
                onClick={handleCalcEquals}
                className="min-h-[46px] rounded-[3px] bg-primary hover:bg-primary/90 font-semibold text-lg text-white shadow-sm transition-colors cursor-pointer"
              >
                =
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-1">
              Clears when closed, like the test-center calculator.
            </p>
          </div>
        </div>
      )}

      {/* 6. Mobile Viewport-Contained Whiteboard / Scratchpad Experience */}
      {isWhiteboardOpen && (
        <div className="absolute inset-0 z-50 flex flex-col bg-slate-50 animate-in fade-in duration-150 select-none">
          {/* Top Header */}
          <header className="h-[56px] shrink-0 bg-primary text-white flex items-center justify-between px-4 shadow-sm z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[3px] bg-white/15 flex items-center justify-center">
                <Presentation className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[15px] font-semibold leading-tight">
                  Candidate Whiteboard
                </span>
                <span className="text-white/80 text-[11px]">
                  Mobile Scratchpad • {title}
                </span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearWhiteboard}
                className="px-2.5 py-1.5 text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-[3px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                title="Clear canvas and notes"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={() => setIsWhiteboardOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-secondary hover:text-primary rounded-[3px] text-xs font-semibold transition-colors cursor-pointer shadow-sm ml-1"
                title="Return to exam"
              >
                <X className="w-4 h-4" />
                <span>Close & Return</span>
              </button>
            </div>
          </header>

          {/* Whiteboard Secondary Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 shrink-0 flex items-center justify-between gap-3 flex-wrap shadow-2xs">
            {/* Mode Switcher */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-[4px] border border-gray-200">
              <button
                onClick={() => setWhiteboardMode("DRAW")}
                className={`px-3 py-1 text-xs font-medium rounded-[3px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  whiteboardMode === "DRAW"
                    ? "bg-white text-secondary shadow-xs font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Pen className="w-3.5 h-3.5" />
                <span>Drawing Board</span>
              </button>
              <button
                onClick={() => setWhiteboardMode("TEXT")}
                className={`px-3 py-1 text-xs font-medium rounded-[3px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  whiteboardMode === "TEXT"
                    ? "bg-white text-secondary shadow-xs font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Typed Scratchpad</span>
              </button>
              <button
                onClick={() => setWhiteboardMode("SPLIT")}
                className={`hidden sm:flex px-3 py-1 text-xs font-medium rounded-[3px] transition-all cursor-pointer items-center gap-1.5 ${
                  whiteboardMode === "SPLIT"
                    ? "bg-white text-secondary shadow-xs font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>
            </div>

            {/* Drawing Tools (Colors, Widths, Eraser) */}
            {(whiteboardMode === "DRAW" || whiteboardMode === "SPLIT") && (
              <div className="flex items-center gap-3">
                {/* Pen Colors */}
                <div className="flex items-center gap-1.5">
                  {[
                    { id: "black", color: "#1F2937", label: "Black" },
                    { id: "blue", color: "#2563EB", label: "Blue" },
                    { id: "red", color: "#C6364C", label: "Crimson" },
                    { id: "yellow", color: "#EAB308", label: "Highlight" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setPenColor(c.color);
                        setIsEraserActive(false);
                      }}
                      title={c.label}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                        penColor === c.color && !isEraserActive
                          ? "scale-115 border-primary shadow-xs"
                          : "border-white hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>

                <div className="w-px h-5 bg-gray-200" />

                {/* Stroke Widths */}
                <div className="flex items-center gap-1">
                  {[2, 4, 7].map((w) => (
                    <button
                      key={w}
                      onClick={() => setStrokeWidth(w)}
                      className={`w-7 h-7 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer border ${
                        strokeWidth === w
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                      title={`${w}px line`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{ width: `${w + 1}px`, height: `${w + 1}px` }}
                      />
                    </button>
                  ))}
                </div>

                <div className="w-px h-5 bg-gray-200" />

                {/* Eraser */}
                <button
                  onClick={() => setIsEraserActive(!isEraserActive)}
                  className={`px-2.5 py-1 text-xs rounded-[3px] border transition-colors cursor-pointer flex items-center gap-1 ${
                    isEraserActive
                      ? "bg-primary text-white border-primary"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  title="Eraser tool"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
              </div>
            )}
          </div>

          {/* Full Screen Canvas & Text Area */}
          <div className="flex-1 overflow-hidden relative flex">
            {/* Canvas */}
            {(whiteboardMode === "DRAW" || whiteboardMode === "SPLIT") && (
              <div className={`flex-1 h-full relative bg-white overflow-hidden ${whiteboardMode === "SPLIT" ? "border-r border-gray-200" : ""}`}>
                {/* Scratchpad Grid Background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                    backgroundSize: "22px 22px"
                  }}
                />
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full h-full cursor-crosshair touch-none relative z-10"
                />
              </div>
            )}

            {/* Typed Notes */}
            {(whiteboardMode === "TEXT" || whiteboardMode === "SPLIT") && (
              <div className="flex-1 h-full flex flex-col p-4 bg-white relative">
                <textarea
                  value={whiteboardText}
                  onChange={(e) => setWhiteboardText(e.target.value)}
                  placeholder="Type notes, math calculations, test formulas, or scratch memory joggers here..."
                  className="w-full flex-1 border border-gray-200 rounded-[3px] p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-secondary resize-none font-mono leading-relaxed select-text"
                />
              </div>
            )}
          </div>

          {/* Bottom Status Notice */}
          <div className="h-8 bg-gray-50 border-t border-gray-200 px-4 flex items-center justify-between text-[11px] text-gray-400 shrink-0">
            <span>Candidate scratchpad clears automatically when concluding the exam</span>
            <span>Pearson VUE Authentic Simulation</span>
          </div>
        </div>
      )}

      {/* 7. Review Screen Drawer (Aligned with Product Design System) */}
      {isReviewOpen && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background-muted animate-in fade-in duration-150">
          {/* Header */}
          <div className="h-[56px] shrink-0 bg-primary text-white flex items-center justify-between px-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg font-normal tracking-wide">Review Questions</span>
            </div>
            <button
              onClick={() => setIsReviewOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats Bar Card */}
          <div className="p-3 bg-white border-b border-gray-200 shadow-2xs flex justify-around text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Answered: <strong className="text-gray-900">{answeredCount}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span>Unanswered: <strong className="text-gray-900">{unansweredCount}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-primary fill-primary" />
              <span>Flagged: <strong className="text-primary">{flaggedCount}</strong></span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-3 pt-2.5 flex gap-1.5 shrink-0">
            {(["ALL", "UNANSWERED", "FLAGGED"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setReviewFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[3px] border transition-colors cursor-pointer ${
                  reviewFilter === tab
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-secondary border-gray-200 hover:border-gray-300"
                }`}
              >
                {tab === "ALL" ? `All (${mockQuestions.length})` : tab === "UNANSWERED" ? `Unanswered (${unansweredCount})` : `Flagged (${flaggedCount})`}
              </button>
            ))}
          </div>

          {/* Question List Card */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scrollbar-hide">
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] overflow-hidden divide-y divide-gray-100">
              {filteredQuestions.map((q) => {
                const idx = mockQuestions.findIndex((mq) => mq.id === q.id);
                const isAns = selectedAnswers[idx] !== undefined;
                const isFlag = !!flaggedQuestions[idx];
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsReviewOpen(false);
                    }}
                    className={`w-full p-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-primary/5 text-gray-900"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-[3px] font-bold text-xs flex items-center justify-center shrink-0 ${
                        isCurrent ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-medium truncate max-w-[210px] leading-snug">
                          {q.stem}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {q.domain}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isFlag && (
                        <Flag className="w-4 h-4 text-primary fill-primary shrink-0" />
                      )}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-[3px] border ${
                          isAns
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {isAns ? `Option ${selectedAnswers[idx]}` : "Incomplete"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 px-4 border-t border-gray-200 bg-white flex gap-2.5">
            <button
              onClick={() => setIsReviewOpen(false)}
              className="flex-1 min-h-[44px] border border-gray-200 font-medium text-xs rounded-[3px] text-secondary hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
            >
              Return to Exam
            </button>
            <button
              onClick={() => {
                setIsReviewOpen(false);
                setIsSubmitConfirmOpen(true);
              }}
              className="flex-1 min-h-[44px] bg-primary hover:bg-primary/90 text-white font-medium text-xs rounded-[3px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Submit Exam</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 8. Submit Confirmation Modal */}
      {isSubmitConfirmOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] border border-gray-200 max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-semibold text-secondary text-lg">Submit Mock Exam?</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                You have answered <strong>{answeredCount}</strong> of <strong>{mockQuestions.length}</strong> questions ({unansweredCount} unanswered).
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded-[3px] border border-gray-200 text-xs text-gray-700 font-medium">
                Once submitted, you cannot change any answers. Your results and diagnostics will be calculated immediately.
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsSubmitConfirmOpen(false)}
                className="flex-1 py-3 border border-gray-200 font-medium text-xs rounded-[3px] hover:bg-gray-50 text-secondary cursor-pointer"
              >
                Return to Exam
              </button>
              <button
                onClick={() => {
                  setIsSubmitConfirmOpen(false);
                  setIsExamCompleted(true);
                  setViewMode("EXAM_COMPLETE");
                }}
                className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-medium text-xs rounded-[3px] shadow-sm cursor-pointer"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Exit Confirmation Modal */}
      {isExitModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] border border-gray-200 max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-rose-50 text-primary rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-semibold text-secondary text-lg">Exit Mock Exam?</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Leaving the mock exam session will pause your attempt. You can resume it from your Mock Exam dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsExitModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 font-medium text-xs rounded-[3px] hover:bg-gray-50 text-secondary cursor-pointer"
                >
                  Continue Exam
                </button>
                <button
                  onClick={() => router.push("/mock-exam")}
                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-medium text-xs rounded-[3px] shadow-sm cursor-pointer"
                >
                  Exit to Dashboard
                </button>
              </div>
              <button
                onClick={() => {
                  setIsExitModalOpen(false);
                  setAttemptStoppedAt(currentIndex + 1);
                  const elapsed = 10270 - timeRemainingSeconds;
                  setAttemptTimeUsed(formatTimer(elapsed > 0 ? elapsed : 47 * 60 + 50));
                  setViewMode("ATTEMPT_ENDED");
                }}
                className="w-full py-2.5 text-xs text-rose-600 hover:bg-rose-50 rounded-[3px] border border-rose-200 font-medium transition-colors cursor-pointer"
              >
                Simulate Leaving App (End Attempt)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 1: EXAM COMPLETE SCREEN (Strict Product Design System & Scored Info)
         ========================================================================= */}
      {viewMode === "EXAM_COMPLETE" && (
        <div className="absolute inset-0 z-40 bg-background-muted flex flex-col text-gray-800 select-none overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <header className="h-[56px] shrink-0 bg-primary text-white flex items-center justify-between px-3.5 shadow-sm relative z-10">
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                onClick={() => router.push("/mock-exam")}
                aria-label="Back to mock exams"
                className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" strokeWidth={2} />
              </button>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-[15px] font-semibold tracking-tight truncate leading-tight">
                  Exam Results
                </span>
                <span className="text-white/80 text-[11px] font-normal truncate">
                  {title} • 180 Questions Completed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsScoringInfoOpen(true)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-[3px] bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Official Scaled Score details"
            >
              
              <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[10px] font-bold">?</span>
            </button>
          </header>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide">
            {/* 1. Main Passing Status Card (Compact & High Impact) */}
            <div className="border border-emerald-300 bg-emerald-50/80 rounded-[3px] p-3.5 flex items-center justify-between gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    Results
                  </span>
                  <span className="text-2xl font-bold text-emerald-900 leading-tight">
                    Pass
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsScoringInfoOpen(true)}
                  className="text-right leading-tight group cursor-pointer p-1.5 -m-1.5 rounded-[3px] hover:bg-emerald-100/70 transition-colors"
                  title="How is this scored? Tap to view 180 total vs 150 scored breakdown"
                  aria-label="View scoring structure explanation"
                >
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">
                    73%
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11.5px] text-emerald-800 font-medium mt-0.5">
                    <span className="group-hover:underline decoration-emerald-600 underline-offset-2">
                      on 150 scored questions
                    </span>
                    <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-[10px] font-bold border border-emerald-300/80 group-hover:bg-emerald-300 group-hover:text-emerald-950 transition-colors shadow-2xs">
                      ?
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Focused Improvement Recommendation Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[3px] bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-secondary">
                    2 Domains Need Focused Work
                  </span>
                  <span className="text-xs text-gray-500">
                    Scored below the 70% proficiency target
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-gray-600 leading-relaxed m-0">
                You scored lower in <strong>Psychosocial Concepts</strong> (64%) and <strong>Reimbursement Methods</strong> (58%). Focused drills will lock in your passing edge.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedPracticeDomains([
                    "Psychosocial Concepts and Support Systems",
                    "Reimbursement Methods"
                  ]);
                  setViewMode("PRACTICE_SETUP");
                }}
                className="w-full min-h-[46px] rounded-[3px] bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Practice Weak Areas (19 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3. Score by Domain Card (Prominently Rendered) */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <h2 className="text-[16px] font-semibold text-secondary m-0">Score by domain</h2>
                <span className="text-xs text-gray-400 font-normal">6 Core Domains</span>
              </div>

              <div className="divide-y divide-gray-100">
                {mockDomainScores.map((domain) => (
                  <div key={domain.name} className="py-2.5 flex flex-col gap-1.5 first:pt-1 last:pb-1">
                    <div className="flex items-start justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-gray-800 text-[13.5px]">
                          {domain.name}
                        </span>
                        {domain.needsWork ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[3px] bg-amber-50 text-amber-800 border border-amber-200">
                            Needs work
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[3px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Proficient
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-[14px] tabular-nums text-gray-900 shrink-0">
                        {domain.mockScore}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          domain.needsWork ? "bg-primary" : "bg-emerald-500"
                        }`}
                        style={{ width: `${domain.mockScore}%` }}
                      />
                    </div>

                    {domain.needsWork && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPracticeDomains([domain.name]);
                          setViewMode("PRACTICE_SETUP");
                        }}
                        className="self-start text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 mt-0.5 cursor-pointer"
                      >
                        <span>Practice {domain.name.split(" ")[0]} questions →</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11.5px] text-gray-400 leading-normal px-1">
              Estimate based on standard CCM blueprint algorithms. Continuous 3-hour exam without section pauses. Not affiliated with CCMC or Pearson VUE.
            </p>
          </div>

          {/* Footer Bar */}
          <footer className="h-[64px] border-t border-gray-200 bg-white px-3 flex items-center gap-2.5 shrink-0 shadow-lg z-10">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="flex-1 min-h-[44px] rounded-[3px] border border-gray-200 bg-white text-secondary hover:text-gray-900 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Review 180 Answers
            </button>
            <button
              onClick={() => router.push("/mock-exam")}
              className="flex-1 min-h-[44px] rounded-[3px] bg-primary hover:bg-primary/90 text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              Finish & Return
            </button>
          </footer>
          {/* Scoring Structure Popup Modal on tap of (?) */}
          {isScoringInfoOpen && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150"
              onClick={() => setIsScoringInfoOpen(false)}
            >
              <div
                className="bg-white rounded-[6px] border border-gray-200 max-w-sm w-full p-4 shadow-2xl flex flex-col gap-3.5 animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">Scoring Structure</h3>
                      <span className="text-[11px] text-gray-500">180 Total • 150 Scored Questions</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsScoringInfoOpen(false)}
                    className="w-7 h-7 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Explanation Content */}
                <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                  <p className="m-0">
                    You completed all <strong>180 questions</strong> in this mock exam. Under official CCM certification standards, your score and passing outcome are calculated exclusively from the <strong>150 scored core questions</strong>.
                  </p>
                  <p className="m-0">
                    The remaining <strong>30 questions</strong> are unscored pretest questions distributed anonymously to calibrate future exam questions. They do not affect your passing score.
                  </p>
                </div>

                {/* 3 Stat Cards */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-2 text-center">
                    <span className="block text-[10px] text-gray-500 uppercase font-semibold">Total</span>
                    <span className="text-base font-bold text-gray-900">180</span>
                    <span className="block text-[10px] text-emerald-600 font-medium">100% finished</span>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-[3px] p-2 text-center">
                    <span className="block text-[10px] text-primary uppercase font-semibold">Scored</span>
                    <span className="text-base font-bold text-gray-900">150</span>
                    <span className="block text-[10px] text-primary font-medium">110 / 150 (73%)</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-2 text-center">
                    <span className="block text-[10px] text-gray-500 uppercase font-semibold">Pretest</span>
                    <span className="text-base font-bold text-gray-900">30</span>
                    <span className="block text-[10px] text-gray-500 font-medium">Unscored trial</span>
                  </div>
                </div>

                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={() => setIsScoringInfoOpen(false)}
                  className="w-full py-2.5 mt-1 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-[3px] shadow-sm transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 2: PRACTICE WEAK AREAS SETUP SCREEN
         ========================================================================= */}
      {viewMode === "PRACTICE_SETUP" && (
        <div className="absolute inset-0 z-40 bg-background-muted flex flex-col text-gray-800 select-none overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <header className="h-[56px] shrink-0 bg-primary text-white flex items-center px-3.5 gap-2.5 shadow-sm relative z-10">
            <button
              onClick={() => setViewMode("EXAM_COMPLETE")}
              aria-label="Back to results"
              className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={2} />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-[15px] font-semibold tracking-tight truncate leading-tight">
                Practice Weak Areas
              </span>
              <span className="text-white/80 text-[11px] font-normal truncate">
                {title} • Targeted Question Drill
              </span>
            </div>
          </header>

          {/* Main Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide">
            {/* 1. Domains Selector Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <h3 className="text-[15px] font-medium text-secondary">Select Domains</h3>
                <span className="text-xs text-gray-400 font-normal">Multi-select</span>
              </div>

              <div className="flex flex-col gap-2">
                {mockDomainScores.map((domain) => {
                  const isSelected = selectedPracticeDomains.includes(domain.name);
                  return (
                    <button
                      key={domain.name}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          if (selectedPracticeDomains.length > 1) {
                            setSelectedPracticeDomains(selectedPracticeDomains.filter((d) => d !== domain.name));
                          }
                        } else {
                          setSelectedPracticeDomains([...selectedPracticeDomains, domain.name]);
                        }
                      }}
                      className={`flex items-center gap-3 p-3 rounded-[3px] border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 text-gray-900 shadow-2xs"
                          : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {/* Checkbox indicator */}
                      <span
                        className={`w-5 h-5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-primary border-primary text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                      </span>

                      <div className="flex-1 flex flex-col">
                        <span className="text-sm font-semibold leading-snug">
                          {domain.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {domain.mockScore}% score in mock exam
                          {domain.needsWork && (
                            <span className="ml-1.5 font-semibold text-primary">• Needs work</span>
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Questions Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
              <h3 className="text-[15px] font-medium text-secondary">Number of Questions</h3>
              <div className="grid grid-cols-3 gap-2">
                {([10, 20, 30] as const).map((count) => {
                  const isActive = practiceQuestionCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPracticeQuestionCount(count)}
                      className={`min-h-[44px] rounded-[3px] border text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white border-gray-200 text-secondary hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {count} Questions
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Practice Mode Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
              <h3 className="text-[15px] font-medium text-secondary">Practice Mode</h3>

              <div className="flex flex-col gap-2.5">
                {/* Learn Mode */}
                <button
                  type="button"
                  onClick={() => setPracticeMode("LEARN")}
                  className={`flex items-start gap-3 p-3.5 rounded-[3px] border text-left transition-all cursor-pointer ${
                    practiceMode === "LEARN"
                      ? "border-primary bg-primary/5 text-gray-900 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      practiceMode === "LEARN"
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {practiceMode === "LEARN" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Learn Mode</span>
                    <span className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Instant feedback and detailed rationale after each question
                    </span>
                  </div>
                </button>

                {/* Timed Quiz */}
                <button
                  type="button"
                  onClick={() => setPracticeMode("TIMED")}
                  className={`flex items-start gap-3 p-3.5 rounded-[3px] border text-left transition-all cursor-pointer ${
                    practiceMode === "TIMED"
                      ? "border-primary bg-primary/5 text-gray-900 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      practiceMode === "TIMED"
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {practiceMode === "TIMED" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Timed Quiz</span>
                    <span className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Continuous test pace (1 minute per question), results shown at conclusion
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Missed Questions Toggle Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3.5 flex items-center gap-3">
              <input
                id="includeMissedCheckbox"
                type="checkbox"
                checked={includeMissedInMock}
                onChange={(e) => setIncludeMissedInMock(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300 cursor-pointer accent-[#C6364C]"
              />
              <label htmlFor="includeMissedCheckbox" className="text-xs text-gray-700 font-medium cursor-pointer select-none">
                Prioritize questions missed during your mock exam attempt
              </label>
            </div>
          </div>

          {/* Footer */}
          <footer className="h-[64px] border-t border-gray-200 bg-white px-3 flex items-center justify-between gap-3 shrink-0 shadow-lg z-10">
            <span className="text-xs text-gray-500 font-medium truncate">
              {practiceQuestionCount} questions • ~{practiceQuestionCount} min
            </span>
            <button
              onClick={() => {
                setPracticeCurrentIndex(0);
                setPracticeSelectedOption(null);
                setPracticeIsChecked(false);
                setPracticeCompleted(false);
                setViewMode("PRACTICE_SESSION");
              }}
              className="min-h-[44px] px-6 rounded-[3px] bg-primary hover:bg-primary/90 text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              Start Practice Session
            </button>
          </footer>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: PRACTICE QUESTION SESSION
         ========================================================================= */}
      {viewMode === "PRACTICE_SESSION" && (
        <div className="absolute inset-0 z-40 bg-background-muted flex flex-col text-gray-800 select-none overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <header className="h-[56px] shrink-0 bg-primary text-white flex items-center justify-between px-3.5 shadow-sm relative z-10">
            <button
              onClick={() => setViewMode("PRACTICE_SETUP")}
              aria-label="Exit practice"
              className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[11px] text-white/80 uppercase font-semibold tracking-wider">
                {currentPracticeQ.shortDomain}
              </span>
              <span className="text-sm font-semibold text-white">
                Question {practiceCurrentIndex + 1} of {totalPracticeQCount}
              </span>
            </div>

            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[3px] bg-white/15 text-white border border-white/20">
              {practiceMode === "LEARN" ? "Learn" : "Timed"}
            </span>
          </header>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 w-full overflow-hidden shrink-0">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((practiceCurrentIndex + 1) / totalPracticeQCount) * 100}%` }}
            />
          </div>

          {/* Main Content Area */}
          {practiceCompleted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Practice Set Completed!</h2>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                You reinforced critical concepts across your targeted domains. Ready to review your full mock results or start another drill.
              </p>
              <div className="flex flex-col gap-2.5 w-full max-w-xs mt-3">
                <button
                  onClick={() => {
                    setPracticeCurrentIndex(0);
                    setPracticeSelectedOption(null);
                    setPracticeIsChecked(false);
                    setPracticeCompleted(false);
                  }}
                  className="w-full min-h-[44px] bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-[3px] transition-colors cursor-pointer shadow-sm"
                >
                  Practice Weak Areas Again
                </button>
                <button
                  onClick={() => setViewMode("EXAM_COMPLETE")}
                  className="w-full min-h-[44px] bg-white border border-gray-200 text-secondary hover:text-gray-900 font-semibold text-sm rounded-[3px] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Back to Exam Results
                </button>
              </div>
            </div>
          ) : (
            <main className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide">
              {/* Question Card */}
              <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs select-none">
                  <span className="font-semibold text-secondary uppercase tracking-wider text-[11px]">
                    {currentPracticeQ.domain}
                  </span>
                  {currentPracticeQ.isMissedInMock && (
                    <span className="text-[11px] font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-[3px] border border-primary/15">
                      Missed in Mock Exam
                    </span>
                  )}
                </div>

                <div className="text-gray-800 leading-[1.6] text-[15px] font-normal">
                  {currentPracticeQ.stem}
                </div>
              </div>

              {/* Options */}
              <div role="radiogroup" aria-label="Answer options" className="flex flex-col gap-2.5">
                {currentPracticeQ.options.map((option) => {
                  const isSelected = practiceSelectedOption === option.id;
                  const isCorrect = currentPracticeQ.correctAnswer === option.id;

                  let borderBg = "border-gray-200 bg-white hover:border-gray-300 text-gray-800";
                  let radioStyle = "border-gray-300 bg-white";

                  if (practiceIsChecked && practiceMode === "LEARN") {
                    if (isCorrect) {
                      borderBg = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium";
                      radioStyle = "border-emerald-600 bg-emerald-600 text-white";
                    } else if (isSelected) {
                      borderBg = "border-primary bg-primary/8 text-primary font-medium";
                      radioStyle = "border-primary bg-primary text-white";
                    }
                  } else if (isSelected) {
                    borderBg = "border-primary bg-primary/5 text-gray-900 shadow-xs";
                    radioStyle = "border-primary bg-primary text-white";
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={practiceIsChecked && practiceMode === "LEARN"}
                      onClick={() => {
                        if (!practiceIsChecked) {
                          setPracticeSelectedOption(option.id);
                        }
                      }}
                      className={`flex items-start gap-3 p-3.5 rounded-[3px] border text-left transition-all cursor-pointer ${borderBg}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all select-none ${radioStyle}`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>

                      <span className="text-[14px] leading-snug flex-1">
                        <strong className="mr-1.5 font-semibold text-secondary select-none">{option.id}.</strong>
                        <span>{option.text}</span>
                      </span>

                      {practiceIsChecked && practiceMode === "LEARN" && (
                        <span
                          className={`text-xs font-semibold shrink-0 ${
                            isCorrect ? "text-emerald-700" : isSelected ? "text-primary" : ""
                          }`}
                        >
                          {isCorrect ? "Correct" : isSelected ? "Incorrect" : ""}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Learn Mode Detailed Explanation Box */}
              {practiceIsChecked && practiceMode === "LEARN" && (
                <div className="p-3.5 rounded-[3px] bg-sky-50 border border-sky-200 text-xs text-sky-950 leading-relaxed flex flex-col gap-1 mt-1 animate-in fade-in duration-200">
                  <span className="font-semibold text-sky-900 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
                    Clinical Rationale & Explanation:
                  </span>
                  <span className="text-sky-900/90 leading-relaxed">{currentPracticeQ.explanation}</span>
                </div>
              )}
            </main>
          )}

          {/* Footer */}
          {!practiceCompleted && (
            <footer className="h-[64px] border-t border-gray-200 bg-white px-3 flex items-center gap-2 shrink-0 shadow-lg z-10">
              <button
                onClick={() => {
                  if (practiceCurrentIndex < totalPracticeQCount - 1) {
                    setPracticeCurrentIndex(practiceCurrentIndex + 1);
                    setPracticeSelectedOption(null);
                    setPracticeIsChecked(false);
                  } else {
                    setPracticeCompleted(true);
                  }
                }}
                className="min-h-[44px] px-4 rounded-[3px] border border-gray-200 bg-white text-secondary hover:text-gray-900 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={() => {
                  if (practiceMode === "LEARN") {
                    if (!practiceIsChecked) {
                      if (practiceSelectedOption) {
                        setPracticeIsChecked(true);
                      }
                    } else {
                      if (practiceCurrentIndex < totalPracticeQCount - 1) {
                        setPracticeCurrentIndex(practiceCurrentIndex + 1);
                        setPracticeSelectedOption(null);
                        setPracticeIsChecked(false);
                      } else {
                        setPracticeCompleted(true);
                      }
                    }
                  } else {
                    // Timed Quiz Mode
                    if (practiceCurrentIndex < totalPracticeQCount - 1) {
                      setPracticeCurrentIndex(practiceCurrentIndex + 1);
                      setPracticeSelectedOption(null);
                    } else {
                      setPracticeCompleted(true);
                    }
                  }
                }}
                disabled={!practiceSelectedOption && !practiceIsChecked}
                className={`flex-1 min-h-[44px] rounded-[3px] bg-primary hover:bg-primary/90 text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
                  !practiceSelectedOption && !practiceIsChecked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span>
                  {practiceIsChecked
                    ? practiceCurrentIndex < totalPracticeQCount - 1
                      ? "Next Question"
                      : "Finish Practice"
                    : "Check Answer"}
                </span>
              </button>
            </footer>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 4: ATTEMPT ENDED EDGE CASE SCREEN
         ========================================================================= */}
      {viewMode === "ATTEMPT_ENDED" && (
        <div className="absolute inset-0 z-40 bg-background-muted flex flex-col text-gray-800 select-none overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <header className="h-[56px] shrink-0 bg-primary text-white flex items-center px-3.5 gap-2.5 shadow-sm relative z-10">
            <button
              onClick={() => router.push("/mock-exam")}
              aria-label="Back to mock exams"
              className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={2} />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-[15px] font-semibold tracking-tight truncate leading-tight">
                {title}
              </span>
              <span className="text-white/80 text-[11px] font-normal truncate">
                Attempt Incomplete
              </span>
            </div>
          </header>

          {/* Main Centered Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center gap-4">
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-6 max-w-sm w-full flex flex-col items-center gap-3.5">
              {/* Alert Badge */}
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-primary flex items-center justify-center shadow-2xs">
                <AlertCircle className="w-7 h-7" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 m-0">Exam Attempt Ended</h2>

              <p className="text-xs text-gray-600 leading-relaxed m-0">
                You navigated away from the application during the active session. Under official Pearson VUE proctored exam rules, leaving the test window concludes the unproctored attempt.
              </p>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-2 w-full pt-1">
                <div className="bg-background-muted rounded-[3px] border border-gray-200 p-2.5 text-center">
                  <div className="text-[11px] text-gray-500 font-medium">Stopped at</div>
                  <div className="text-base font-bold text-gray-900">Question {attemptStoppedAt} of 180</div>
                </div>
                <div className="bg-background-muted rounded-[3px] border border-gray-200 p-2.5 text-center">
                  <div className="text-[11px] text-gray-500 font-medium">Time used</div>
                  <div className="text-base font-bold text-gray-900">{attemptTimeUsed}</div>
                </div>
              </div>

              {/* Crucial: No mention of breaks or sections per instruction */}
              <p className="text-[11.5px] text-gray-400 leading-relaxed m-0">
                This attempt is marked incomplete and is not scored. Please ensure you have an uninterrupted 3-hour window before beginning your next attempt.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="h-[64px] border-t border-gray-200 bg-white px-3 flex items-center gap-2.5 shrink-0 shadow-lg z-10">
            <button
              onClick={() => router.push("/mock-exam")}
              className="flex-1 min-h-[44px] rounded-[3px] border border-gray-200 bg-white text-secondary hover:text-gray-900 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswers({ 0: "B" });
                setStrikeouts({ 0: ["C"] });
                setFlaggedQuestions({});
                setTimeRemainingSeconds(10270);
                setIsExamCompleted(false);
                setViewMode("ACTIVE_EXAM");
              }}
              className="flex-1 min-h-[44px] rounded-[3px] bg-primary hover:bg-primary/90 text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              Start New Attempt
            </button>
          </footer>
        </div>
      )}

      {/* 11. Native Mobile / Web Contextual Selection Menu for Highlight & Strike */}
      {floatingMenu && (
        <>
          {/* Backdrop to dismiss on tap outside */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => {
              setFloatingMenu(null);
              window.getSelection()?.removeAllRanges();
            }}
          />

          <div
            style={{
              position: "fixed",
              left: `${floatingMenu.x}px`,
              top: `${floatingMenu.y}px`,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
            }}
            className="animate-in fade-in zoom-in-95 duration-100 pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Action Pill */}
            <div className="bg-gray-900/95 backdrop-blur-md text-white rounded-md shadow-2xl px-2 py-1 flex items-center gap-1.5 border border-white/20 text-xs font-medium">
              {floatingMenu.hasHighlight && (
                <button
                  type="button"
                  onClick={handleClearHighlight}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-amber-200 hover:text-white"
                  title="Remove highlight"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Clear Highlight</span>
                </button>
              )}

              {floatingMenu.hasStrike && (
                <button
                  type="button"
                  onClick={handleClearStrike}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-rose-300 hover:text-white"
                  title="Remove strikethrough"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Strike</span>
                </button>
              )}

              {!floatingMenu.hasHighlight && !floatingMenu.hasStrike && (
                <>
                  <button
                    type="button"
                    onClick={handleApplyHighlight}
                    className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/20 transition-colors cursor-pointer text-amber-300 hover:text-amber-200"
                    title="Highlight selected text"
                  >
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>Highlight</span>
                  </button>

                  <div className="w-px h-3.5 bg-gray-700" />

                  <button
                    type="button"
                    onClick={handleApplyStrike}
                    className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/20 transition-colors cursor-pointer text-gray-200 hover:text-white"
                    title="Strike through selected text"
                  >
                    <Strikethrough className="w-3.5 h-3.5" />
                    <span>Strike</span>
                  </button>
                </>
              )}
            </div>

            {/* Downward Caret Arrow */}
            <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900/95 mx-auto" />
          </div>
        </>
      )}
    </div>
  );
}
