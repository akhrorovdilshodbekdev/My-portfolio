import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import {
  Clock,
  DollarSign,
  ArrowRight,
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Gauge
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface ROICalculatorProps {
  onPrefill: (service: string, details: string) => void;
}

type TabId = 'manual' | 'leads' | 'bookings' | 'support';

interface TabConfig {
  id: TabId;
  label: string;
  icon: ReactNode;
  description: string;
}

function SliderGroup({
  label,
  value,
  setValue,
  display,
  min,
  max,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  display?: string;
  min: number;
  max: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 leading-snug">{label}</label>
        <span className="text-xs font-bold font-mono text-ember bg-ember/5 border border-ember/10 px-2.5 py-0.5 rounded-md shrink-0 ml-3">
          {display ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-ember h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
      />
      {hint && (
        <p className="text-[10px] text-slate-400 leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

export default function ROICalculator({ onPrefill }: ROICalculatorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('manual');
  const { t, lang } = useLanguage();

  const currencySymbol = lang === 'uz' ? "so'm" : '$';
  const currencyPrefix = lang === 'uz' ? '' : '$';
  const currencySuffix = lang === 'uz' ? " so'm" : '';
  const hrsUnit = lang === 'uz' ? 'soat / hafta' : 'hrs/wk';
  const minUnit = lang === 'uz' ? 'daq' : 'min';
  const perMonth = lang === 'uz' ? '/ oy' : '/ mo';

  // Scale factor: Uzbek values in thousands of so'm, dollar values in USD
  const isUz = lang === 'uz';

  const formatCurrency = (value: number) => {
    if (isUz) {
      return value.toLocaleString() + " so'm";
    }
    return '$' + value.toLocaleString();
  };

  const TABS: TabConfig[] = [
    { id: 'manual', label: t('roi.manualWork'), icon: <Clock className="h-3.5 w-3.5" />, description: t('roi.manualDesc') },
    { id: 'leads', label: t('roi.lostLeads'), icon: <Users className="h-3.5 w-3.5" />, description: t('roi.leadsDesc') },
    { id: 'bookings', label: t('roi.bookings'), icon: <Calendar className="h-3.5 w-3.5" />, description: t('roi.bookingsDesc') },
    { id: 'support', label: t('roi.support'), icon: <MessageSquare className="h-3.5 w-3.5" />, description: t('roi.supportDesc') },
  ];

  // Manual Work
  const [manualHours, setManualHours] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(isUz ? 50000 : 30);

  // Lost Leads
  const [monthlyVisitors, setMonthlyVisitors] = useState(500);
  const [currentConversion, setCurrentConversion] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(isUz ? 80000 : 80);

  // Bookings
  const [monthlyBookings, setMonthlyBookings] = useState(200);
  const [noShowPercent, setNoShowPercent] = useState(15);
  const [bookingValue, setBookingValue] = useState(isUz ? 60000 : 60);

  // Support
  const [weeklyRequests, setWeeklyRequests] = useState(120);
  const [minutesEach, setMinutesEach] = useState(12);

  // Results
  const [results, setResults] = useState({
    hoursSaved: 0,
    moneySaved: 0,
    solution: '',
    breakdown: { label: '', current: 0, projected: 0, unit: '' }
  });

  useEffect(() => {
    let hoursSaved = 0;
    let moneySaved = 0;
    let solution = '';
    let breakdown = { label: '', current: 0, projected: 0, unit: '' };

    const manualSolution = lang === 'uz'
      ? 'Takroriy vazifalarni almashtirish uchun maxsus ish jarayoni avtomatlashtirish (n8n)'
      : 'Custom workflow automation (n8n) to replace repetitive tasks';
    const leadsSolution = lang === 'uz'
      ? 'Tez yuklanadigan yuqori konversiyali landing page'
      : 'High-converting landing page with fast load times';
    const bookingsSolution = lang === 'uz'
      ? "SMS, email yoki Telegram orqali avtomatik uchrashuv eslatmalari"
      : 'Automated appointment reminders via SMS, email, or Telegram';
    const supportSolution = lang === 'uz'
      ? 'Tez-tez so\'raladigan savollar uchun bilimlar bazasi va chatbot'
      : 'FAQ knowledge base and chatbot for common questions';

    const manualLabel = lang === 'uz' ? "Qo'l mehnatiga soatlar" : 'Hours on manual work';
    const leadsLabel = lang === 'uz' ? 'Oylik konversiyalar' : 'Monthly conversions';
    const bookingsLabel = lang === 'uz' ? "Oyiga kelmasliklar" : 'No-shows per month';
    const supportLabel = lang === 'uz' ? "Oyiga so'rovlar" : 'Support tickets / mo';

    const hrsMo = lang === 'uz' ? 'soat / oy' : 'hrs / mo';
    const salesMo = lang === 'uz' ? 'sotuv / oy' : 'sales';
    const lostMo = lang === 'uz' ? "yo'qotilgan bronlar / oy" : 'lost bookings';
    const ticketsMo = lang === 'uz' ? "so'rov / oy" : 'tickets';

    switch (activeTab) {
      case 'manual': {
        const monthlyHours = Math.round(manualHours * 4.33);
        const automatable = Math.round(monthlyHours * 0.85);
        hoursSaved = automatable;
        moneySaved = Math.round(hoursSaved * hourlyRate);
        solution = manualSolution;
        breakdown = {
          label: manualLabel,
          current: monthlyHours,
          projected: Math.round(monthlyHours * 0.15),
          unit: hrsMo
        };
        break;
      }
      case 'leads': {
        const conv = currentConversion;
        const improvedConv = Math.min(conv * 2.5, conv + 8);
        const currentSales = Math.round(monthlyVisitors * (conv / 100));
        const projectedSales = Math.round(monthlyVisitors * (improvedConv / 100));
        const extraSales = Math.max(0, projectedSales - currentSales);
        hoursSaved = Math.round(monthlyVisitors * 0.1);
        moneySaved = extraSales * avgOrderValue;
        solution = leadsSolution;
        breakdown = {
          label: leadsLabel,
          current: currentSales,
          projected: projectedSales,
          unit: salesMo
        };
        break;
      }
      case 'bookings': {
        const currentLost = Math.round(monthlyBookings * (noShowPercent / 100));
        const recovered = Math.round(currentLost * 0.75);
        hoursSaved = Math.round(monthlyBookings * (5 / 60));
        moneySaved = recovered * bookingValue;
        solution = bookingsSolution;
        breakdown = {
          label: bookingsLabel,
          current: currentLost,
          projected: currentLost - recovered,
          unit: lostMo
        };
        break;
      }
      case 'support': {
        const monthly = Math.round(weeklyRequests * 4.33);
        const deflectable = Math.round(monthly * 0.7);
        hoursSaved = Math.round((deflectable * minutesEach) / 60);
        moneySaved = Math.round(hoursSaved * 22);
        solution = supportSolution;
        breakdown = {
          label: supportLabel,
          current: monthly,
          projected: monthly - deflectable,
          unit: ticketsMo
        };
        break;
      }
    }

    setResults({ hoursSaved, moneySaved, solution, breakdown });
  }, [activeTab, manualHours, hourlyRate, monthlyVisitors, currentConversion, avgOrderValue, monthlyBookings, noShowPercent, bookingValue, weeklyRequests, minutesEach]);

  const handleExport = () => {
    let details = '';
    if (lang === 'uz') {
      switch (activeTab) {
        case 'manual':
          details = `Men ROI kalkulyator yordamida hisoblab chiqdim. Men haftasiga ${manualHours} soat qo'l mehnatiga sarflayman. Ish jarayonini avtomatlashtirish bilan oyiga ~${results.hoursSaved} soat va ${formatCurrency(results.moneySaved)} tejashim mumkin.`;
          break;
        case 'leads':
          details = `Men ROI kalkulyator yordamida hisoblab chiqdim. Mening oyiga ${monthlyVisitors} tashrif buyuruvchim bor, konversiya ${currentConversion}%. Yaxshiroq landing page oyiga ~${formatCurrency(results.moneySaved)} qo'shimcha daromad keltirishi mumkin.`;
          break;
        case 'bookings':
          details = `Men ROI kalkulyator yordamida hisoblab chiqdim. Mening oyiga ${monthlyBookings} bronim bor, ${noShowPercent}% kelmaslik darajasi. Avtomatik eslatmalar oyiga ~${formatCurrency(results.moneySaved)} tiklash imkonini beradi.`;
          break;
        case 'support':
          details = `Men ROI kalkulyator yordamida hisoblab chiqdim. Men haftasiga ${weeklyRequests} ta so'rov olaman, har biri ${minutesEach} daqiqa. Chatbot oyiga ~${results.hoursSaved} soat tejash imkonini beradi.`;
          break;
      }
    } else {
      switch (activeTab) {
        case 'manual':
          details = `I calculated my savings using your ROI tool. I spend ${manualHours} hours/week on manual tasks at $${hourlyRate}/hr. I could save ~${results.hoursSaved} hours and $${results.moneySaved.toLocaleString()}/month with workflow automation.`;
          break;
        case 'leads':
          details = `I calculated my savings using your ROI tool. I get ${monthlyVisitors} visitors/month at ${currentConversion}% conversion. A better landing page could unlock ~$${results.moneySaved.toLocaleString()}/month.`;
          break;
        case 'bookings':
          details = `I calculated my savings using your ROI tool. I have ${monthlyBookings} bookings/month with ${noShowPercent}% no-shows. Automated reminders could recover ~$${results.moneySaved.toLocaleString()}/month.`;
          break;
        case 'support':
          details = `I calculated my savings using your ROI tool. I get ${weeklyRequests} support requests/week at ${minutesEach} mins each. A chatbot could save ~${results.hoursSaved} hours/month.`;
          break;
      }
    }
    onPrefill(lang === 'uz' ? 'ROI Maslahat' : 'ROI Consultation', details);
  };

  const activeConfig = TABS.find(t => t.id === activeTab)!;

  return (
    <section id="roi" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-ember mb-3">
            {t('roi.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-primary-midnight mb-4">
            {t('roi.title')}
          </h3>
          <p className="text-base text-primary-midnight/70 font-sans leading-relaxed">
            {t('roi.subtitle')}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-lg shadow-slate-100/50">

          {/* ===== LEFT: Inputs ===== */}
          <div className="lg:col-span-7 p-6 md:p-8 space-y-6">

            {/* Tab Selector */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('roi.selectChallenge')}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-primary-midnight border-primary-midnight text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 italic">{activeConfig.description}</p>
            </div>

            {/* Dynamic Sliders */}
            <div className="space-y-6 pt-2">
              {activeTab === 'manual' && (
                <div className="space-y-5">
                  <SliderGroup
                    label={t('roi.manualHours')}
                    value={manualHours}
                    setValue={setManualHours}
                    display={`${manualHours} ${hrsUnit}`}
                    min={2}
                    max={60}
                    hint={lang === 'uz' ? "Ma'lumot kiritish, email kuzatuvlari, rejalashtirish, jadvallar" : "Data entry, email follow-ups, scheduling, spreadsheets"}
                  />
                  <SliderGroup
                    label={t('roi.hourlyRate')}
                    value={hourlyRate}
                    setValue={setHourlyRate}
                    display={isUz ? `${(hourlyRate).toLocaleString()} so'm/soat` : `$${hourlyRate}/hr`}
                    min={isUz ? 15000 : 15}
                    max={isUz ? 300000 : 150}
                    step={isUz ? 5000 : 5}
                  />
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="space-y-5">
                  <SliderGroup
                    label={t('roi.visitors')}
                    value={monthlyVisitors}
                    setValue={setMonthlyVisitors}
                    display={`${monthlyVisitors}`}
                    min={50}
                    max={5000}
                    step={50}
                  />
                  <SliderGroup
                    label={t('roi.conversionRate')}
                    value={currentConversion}
                    setValue={setCurrentConversion}
                    display={`${currentConversion}%`}
                    min={0.5}
                    max={15}
                    step={0.5}
                    hint={lang === 'uz' ? "Tashrif buyuruvchilarning necha foizi harakat qiladi?" : "What percentage of visitors take action?"}
                  />
                  <SliderGroup
                    label={t('roi.avgValue')}
                    value={avgOrderValue}
                    setValue={setAvgOrderValue}
                    display={isUz ? `${avgOrderValue.toLocaleString()} so'm` : `$${avgOrderValue}`}
                    min={isUz ? 10000 : 10}
                    max={isUz ? 2000000 : 2000}
                    step={isUz ? 10000 : 10}
                  />
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-5">
                  <SliderGroup
                    label={t('roi.appointments')}
                    value={monthlyBookings}
                    setValue={setMonthlyBookings}
                    display={`${monthlyBookings}`}
                    min={10}
                    max={800}
                    step={10}
                  />
                  <SliderGroup
                    label={t('roi.noShow')}
                    value={noShowPercent}
                    setValue={setNoShowPercent}
                    display={`${noShowPercent}%`}
                    min={2}
                    max={40}
                    hint={lang === 'uz' ? "Qancha bron bajarilmay qoladi?" : "How many bookings end up unfulfilled?"}
                  />
                  <SliderGroup
                    label={t('roi.revenuePerBooking')}
                    value={bookingValue}
                    setValue={setBookingValue}
                    display={isUz ? `${bookingValue.toLocaleString()} so'm` : `$${bookingValue}`}
                    min={isUz ? 10000 : 10}
                    max={isUz ? 500000 : 500}
                    step={isUz ? 5000 : 5}
                  />
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-5">
                  <SliderGroup
                    label={t('roi.supportRequests')}
                    value={weeklyRequests}
                    setValue={setWeeklyRequests}
                    display={`${weeklyRequests}`}
                    min={10}
                    max={500}
                    step={5}
                  />
                  <SliderGroup
                    label={t('roi.minutesPerRequest')}
                    value={minutesEach}
                    setValue={setMinutesEach}
                    display={`${minutesEach} ${minUnit}`}
                    min={2}
                    max={30}
                    hint={lang === 'uz' ? "O'qish, yozish va kuzatuvlarni o'z ichiga oladi" : "Including reading, typing, and follow-ups"}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ===== RIGHT: Results Panel ===== */}
          <div className="lg:col-span-5 bg-primary-midnight text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ember/[0.04] to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-ember flex items-center gap-2">
                <Gauge className="h-4 w-4" /> {t('roi.yourSavings')}
              </h4>

              {/* Two big metric cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-white/40 mb-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">{t('roi.timeSaved')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-sans tracking-tight text-white">
                      {results.hoursSaved}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{t('roi.hrsMo')}</span>
                  </div>
                </div>

                <div className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-white/40 mb-2">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">{t('roi.moneySaved')}</span>
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-black font-sans tracking-tight text-emerald-400">
                      {formatCurrency(results.moneySaved)}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{perMonth}</span>
                  </div>
                </div>
              </div>

              {/* Before vs After breakdown */}
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] space-y-2">
                <p className="text-[9px] font-mono font-bold text-ember uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" /> {t('roi.breakdown')}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{t('roi.before')}</span>
                  <span className="font-bold font-mono text-white">{results.breakdown.current} {results.breakdown.unit}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{t('roi.after')}</span>
                  <span className="font-bold font-mono text-emerald-400">{results.breakdown.projected} {results.breakdown.unit}</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${results.breakdown.current > 0
                        ? Math.min(100, ((results.breakdown.current - results.breakdown.projected) / results.breakdown.current) * 100)
                        : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Solution */}
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                <p className="text-[9px] font-mono font-bold text-ember uppercase tracking-wider mb-1.5">{t('roi.suggestedSolution')}</p>
                <p className="text-xs text-white/90 font-medium leading-relaxed">{results.solution}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 pt-6 space-y-2">
              <button
                onClick={handleExport}
                className="w-full bg-ember hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <span>{t('roi.sendNumbers')}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[9px] font-mono text-white/25 text-center">
                {t('roi.prefillNote')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
