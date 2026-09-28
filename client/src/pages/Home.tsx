import { useEffect, useMemo, useState } from "react";
import { motivationalMessages } from "@/motivational-messages";
import {
  ArrowUpLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Fuel,
  GraduationCap,
  LayoutDashboard,
  Link2,
  Map,
  Menu,
  Pencil,
  Printer,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Square,
  SquareCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
type Course = {
  id: number;
  name: string;
  code: string;
  type: "إجبارية" | "اختيارية" | "جامعة";
  credits: number | null;
  semester: number;
};

const courses: Course[] = [
  { id: 1, name: "استاتيكا – Eng Mechanic 1", code: "GE121", type: "إجبارية", credits: 3, semester: 1 },
  { id: 2, name: "رياضية 1 – Mathematics 1", code: "GS101", type: "إجبارية", credits: 3, semester: 1 },
  { id: 3, name: "مقدمة في الهندسة الجيوفيزيائية – Introduction to Geophysical Engineering", code: "GPE324", type: "إجبارية", credits: 3, semester: 1 },
  { id: 4, name: "كيمياء عامة – General Chemistry", code: "GS115", type: "إجبارية", credits: 4, semester: 1 },
  { id: 5, name: "جيولوجيا فيزيائية – Physical Geology", code: "GLE211", type: "إجبارية", credits: 3, semester: 1 },
  { id: 6, name: "فيزياء 1 – Physics 1", code: "GS111", type: "إجبارية", credits: 3, semester: 1 },
  { id: 7, name: "لغة إنجليزية 1 – English Language 1", code: "GH141", type: "جامعة", credits: 2, semester: 1 },
  { id: 8, name: "لغة عربية 1 – Arabic Language 1", code: "GH150", type: "جامعة", credits: 2, semester: 1 },
  { id: 9, name: "رسم هندسي – Engineering Drawing", code: "GS126", type: "إجبارية", credits: 3, semester: 1 },
  { id: 10, name: "ميكانيكا صخور وتربة – Rock Mechanics & Soil Mechanics", code: "GLE314", type: "إجبارية", credits: 3, semester: 2 },
  { id: 11, name: "رياضية 2 – Mathematics 2", code: "GS102", type: "إجبارية", credits: 3, semester: 2 },
  { id: 12, name: "مبادئ المساحة الضوئية والجيوديسية – Survey", code: "GPE205", type: "إجبارية", credits: 3, semester: 2 },
  { id: 13, name: "معمل كيمياء – Chemistry Lab", code: "GS115L", type: "إجبارية", credits: 1, semester: 2 },
  { id: 14, name: "فيزياء 2 – Physics 2", code: "GS112", type: "إجبارية", credits: 3, semester: 2 },
  { id: 15, name: "ميكانيكا الموائم – Fluid Mechanics", code: "CHE311", type: "إجبارية", credits: 3, semester: 2 },
  { id: 16, name: "لغة إنجليزية 2 – English Language 2", code: "GH142", type: "جامعة", credits: 2, semester: 2 },
  { id: 17, name: "لغة عربية 2 – Arabic Language 2", code: "GH151", type: "جامعة", credits: 2, semester: 2 },
  { id: 18, name: "ديناميكا – Eng Mechanic 2", code: "GE222", type: "إجبارية", credits: 3, semester: 2 },
  { id: 19, name: "مبادئ نظم المعلومات المكانية – Principles of Spatial Information System", code: "GPE513", type: "إجبارية", credits: 3, semester: 3 },
  { id: 20, name: "معادن وصخور – Mineralogy & Petrology", code: "GLE221", type: "إجبارية", credits: 3, semester: 3 },
  { id: 21, name: "علم الرواسب – Sedimentation", code: "GLE223", type: "إجبارية", credits: 3, semester: 3 },
  { id: 22, name: "خواص المواد – Properties of Materials", code: "GS133", type: "إجبارية", credits: 3, semester: 3 },
  { id: 23, name: "رياضية 3 – Mathematics 3", code: "GS203", type: "إجبارية", credits: 3, semester: 3 },
  { id: 24, name: "الاستكشاف الجاذبي – Gravity Exploration", code: "GPE412", type: "إجبارية", credits: 3, semester: 3 },
  { id: 25, name: "استكشاف كهربائي – Electrical Exploration", code: "GPE411", type: "إجبارية", credits: 3, semester: 3 },
  { id: 26, name: "كيمياء فيزيائية 1 – Physical Chemistry 1", code: "GHE211", type: "إجبارية", credits: 2, semester: 4 },
  { id: 27, name: "جيولوجيا تركيبية – Structural Geology", code: "GLE222", type: "إجبارية", credits: 3, semester: 4 },
  { id: 28, name: "برمجة 1 – Computer Programming 1", code: "GS200", type: "إجبارية", credits: 3, semester: 4 },
  { id: 29, name: "علم الزلازل ونظريات الزلازل – Seismology", code: "GPE471", type: "إجبارية", credits: 3, semester: 4 },
  { id: 30, name: "تجميع البيانات السيزمية – Seismic Data Acquisition", code: "GPE421", type: "إجبارية", credits: 3, semester: 4 },
  { id: 31, name: "معمل كيمياء فيزيائية 1 – Physical Chemistry Lab 1", code: "GHE211L", type: "إجبارية", credits: 1, semester: 4 },
  { id: 32, name: "علم الطبقات – Stratigraphy", code: "GLE311", type: "إجبارية", credits: 3, semester: 4 },
  { id: 33, name: "فيزياء الأرض – Physics of the Earth", code: "GPE515", type: "إجبارية", credits: 3, semester: 4 },
  { id: 34, name: "معمل فيزياء – Physics Lap", code: "GS112L", type: "إجبارية", credits: 1, semester: 4 },
  { id: 35, name: "لغة إنجليزية 3 – English Language 3", code: "GH143", type: "جامعة", credits: 2, semester: 5 },
  { id: 36, name: "كتابة تقارير – Technical Writing", code: "GH152", type: "جامعة", credits: 2, semester: 5 },
  { id: 37, name: "الثقافة الوطنية – National Culture", code: "GH299", type: "جامعة", credits: 2, semester: 5 },
  { id: 38, name: "احصاء – Probability & Statistics", code: "GS206", type: "إجبارية", credits: 3, semester: 5 },
  { id: 39, name: "رياضية 4 – Mathematics 4", code: "GS204", type: "إجبارية", credits: 3, semester: 5 },
  { id: 40, name: "استشعار عن بعد والتصويرية – Remote Sensing & Photogeology", code: "GLE313", type: "إجبارية", credits: 3, semester: 5 },
  { id: 41, name: "الاستكشاف بطريقة الكهرومغناطيسية – Electromagnetic Exploration", code: "GPE427", type: "إجبارية", credits: 2, semester: 5 },
  { id: 42, name: "استكشاف مغناطيسي – Magnetic Exploration", code: "GL421", type: "إجبارية", credits: 3, semester: 5 },
  { id: 43, name: "جيولوجيا نفط 1 – Petroleum Geology 1", code: "GLE391", type: "إجبارية", credits: 3, semester: 5 },
  { id: 44, name: "الرياضيات في الجيوفيزياء – Mathematics in Geophysics", code: "GPE424", type: "إجبارية", credits: 3, semester: 6 },
  { id: 45, name: "الخواص الفيزيائية للصخر – Physical Properties of Rock", code: "GPE501", type: "إجبارية", credits: 3, semester: 6 },
  { id: 46, name: "هندسة الحفر – Drilling Engineering", code: "PTE371", type: "إجبارية", credits: 3, semester: 6 },
  { id: 47, name: "تسجيلات الآبار 1 – Well Logging 1", code: "GPE371", type: "إجبارية", credits: 3, semester: 6 },
  { id: 48, name: "جيولوجيا ليبيا – Geology of Libya", code: "GLE471", type: "إجبارية", credits: 3, semester: 6 },
  { id: 49, name: "تحليل عددي – Numerical Analysis", code: "GS309", type: "إجبارية", credits: 3, semester: 6 },
  { id: 50, name: "تطبيقات الحاسب في الجيولوجية والجيوفيزيائية – Computer Application in Geology & Geophysical", code: "GLE415", type: "إجبارية", credits: 3, semester: 6 },
  { id: 51, name: "تسجيلات الآبار 2 – Well Logging 2", code: "GPE524", type: "إجبارية", credits: 3, semester: 6 },
  { id: 52, name: "الجيولوجية تحت السطح – Subsurface Geology", code: "GLE423", type: "إجبارية", credits: 3, semester: 7 },
  { id: 53, name: "معالجة البيانات السيزمية – Seismic Data Processing", code: "GPE431", type: "إجبارية", credits: 3, semester: 7 },
  { id: 54, name: "الندوة الجيولوجية والجيوفيزيائية – Geological & Geophysical Seminar", code: "GPE522", type: "إجبارية", credits: 1, semester: 7 },
  { id: 55, name: "تفسير البيانات السيزمية – Seismic Interpretation", code: "GPE505", type: "إجبارية", credits: 3, semester: 7 },
  { id: 57, name: "الجيوفيزياء الحقلية (مخيم) – Field Geophysics", code: "GPE521", type: "إجبارية", credits: 4, semester: 7 },
  { id: 58, name: "جيوفيزياء المكامن – Reservoir Geophysics", code: "GPE425", type: "إجبارية", credits: 3, semester: 7 },
  { id: 59, name: "تطبيقات الحاسب المتقدمة في الجيولوجية والجيوفيزيائية 2 – Computer Application in Geology & Geophysical Advance 2", code: "GPE507", type: "إجبارية", credits: 3, semester: 8 },
  { id: 60, name: "مشروع تخرج 1 – Graduate Project 1", code: "GPE589", type: "إجبارية", credits: 2, semester: 8 },
  { id: 61, name: "التتابع الطبقي السيزمي – Seismic Sequence Stratigraphy", code: "GPE517", type: "إجبارية", credits: 3, semester: 8 },
  { id: 62, name: "تفسير البيانات السيزمية المتقدم – Advance Seismic Data Interpretation", code: "GPE595", type: "إجبارية", credits: 3, semester: 8 },
  { id: 63, name: "استكشاف المياه الجوفية – Ground Water Exploration", code: "GPE593", type: "إجبارية", credits: 3, semester: 8 },
  { id: 64, name: "مشروع تخرج 2 – Graduate Project 2", code: "GPE599", type: "إجبارية", credits: 3, semester: 8 },
];

const TOTAL_CREDITS = courses.reduce((sum, course) => sum + (course.credits ?? 0), 0);
const MAX_EXPORT_CREDITS = 18;
const defaultCompleted: number[] = [];
const typeFilters = ["الكل", "إجبارية", "اختيارية", "جامعة"] as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    toast.error("تعذر حفظ التغيير محلياً");
  }
}
function readCompletedCourses(): number[] {
  const saved = readStorage<unknown>("geophysics-completed-courses-v2", defaultCompleted);
  if (!Array.isArray(saved)) return [];
  const validIds = new Set(courses.map((course) => course.id));
  return saved.filter((id): id is number => typeof id === "number" && Number.isInteger(id) && validIds.has(id)).filter((id, index, ids) => ids.indexOf(id) === index);
}
function pickMotivation(): string {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)] ?? motivationalMessages[0];
}

function readStudentName() {
  const saved = readStorage<string | null>("geophysics-student-name-v2", null);
  return saved && !["محمد حسن", "Mohammed Hassan", "محمد الرواب"].includes(saved.trim()) ? saved : "";
}
function readPdfSelection(): number[] {
  const saved = readStorage<unknown>("geophysics-pdf-selection-v1", []);
  if (!Array.isArray(saved)) return [];
  const validIds = new Set(courses.map((course) => course.id));
  return saved.filter((id): id is number => typeof id === "number" && Number.isInteger(id) && validIds.has(id)).filter((id, index, ids) => ids.indexOf(id) === index);
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring" aria-label={`نسبة الإنجاز ${percentage}%`}>
      <svg viewBox="0 0 190 190" role="img">
        <defs>
          <linearGradient id="goldGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="48%" stopColor="#F5B301" />
            <stop offset="100%" stopColor="#B97900" />
          </linearGradient>
          <filter id="softGoldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle className="ring-track" cx="95" cy="95" r={radius} />
        <circle
          className="ring-value"
          cx="95"
          cy="95"
          r={radius}
          stroke="url(#goldGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#softGoldGlow)"
        />
      </svg>
      <div className="ring-label">
        <strong>{percentage}%</strong>
        <span>منجز</span>
      </div>
    </div>
  );
}

function StatCard({ label, value, caption, tone, icon }: { label: string; value: string; caption: string; tone: "gold" | "blue" | "green" | "muted"; icon: React.ReactNode }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{caption}</small>
      </div>
    </article>
  );
}

export default function Home() {
  const [studentName, setStudentName] = useState(readStudentName);
  const [nameDraft, setNameDraft] = useState(studentName);
  const [editingName, setEditingName] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(() => !readStudentName());
  const [completed, setCompleted] = useState<number[]>(readCompletedCourses);
  const [query, setQuery] = useState("");
  const [semester, setSemester] = useState("الكل");
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]>("الكل");
  const [openFilter, setOpenFilter] = useState<"semester" | "type" | "reportSemester" | null>(null);
  const [reportSemester, setReportSemester] = useState("الكل");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [pdfSelection, setPdfSelection] = useState<number[]>(readPdfSelection);
  const [pdfQuery, setPdfQuery] = useState("");
  const [pdfScope, setPdfScope] = useState<"all" | "current">("all");
  const [printPayload, setPrintPayload] = useState<Course[] | null>(null);
  const [motivationMessage, setMotivationMessage] = useState(pickMotivation);

  useEffect(() => {
    if (studentName.trim()) writeStorage("geophysics-student-name-v2", studentName.trim().slice(0, 80));
    else {
      try { localStorage.removeItem("geophysics-student-name-v2"); } catch { /* storage may be unavailable */ }
    }
  }, [studentName]);

  useEffect(() => {
    writeStorage("geophysics-completed-courses-v2", completed);
  }, [completed]);
  useEffect(() => {
    // Preload the Ruqaa font so it is ready inside the print dialog (its text is hidden otherwise).
    fetch("https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&display=swap")
      .then((response) => response.text())
      .then((css) => {
        const match = css.match(/url\((https:[^)]+\.woff2)\)/);
        if (match) {
          const ruqaa = new FontFace("Aref Ruqaa", `url(${match[1]})`);
          ruqaa.load().then((loaded) => document.fonts.add(loaded)).catch(() => { /* fallback font stays in use */ });
        }
      })
      .catch(() => { /* offline: fallback font stays in use */ });
  }, []);
  useEffect(() => {
    writeStorage("geophysics-pdf-selection-v1", pdfSelection);
  }, [pdfSelection]);
  useEffect(() => {
    const restoreAfterPrint = () => document.body.classList.remove("printing-report");
    window.addEventListener("afterprint", restoreAfterPrint);
    return () => window.removeEventListener("afterprint", restoreAfterPrint);
  }, []);

  const completedCourses = useMemo(() => courses.filter((course) => completed.includes(course.id)), [completed]);
  const remainingCourseList = courses.filter((course) => !completed.includes(course.id));
  const completedCredits = completedCourses.reduce((sum, course) => sum + (course.credits ?? 0), 0);
  const remainingCredits = TOTAL_CREDITS - completedCredits;
  const percentage = Math.round((completedCredits / TOTAL_CREDITS) * 100);
  const displayName = studentName || "مهندس مستجد";
  const reportCourses = reportSemester === "الكل" ? courses : courses.filter((course) => course.semester === Number(reportSemester));
  const reportCompletedCourses = reportCourses.filter((course) => completed.includes(course.id));
  const reportRemainingCourses = reportCourses.filter((course) => !completed.includes(course.id));
  const reportTotalCredits = reportCourses.reduce((sum, course) => sum + (course.credits ?? 0), 0);
  const reportCompletedCredits = reportCompletedCourses.reduce((sum, course) => sum + (course.credits ?? 0), 0);
  const reportRemainingCredits = reportTotalCredits - reportCompletedCredits;
  const reportPercentage = reportTotalCredits ? Math.round((reportCompletedCredits / reportTotalCredits) * 100) : 0;
  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesQuery = `${course.name} ${course.code}`.toLowerCase().includes(query.toLowerCase());
        const matchesSemester = semester === "الكل" || course.semester === Number(semester);
        const matchesType = typeFilter === "الكل" || course.type === typeFilter;
        return matchesQuery && matchesSemester && matchesType;
      }),
    [query, semester, typeFilter],
  );
  const pdfFilteredCourses = useMemo(() => {
    const scopeCourses = pdfScope === "current" ? remainingCourseList : courses;
    return scopeCourses.filter((course) => `${course.name} ${course.code}`.toLowerCase().includes(pdfQuery.toLowerCase()));
  }, [pdfQuery, pdfScope, remainingCourseList]);
  const pdfSelectedCourses = useMemo(() => courses.filter((course) => pdfSelection.includes(course.id)), [pdfSelection]);
  const pdfSelectedCredits = pdfSelectedCourses.reduce((sum, course) => sum + (course.credits ?? 0), 0);

  function toggleCourse(id: number) {
    setCompleted((current) => (current.includes(id) ? current.filter((courseId) => courseId !== id) : [...current, id]));
  }

  function togglePdfCourse(id: number) {
    const target = courses.find((course) => course.id === id);
    if (target && !pdfSelection.includes(id)) {
      const targetCredits = target.credits ?? 0;
      const currentCredits = courses.filter((course) => pdfSelection.includes(course.id)).reduce((sum, course) => sum + (course.credits ?? 0), 0);
      if (currentCredits + targetCredits > MAX_EXPORT_CREDITS) {
        toast.error(`لا يمكن إضافة المادة — الحد الأقصى ${MAX_EXPORT_CREDITS} وحدة (المحدد حالياً ${currentCredits} وحدة)`);
        return;
      }
    }
    setPdfSelection((current) => (current.includes(id) ? current.filter((courseId) => courseId !== id) : [...current, id]));
  }

  function selectAllPdfVisible() {
    const ordered = [...pdfFilteredCourses].sort((a, b) => a.semester - b.semester || a.id - b.id);
    let budget = MAX_EXPORT_CREDITS - pdfSelectedCredits;
    const addedIds: number[] = [];
    let skipped = 0;
    for (const course of ordered) {
      if (pdfSelection.includes(course.id)) continue;
      const courseCredits = course.credits ?? 0;
      if (courseCredits > budget) {
        skipped += 1;
        continue;
      }
      addedIds.push(course.id);
      budget -= courseCredits;
    }
    if (addedIds.length > 0) {
      setPdfSelection([...pdfSelection, ...addedIds]);
      toast.success(`تمت إضافة ${addedIds.length} مادة إلى التقرير${skipped ? ` · تم تجاهل ${skipped} مادة لتجاوز حد ${MAX_EXPORT_CREDITS} وحدة` : ""}`);
    } else {
      toast.error(`لا توجد مواد يمكن إضافتها — حد ${MAX_EXPORT_CREDITS} وحدة ممتلئ`);
    }
  }

  function clearPdfSelection() {
    setPdfSelection([]);
  }

  function exportPdfSelection() {
    if (printPayload) return;
    if (pdfSelection.length === 0) {
      toast.error("حدد مادة واحدة على الأقل أولاً");
      return;
    }
    const payload = courses
      .filter((course) => pdfSelection.includes(course.id))
      .sort((a, b) => a.semester - b.semester || a.id - b.id);
    setMotivationMessage(pickMotivation());
    setPrintPayload(payload);
    window.setTimeout(() => {
      document.body.classList.add("printing-report");
      window.print();
      window.setTimeout(() => {
        document.body.classList.remove("printing-report");
        setPrintPayload(null);
      }, 300);
    }, 150);
  }

  function saveName() {
    const trimmedName = nameDraft.trim().replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 80);
    if (!trimmedName && onboardingOpen) {
      toast.error("اكتب اسمك أولاً للمتابعة");
      return;
    }
    const nextName = trimmedName || "مهندس مستجد";
    setStudentName(nextName);
    setNameDraft(nextName);
    setEditingName(false);
    setOnboardingOpen(false);
    toast.success("تم تحديث اسم الطالب");
  }

  function resetProgress() {
    const confirmed = window.confirm("هل تريد إعادة كل المواد إلى حالة متبقية؟");
    if (!confirmed) return;
    setCompleted([]);
    toast.success("تمت إعادة ضبط التقدم");
  }

  function downloadPdfDirect() {
    const report = document.querySelector(".print-report") as HTMLElement | null;
    if (!report) {
      toast.error("تعذر تجهيز التقرير");
      return;
    }
    setMotivationMessage(pickMotivation());
    const previousStyle = report.getAttribute("style");
    document.body.classList.add("printing-report");
    Object.assign(report.style, { display: "block", position: "static", width: "100%", padding: "0", margin: "0", background: "#fff", color: "#17202a" });
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => {
        document.body.classList.remove("printing-report");
        if (previousStyle === null) report.removeAttribute("style");
        else report.setAttribute("style", previousStyle);
      }, 300);
    }, 120);
  }
  return (
    <div className="app-shell" dir="rtl">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar print-hide">
        <a className="brand-lockup" href="#top" aria-label="بوابة الطالب - العودة إلى الأعلى">
          <span className="brand-mark"><Fuel size={19} strokeWidth={2.5} /></span>
          <span>
            <strong>بوابة الطالب</strong>
            <small>الجيولوجيا · الجيوفيزياء</small>
          </span>
        </a>
        <nav className={`topnav ${showMobileMenu ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
          <a className="active" href="#dashboard" onClick={() => setShowMobileMenu(false)}><LayoutDashboard size={16} /> لوحة التقدم</a>
          <a href="#courses" onClick={() => setShowMobileMenu(false)}><BookOpen size={16} /> المواد الدراسية</a>
          <a href="#pdf-report" onClick={() => setShowMobileMenu(false)}><Download size={16} /> تقرير PDF</a>
          <a href="#resources" onClick={() => setShowMobileMenu(false)}><Link2 size={16} /> الروابط المهمة</a>
        </nav>
        <div className="top-actions">
          <button className="icon-button menu-button" aria-label="فتح القائمة" onClick={() => setShowMobileMenu((current) => !current)}>
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button className="ghost-button print-hide" onClick={downloadPdfDirect}><Printer size={17} /> <span>طباعة / حفظ PDF</span></button>
        </div>
      </header>

      <main id="top" className="page-content">
        <section id="dashboard" className="welcome-section">
          <div className="welcome-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> الفصل الدراسي الحالي · 2024 / 2025</div>
            <h1>مسارك نحو التخرج<br /><em>أوضح من أي وقت.</em></h1>
            <p>تابع تقدمك في منهج الجيولوجيا شعبة الجيوفيزياء، وخطّط خطوتك القادمة بثقة.</p>
            <div className="student-identity">
              <div className="avatar"><GraduationCap size={24} /></div>
              <div className="student-name-wrap">
                {editingName ? (
                  <div className="name-editor">
                    <input autoFocus value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && saveName()} aria-label="اسم الطالب" />
                    <button onClick={saveName} aria-label="حفظ الاسم"><Check size={16} /></button>
                    <button onClick={() => { setNameDraft(studentName); setEditingName(false); }} aria-label="إلغاء"><X size={16} /></button>
                  </div>
                ) : (
                  <div className="name-line"><strong>{displayName}</strong><button className="edit-name" onClick={() => { setNameDraft(displayName); setEditingName(true); }} aria-label="تعديل اسم الطالب"><Pencil size={14} /></button></div>
                )}
                <span className="student-badge">مهندس مستجد <span>🛠️</span></span>
              </div>
            </div>
          </div>
          <div className="hero-progress-card">
            <div className="card-topline"><span>الإنجاز الكلي</span><span className="live-dot"><i /> محفوظ محلياً</span></div>
            <div className="ring-wrap"><ProgressRing percentage={percentage} /></div>
            <div className="hero-progress-meta"><strong>{completedCredits} <small>/ {TOTAL_CREDITS} وحدة</small></strong><span>{completedCourses.length} من {courses.length} مادة مكتملة</span></div>
            <div className="micro-progress"><div style={{ width: `${percentage}%` }} /></div>
            <p className="hero-note"><Sparkles size={16} /> كل مادة تنجزها تقرّبك من الخريج الذي تريد أن تكونه.</p>
          </div>
        </section>

        <section className="stats-grid" aria-label="ملخص التقدم">
          <StatCard label="إجمالي الوحدات" value={`${TOTAL_CREDITS}`} caption="وحدة دراسية في الخطة" tone="gold" icon={<BookOpen size={20} />} />
          <StatCard label="الوحدات المنجزة" value={`${completedCredits}`} caption={`من أصل ${TOTAL_CREDITS} وحدة`} tone="green" icon={<CheckCircle2 size={20} />} />
          <StatCard label="الوحدات المتبقية" value={`${remainingCredits}`} caption="وحدة حتى إتمام الخطة" tone="blue" icon={<ArrowUpLeft size={20} />} />
          <StatCard label="المواد المكتملة" value={`${completedCourses.length}`} caption={`من أصل ${courses.length} مادة`} tone="muted" icon={<GraduationCap size={20} />} />
        </section>

        <section className="graduation-path card-surface">
          <div className="section-heading compact-heading">
            <div><span className="section-kicker">01 · الخطة الأكاديمية</span><h2>مسار التخرج الأكاديمي</h2></div>
            <span className="path-percent">{percentage}% مكتمل</span>
          </div>
          <div className="path-track"><div className="path-fill" style={{ width: `${percentage}%` }}><span /></div></div>
          <div className="path-labels"><span>بداية الرحلة</span><span>{completedCredits} وحدة منجزة</span><span>متطلبات التخرج · {TOTAL_CREDITS}</span></div>
        </section>

        <section id="courses" className="courses-section">
          <div className="section-heading">
            <div><span className="section-kicker">02 · سجل المواد</span><h2>خطة دراستك، في مكان واحد</h2><p>اضغط على أي مادة لتحديدها كمنجزة أو إعادتها إلى القائمة.</p></div>
            <div className="course-count"><strong>{completedCourses.length}</strong><span>مكتملة<br />من {courses.length}</span></div>
          </div>

          <div className="course-toolbar card-surface">
            <div className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم المادة أو رمزها..." aria-label="البحث في المواد" />{query && <button onClick={() => setQuery("")} aria-label="مسح البحث"><X size={15} /></button>}</div>
            <div className="toolbar-selects">
              <FilterDropdown label="الفصل الدراسي" value={semester === "الكل" ? "كل الفصول" : `الفصل ${semester}`} open={openFilter === "semester"} onToggle={() => setOpenFilter((current) => current === "semester" ? null : "semester")} options={[{ value: "الكل", label: "كل الفصول" }, ...[1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ value: String(item), label: `الفصل ${item}` }))]} selected={semester} onChange={(value) => { setSemester(value); setOpenFilter(null); }} />
              <FilterDropdown label="نوع المادة" value={typeFilter === "الكل" ? "كل الأنواع" : typeFilter} open={openFilter === "type"} onToggle={() => setOpenFilter((current) => current === "type" ? null : "type")} options={typeFilters.map((item) => ({ value: item, label: item === "الكل" ? "كل الأنواع" : item }))} selected={typeFilter} onChange={(value) => { setTypeFilter(value as (typeof typeFilters)[number]); setOpenFilter(null); }} />
            </div>
          </div>

          <div className="list-helper"><span><SlidersHorizontal size={15} /> تظهر {filteredCourses.length} مادة</span><span><CircleHelp size={15} /> اضغط على المادة لتحديدها كمنجزة</span></div>
          <div className="course-list">
            {filteredCourses.length === 0 ? (
              <div className="empty-courses card-surface"><Filter size={24} /><strong>لا توجد مواد مطابقة</strong><span>جرّب تغيير كلمة البحث أو التصفية.</span></div>
            ) : filteredCourses.map((course) => {
              const isDone = completed.includes(course.id);
              return (
                <button key={course.id} className={`course-row ${isDone ? "is-done" : ""}`} onClick={() => toggleCourse(course.id)} aria-pressed={isDone}>
                  <span className={`course-status ${isDone ? "done" : ""}`}>{isDone ? <Check size={16} strokeWidth={3} /> : <span />}</span>
                  <span className="course-main"><strong>{course.name}</strong><small>{course.code}</small></span>
                  <span className="course-semester">الفصل {course.semester}</span>
                  <span className={`type-chip type-${course.type === "إجبارية" ? "required" : course.type === "اختيارية" ? "elective" : "university"}`}>{course.type}</span>
                  <span className="course-credits"><strong>{course.credits ?? "—"}</strong><small>{course.credits === null ? "بدون وحدات" : "وحدات"}</small></span>
                  <span className="course-arrow"><ArrowUpLeft size={16} /></span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="pdf-report" className="resources-section pdf-section">
          <div className="section-heading">
            <div><span className="section-kicker">03 · تقرير مخصص</span><h2>اختر المواد واحصل عليها PDF</h2><p>حدد أي مواد تريد من الخطة، ثم اضغط "طباعة المحدد / حفظ PDF" لتجهيز تقرير بها فقط.</p></div>
            <div className="course-count"><strong>{pdfSelectedCourses.length}</strong><span>مادة محددة<br />للتصدير</span></div>
          </div>

          <div className="pdf-toolbar card-surface">
            <div className="search-field"><Search size={18} /><input value={pdfQuery} onChange={(event) => setPdfQuery(event.target.value)} placeholder="ابحث لتحديد المواد بسرعة..." aria-label="البحث لتحديد المواد" />{pdfQuery && <button onClick={() => setPdfQuery("")} aria-label="مسح البحث"><X size={15} /></button>}</div>
            <div className="pdf-scope-switch" role="group" aria-label="نطاق المواد">
              <button className={`pdf-scope-btn ${pdfScope === "all" ? "active" : ""}`} onClick={() => setPdfScope("all")}>كل المواد</button>
              <button className={`pdf-scope-btn ${pdfScope === "current" ? "active" : ""}`} onClick={() => setPdfScope("current")}>الفصل الحالي</button>
            </div>
          </div>

          <div className="pdf-actions card-surface">
            <span className="pdf-hint"><SquareCheck size={15} /> تظهر {pdfFilteredCourses.length} مادة</span>
            <span className="pdf-count">المحدد: <strong>{pdfSelectedCourses.length}</strong> مادة · <strong className={pdfSelectedCredits >= MAX_EXPORT_CREDITS ? "limit-full" : ""}>{pdfSelectedCredits}</strong><small>/ {MAX_EXPORT_CREDITS} وحدة</small></span>
            <div className="pdf-budget"><div className="pdf-budget-bar"><div style={{ width: `${Math.min(100, (pdfSelectedCredits / MAX_EXPORT_CREDITS) * 100)}%` }} /></div><small>{MAX_EXPORT_CREDITS - pdfSelectedCredits} وحدة متاحة</small></div>
            <div className="pdf-buttons">
              <button className="ghost-button" onClick={selectAllPdfVisible} disabled={pdfFilteredCourses.length === 0}><SquareCheck size={16} /> <span>تحديد المعروض</span></button>
              <button className="ghost-button" onClick={clearPdfSelection} disabled={pdfSelectedCourses.length === 0}><RotateCcw size={16} /> <span>مسح التحديد</span></button>
              <button className="pdf-export-button" onClick={exportPdfSelection} disabled={printPayload !== null}><Printer size={16} /> <span>طباعة المحدد / حفظ PDF</span></button>
            </div>
          </div>

          <div className="pdf-list card-surface">
            {pdfFilteredCourses.length === 0 ? (
              <div className="empty-courses"><Filter size={24} /><strong>لا توجد مواد مطابقة</strong><span>جرّب تغيير كلمة البحث أو الفصل الدراسي.</span></div>
            ) : pdfFilteredCourses.map((course) => {
              const isSelected = pdfSelection.includes(course.id);
              return (
                <button key={course.id} className={`pdf-row ${isSelected ? "selected" : ""}`} onClick={() => togglePdfCourse(course.id)} aria-pressed={isSelected}>
                  <span className="pdf-check">{isSelected ? <SquareCheck size={13} strokeWidth={2.5} /> : <Square size={13} />}</span>
                  <span className="pdf-row-main"><strong>{course.name}</strong><small>الفصل {course.semester} · {course.type}</small></span>
                  <span className="pdf-code" dir="ltr">{course.code}</span>
                  <span className="pdf-credits"><strong>{course.credits ?? "—"}</strong></span>
                </button>
              );
            })}
          </div>

          {pdfSelectedCourses.length > 0 && (
            <div className="selected-chips">
              {pdfSelectedCourses.map((course) => (
                <span key={course.id} className="selected-chip"><span>{course.name}</span><button onClick={() => togglePdfCourse(course.id)} aria-label={`إزالة ${course.name} من التقرير`}><X size={13} /></button></span>
              ))}
            </div>
          )}
        </section>

        <section id="resources" className="resources-section">
          <div className="section-heading"><div><span className="section-kicker">04 · بوابتك إلى الجامعة</span><h2>روابط مهمة وأدوات سريعة</h2><p>كل ما تحتاجه لتبقى قريباً من خطتك ومصادرك.</p></div></div>
          <div className="resource-grid">
            <a className="resource-card" href="https://portal.esems.zu.edu.ly/student-portal/study-student/auth/login" target="_blank" rel="noopener noreferrer"><span className="resource-icon cyan"><Link2 size={20} /></span><span><strong>منظومة الطالب</strong><small>الدخول إلى النظام الأكاديمي</small></span><ExternalLink size={16} /></a>
            <a className="resource-card" href="https://i.ibb.co/NFzDxmw/petrophysics.png" target="_blank" rel="noopener noreferrer"><span className="resource-icon gold"><Map size={20} /></span><span><strong>خريطة المواد</strong><small>استعرض الخطة الدراسية كاملة</small></span><ExternalLink size={16} /></a>
            <a className="resource-card" href="https://www.facebook.com/share/1By4abMfmT/" target="_blank" rel="noopener noreferrer"><span className="resource-icon purple"><GraduationCap size={20} /></span><span><strong>عن الكلية والقسم</strong><small>صفحة الكلية على Facebook</small></span><ExternalLink size={16} /></a>
            <button className="resource-card reset-card" onClick={resetProgress}><span className="resource-icon red"><RotateCcw size={20} /></span><span><strong>إعادة ضبط التقدم</strong><small>مسح المواد المنجزة والبدء من جديد</small></span><RotateCcw size={16} /></button>
          </div>
        </section>
      </main>

      <footer className="footer print-hide"><span><span className="footer-mark"><Fuel size={14} /></span> بوابة الطالب · الجيولوجيا - الجيوفيزياء</span><span>جامعة الزاوية · ليبيا</span><span className="designer-credit">المصمم: المهندس: Mohammed Alrawab</span></footer>

      {printPayload ? (
        <section className="print-report" aria-label="تقرير المواد الحالية للطباعة">
          <header className="report-header">
            <div className="report-brand"><img className="report-university-logo" src="university-of-zawia-logo.png" alt="شعار جامعة الزاوية" /><div><strong>كلية الهندسة</strong><small>قسم الجيولوجيا · شعبة الجيوفيزياء · جامعة الزاوية</small></div></div>
            <div className="report-title"><span>تقرير مخصص</span><strong>المواد الحالية</strong><small>Custom Course Selection</small></div>
          </header>
          <div className="report-student"><div className="report-field"><span>اسم الطالب</span><strong>{displayName}</strong></div><div className="report-field"><span>القسم</span><strong>الجيولوجيا · شعبة الجيوفيزياء</strong></div><div className="report-field"><span>تاريخ الإصدار</span><strong>{new Intl.DateTimeFormat("ar-LY", { dateStyle: "long" }).format(new Date())}</strong></div></div>
          <div className="report-summary"><div><span>عدد المواد الحالية</span><strong>{printPayload.length}</strong></div><div><span>إجمالي الوحدات</span><strong>{printPayload.reduce((sum, course) => sum + (course.credits ?? 0), 0)}</strong></div><div><span>عدد الوحدات الكلية للطالب</span><strong>{completedCredits + printPayload.reduce((sum, course) => sum + (course.credits ?? 0), 0)}</strong></div></div>
          <ReportTable title={`المواد الحالية · ${printPayload.length} مادة`} items={printPayload} totalCredits={printPayload.reduce((sum, course) => sum + (course.credits ?? 0), 0)} done />
          <footer className="report-footer"><span>بوابة الطالب · جامعة الزاوية</span><span>مواد الفصل الحالي · {printPayload.length} مادة</span></footer>
          <div className="report-motivation"><span className="report-motivation-mark">❞</span>{motivationMessage}<span className="report-motivation-mark">❝</span></div>
        </section>
      ) : (
      <section className="print-report" aria-label="التقرير الأكاديمي للطباعة">
        <header className="report-header">
          <div className="report-brand"><img className="report-university-logo" src="university-of-zawia-logo.png" alt="شعار جامعة الزاوية" /><div><strong>كلية الهندسة</strong><small>قسم الجيولوجيا · شعبة الجيوفيزياء · جامعة الزاوية</small></div></div>
          <div className="report-title"><span>التقرير الأكاديمي</span><strong>سجل التقدم نحو التخرج</strong><small>Student Progress Record</small></div>
        </header>
        <div className="report-student"><div className="report-field"><span>اسم الطالب</span><strong>{displayName}</strong></div><div className="report-field"><span>القسم</span><strong>الجيولوجيا · شعبة الجيوفيزياء</strong></div><div className="report-field"><span>تاريخ الإصدار</span><strong>{new Intl.DateTimeFormat("ar-LY", { dateStyle: "long" }).format(new Date())}</strong></div></div>
        <div className="report-summary"><div><span>نسبة الإنجاز {reportSemester === "الكل" ? "العامة" : `· الفصل ${reportSemester}`}</span><strong>{reportPercentage}%</strong></div><div><span>الوحدات المنجزة</span><strong>{reportCompletedCredits} / {reportTotalCredits}</strong></div><div><span>المواد المكتملة</span><strong>{reportCompletedCourses.length} / {reportCourses.length}</strong></div></div>
        <ReportTable title={`المواد المنجزة${reportSemester === "الكل" ? "" : ` · الفصل ${reportSemester}`}`} items={reportCompletedCourses} totalCredits={reportCompletedCredits} done />
        <ReportTable title={`المواد المتبقية${reportSemester === "الكل" ? "" : ` · الفصل ${reportSemester}`}`} items={reportRemainingCourses} totalCredits={reportRemainingCredits} />
        <footer className="report-footer"><span>بوابة الطالب · جامعة الزاوية</span><span>الجيولوجيا · شعبة الجيوفيزياء · {reportPercentage}% إنجاز</span></footer>
        <div className="report-motivation"><span className="report-motivation-mark">❞</span>{motivationMessage}<span className="report-motivation-mark">❝</span></div>
      </section>
      )}

      {onboardingOpen && (
        <div className="onboarding-backdrop" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
          <div className="onboarding-modal">
            <div className="onboarding-glow" aria-hidden="true" />
            <span className="onboarding-logo"><Fuel size={28} /></span>
            <span className="onboarding-kicker">أهلاً بك في رحلتك</span>
            <h2 id="welcome-title">جاهز تبدأ<br /><em>مسارك نحو التخرج؟</em></h2>
            <p>خلّينا نعرف اسمك حتى نجهّز لك لوحة تقدم شخصية ومحفوظة على جهازك.</p>
            <label className="onboarding-label" htmlFor="onboarding-name">اسم الطالب</label>
            <input id="onboarding-name" className="onboarding-input" autoFocus value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && saveName()} placeholder="اكتب اسمك هنا" />
            <button className="primary-button" onClick={saveName}>ابدأ رحلتي <ArrowUpLeft size={18} /></button>
            <small className="onboarding-note"><span /> يُحفظ اسمك محلياً على هذا الجهاز فقط</small>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ label, value, options, selected, open, onToggle, onChange }: { label: string; value: string; options: { value: string; label: string }[]; selected: string; open: boolean; onToggle: () => void; onChange: (value: string) => void }) {
  return (
    <div className="filter-dropdown">
      <span className="filter-label">{label}</span>
      <button className={`filter-trigger ${open ? "is-open" : ""}`} onClick={onToggle} aria-expanded={open} aria-haspopup="listbox"><span>{value}</span><ChevronDown size={15} /></button>
      {open && <div className="filter-menu" role="listbox" aria-label={label}>{options.map((option) => <button key={option.value} role="option" aria-selected={selected === option.value} className={selected === option.value ? "selected" : ""} onClick={() => onChange(option.value)}>{selected === option.value ? <Check size={15} /> : <span className="option-dot" />}{option.label}</button>)}</div>}
    </div>
  );
}

function ReportTable({ title, items, totalCredits, done = false }: { title: string; items: Course[]; totalCredits: number; done?: boolean }) {
  return (
    <section className="report-table-section">
      <div className="report-section-title"><h2>{title}</h2><span className={done ? "report-done" : "report-remaining"}>{items.length} مادة · {totalCredits} وحدة</span></div>
      <table><thead><tr><th className="report-num">#</th><th>المادة</th><th>الرمز</th><th>الوحدات</th></tr></thead><tbody>{items.length ? items.map((course, index) => <tr key={course.id}><td className="report-center">{index + 1}</td><td>{course.name}</td><td className="report-code" dir="ltr">{course.code}</td><td className="report-center">{course.credits ?? "—"}</td></tr>) : <tr><td colSpan={4}>لا توجد مواد في هذه القائمة</td></tr>}</tbody></table>
    </section>
  );
}
