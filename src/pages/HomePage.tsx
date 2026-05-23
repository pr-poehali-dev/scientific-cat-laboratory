import React, { useEffect, useState } from 'react';
import { SUBJECTS } from '@/data/lessons';

interface HomePageProps {
  onNavigate: (page: string) => void;
  stats: { lessonsRead: number; quizScore: number; totalAnswered: number };
}

const FITIL_GREETINGS = [
  'Ах, снова кожаный мешок. Присаживайтесь — наука ждать не будет.',
  'О, посетитель! Надеюсь, сегодня вы удивите меня хотя бы одним правильным ответом.',
  'Добро пожаловать в лабораторию. Здесь всё серьёзно. Особенно я.',
  'Наконец-то! Я уже начал думать, что человечество решило отказаться от знаний. Рановато.',
  'Профессор Фитиль принимает. Будьте готовы учиться — отговорки я не принимаю.',
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate, stats }) => {
  const [greeting] = useState(() =>
    FITIL_GREETINGS[Math.floor(Math.random() * FITIL_GREETINGS.length)]
  );
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const subjectList = Object.entries(SUBJECTS);

  return (
    <div className="scrollable h-full px-4 pt-6 pb-4">
      {/* Header */}
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-block relative">
          <div className="text-7xl mb-1 animate-float inline-block" style={{ filter: 'drop-shadow(0 0 18px rgba(191,95,255,0.6))' }}>
            {blinking ? '😺' : '🐱'}
          </div>
          {/* Lab badge */}
          <div className="absolute -top-1 -right-2 bg-neon-purple text-white text-xs font-oswald px-2 py-0.5 rounded-full"
            style={{ fontSize: '10px', background: 'var(--neon-purple)' }}>
            PhD
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold tracking-wide mt-2"
          style={{ color: 'var(--sand-light)', letterSpacing: '0.04em' }}>
          ЛАБОРАТОРИЯ
        </h1>
        <h2 className="font-display text-lg font-medium" style={{ color: 'var(--neon-purple)' }}>
          УЧЁНОГО КОТА ФИТИЛЯ
        </h2>
      </div>

      {/* Fitil speech bubble */}
      <div className="relative mx-2 mb-6 animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <div className="glass-card rounded-2xl p-4 border relative"
          style={{ borderColor: 'rgba(191,95,255,0.3)' }}>
          <div className="flex gap-2 items-start">
            <span className="text-lg mt-0.5">🔬</span>
            <p className="text-sm leading-relaxed italic" style={{ color: 'var(--sand-light)', opacity: 0.9 }}>
              {greeting}
            </p>
          </div>
        </div>
        {/* Triangle */}
        <div className="absolute -top-2 left-8 w-4 h-4 rotate-45 glass-card"
          style={{ borderTop: '1px solid rgba(191,95,255,0.3)', borderLeft: '1px solid rgba(191,95,255,0.3)' }} />
      </div>

      {/* Stats row */}
      {stats.lessonsRead > 0 || stats.totalAnswered > 0 ? (
        <div className="grid grid-cols-3 gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          {[
            { label: 'Уроков', value: stats.lessonsRead, emoji: '📚' },
            { label: 'Вопросов', value: stats.totalAnswered, emoji: '❓' },
            { label: 'Баллов', value: stats.quizScore, emoji: '⭐' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-3 text-center">
              <div className="text-xl">{s.emoji}</div>
              <div className="font-display text-lg font-bold" style={{ color: 'var(--orange-accent)' }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(245,230,200,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Section buttons */}
      <div className="space-y-3 mb-6 animate-fade-in" style={{ animationDelay: '0.25s', opacity: 0 }}>
        <button
          onClick={() => onNavigate('lessons')}
          className="w-full rounded-2xl p-4 text-left transition-transform active:scale-95 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,21,53,0.8))',
            border: '1.5px solid rgba(74,222,128,0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧪</span>
            <div>
              <div className="font-display font-semibold text-base tracking-wide" style={{ color: 'var(--sand-light)' }}>
                ЛАБОРАТОРИЯ ФИТИЛЯ
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(74,222,128,0.8)' }}>
                Интерактивные уроки • Химия, Физика, Космос
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-40">→</div>
        </button>

        <button
          onClick={() => onNavigate('quiz')}
          className="w-full rounded-2xl p-4 text-left transition-transform active:scale-95 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(191,95,255,0.15), rgba(34,21,53,0.8))',
            border: '1.5px solid rgba(191,95,255,0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <div className="font-display font-semibold text-base tracking-wide" style={{ color: 'var(--sand-light)' }}>
                ПРАВДА ИЛИ ЛОЖЬ
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(191,95,255,0.8)' }}>
                Проверь знания • {15} вопросов
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-40">→</div>
        </button>

        <button
          onClick={() => onNavigate('achievements')}
          className="w-full rounded-2xl p-4 text-left transition-transform active:scale-95 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,146,62,0.15), rgba(34,21,53,0.8))',
            border: '1.5px solid rgba(212,146,62,0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <div className="font-display font-semibold text-base tracking-wide" style={{ color: 'var(--sand-light)' }}>
                МОИ ДОСТИЖЕНИЯ
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(212,146,62,0.8)' }}>
                Статистика • Звания • Прогресс
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-40">→</div>
        </button>
      </div>

      {/* Subject chips */}
      <div className="animate-fade-in" style={{ animationDelay: '0.35s', opacity: 0 }}>
        <p className="text-xs mb-3 font-display tracking-widest" style={{ color: 'rgba(245,230,200,0.4)' }}>
          РАЗДЕЛЫ НАУКИ
        </p>
        <div className="flex gap-2 flex-wrap">
          {subjectList.map(([key, subj]) => (
            <button
              key={key}
              onClick={() => onNavigate('lessons')}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm glass-card border transition-all active:scale-95"
              style={{ borderColor: 'rgba(61,36,100,0.8)', color: subj.color }}
            >
              <span>{subj.emoji}</span>
              <span className="font-golos text-xs">{subj.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 pb-2 text-center">
        <p className="text-xs" style={{ color: 'rgba(245,230,200,0.2)' }}>
          Лаборатория Кота Фитиля · Наука с характером
        </p>
      </div>
    </div>
  );
};

export default HomePage;
