import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './HomePage';
import LessonsPage from './LessonsPage';
import QuizPage from './QuizPage';
import AchievementsPage from './AchievementsPage';

type Page = 'home' | 'lessons' | 'quiz' | 'achievements';

const NAV_ITEMS: { key: Page; label: string; emoji: string }[] = [
  { key: 'home', label: 'Главная', emoji: '🏠' },
  { key: 'lessons', label: 'Уроки', emoji: '🧪' },
  { key: 'quiz', label: 'Квест', emoji: '🎯' },
  { key: 'achievements', label: 'Достижения', emoji: '🏆' },
];

const STORAGE_KEY = 'fitil_lab_state';

interface AppState {
  readLessons: string[];
  totalScore: number;
  totalAnswered: number;
}

const loadState = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch (e) {
    console.warn(e);
  }
  return { readLessons: [], totalScore: 0, totalAnswered: 0 };
};

const FitilApp: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [animating, setAnimating] = useState(false);

  const [savedState] = useState(loadState);
  const [readLessons, setReadLessons] = useState<Set<string>>(new Set(savedState.readLessons));
  const [totalScore, setTotalScore] = useState(savedState.totalScore);
  const [totalAnswered, setTotalAnswered] = useState(savedState.totalAnswered);

  useEffect(() => {
    const state: AppState = {
      readLessons: Array.from(readLessons),
      totalScore,
      totalAnswered,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [readLessons, totalScore, totalAnswered]);

  const navigate = useCallback((target: Page | string) => {
    const t = target as Page;
    if (t === page || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setPage(t);
      setAnimating(false);
    }, 180);
  }, [page, animating]);

  const handleLessonRead = useCallback((id: string) => {
    setReadLessons(prev => new Set([...prev, id]));
  }, []);

  const handleScoreUpdate = useCallback((correct: boolean) => {
    if (correct) setTotalScore(s => s + 1);
    setTotalAnswered(s => s + 1);
  }, []);

  const stats = {
    lessonsRead: readLessons.size,
    quizScore: totalScore,
    totalAnswered,
  };

  return (
    <div
      className="flex flex-col h-full w-full max-w-md mx-auto relative"
      style={{ background: 'var(--lab-dark)' }}
    >
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none stars-bg opacity-60" style={{ maxWidth: '448px', left: '50%', transform: 'translateX(-50%)' }} />

      {/* Ambient glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(191,95,255,0.08) 0%, transparent 70%)' }} />

      {/* Main content */}
      <main
        className="flex-1 overflow-hidden relative"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        {page === 'home' && <HomePage onNavigate={navigate} stats={stats} />}
        {page === 'lessons' && <LessonsPage onLessonRead={handleLessonRead} readLessons={readLessons} />}
        {page === 'quiz' && (
          <QuizPage onScoreUpdate={handleScoreUpdate} totalScore={totalScore} totalAnswered={totalAnswered} />
        )}
        {page === 'achievements' && (
          <AchievementsPage readLessons={readLessons} totalScore={totalScore} totalAnswered={totalAnswered} />
        )}
      </main>

      {/* Bottom navigation */}
      <nav
        className="shrink-0 relative z-10"
        style={{
          background: 'rgba(15,10,26,0.97)',
          borderTop: '1px solid rgba(61,36,100,0.7)',
          backdropFilter: 'blur(16px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="grid grid-cols-4">
          {NAV_ITEMS.map(item => {
            const isActive = page === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className="flex flex-col items-center justify-center py-3 px-2 relative transition-all active:scale-90"
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ background: 'var(--neon-purple)' }}
                  />
                )}
                <span
                  className="text-xl mb-0.5 transition-all duration-200"
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(191,95,255,0.7))' : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {item.emoji}
                </span>
                <span
                  className="text-xs font-golos transition-colors duration-200"
                  style={{ color: isActive ? 'var(--neon-purple)' : 'rgba(245,230,200,0.35)' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default FitilApp;
