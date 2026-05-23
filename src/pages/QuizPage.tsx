import React, { useState, useCallback } from 'react';
import QUIZ_QUESTIONS, { CORRECT_REACTIONS, WRONG_REACTIONS } from '@/data/quiz';

interface QuizPageProps {
  onScoreUpdate: (correct: boolean) => void;
  totalScore: number;
  totalAnswered: number;
}

type Phase = 'intro' | 'question' | 'result' | 'finish';

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const QuizPage: React.FC<QuizPageProps> = ({ onScoreUpdate, totalScore, totalAnswered }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [reaction, setReaction] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

  const currentQ = shuffledQuestions[currentIdx];

  const handleAnswer = useCallback((answer: boolean) => {
    const correct = answer === currentQ.isTrue;
    setWasCorrect(correct);

    const r = correct
      ? CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]
      : WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)];
    setReaction(r);

    if (correct) setSessionScore(s => s + 1);
    setSessionAnswered(s => s + 1);
    onScoreUpdate(correct);
    setPhase('result');
  }, [currentQ, onScoreUpdate]);

  const handleNext = () => {
    if (currentIdx + 1 >= shuffledQuestions.length) {
      setPhase('finish');
    } else {
      setCurrentIdx(i => i + 1);
      setPhase('question');
    }
  };

  const handleRestart = () => {
    const newQ = shuffle(QUIZ_QUESTIONS).slice(0, 10);
    setShuffledQuestions(newQ);
    setCurrentIdx(0);
    setSessionScore(0);
    setSessionAnswered(0);
    setPhase('question');
  };

  const percent = shuffledQuestions.length > 0
    ? Math.round((sessionScore / Math.max(sessionAnswered, 1)) * 100)
    : 0;

  const getRank = (score: number, total: number) => {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 90) return { title: 'Гений-Лауреат', emoji: '🏅', color: '#fbbf24' };
    if (pct >= 70) return { title: 'Старший Лаборант', emoji: '🔬', color: '#4ade80' };
    if (pct >= 50) return { title: 'Стажёр Фитиля', emoji: '📚', color: '#60a5fa' };
    return { title: 'Любопытный Котёнок', emoji: '🐾', color: '#c084fc' };
  };

  if (phase === 'intro') {
    return (
      <div className="flex flex-col h-full">
        {/* Скроллируемое содержимое */}
        <div className="scrollable flex-1 px-4 pt-5 pb-2 space-y-3">
          {/* Заголовок — компактный */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="text-5xl animate-float inline-block">🎯</div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wide leading-tight" style={{ color: 'var(--sand-light)' }}>
                ПРАВДА<br />ИЛИ ЛОЖЬ
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(245,230,200,0.5)' }}>
                Научная викторина Профессора Фитиля
              </p>
            </div>
          </div>

          {/* Слово Фитиля */}
          <div className="glass-card rounded-2xl p-3 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="flex gap-2 items-start">
              <span className="text-xl shrink-0">🐱</span>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(245,230,200,0.9)' }}>
                «Я подготовил 10 научных утверждений. Некоторые — чистая правда, некоторые — популярные заблуждения. Будьте внимательны. Я слежу.»
              </p>
            </div>
          </div>

          {/* Статистика (если есть) */}
          {totalAnswered > 0 && (
            <div className="grid grid-cols-2 gap-2 animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
              <div className="glass-card rounded-xl p-3 text-center">
                <div className="font-display text-2xl font-bold" style={{ color: 'var(--orange-accent)' }}>{totalScore}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(245,230,200,0.5)' }}>🐾 Лап заработано</div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <div className="font-display text-2xl font-bold" style={{ color: 'var(--neon-purple)' }}>{totalAnswered}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(245,230,200,0.5)' }}>Вопросов решено</div>
              </div>
            </div>
          )}

          {/* Звания — компактно */}
          <div className="glass-card rounded-2xl p-3 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <p className="font-display text-xs tracking-widest mb-2" style={{ color: 'rgba(245,230,200,0.4)' }}>
              ЗВАНИЯ
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[
                { range: '90–100%', title: '🏅 Гений-Лауреат', color: '#fbbf24' },
                { range: '70–89%', title: '🔬 Ст. Лаборант', color: '#4ade80' },
                { range: '50–69%', title: '📚 Стажёр', color: '#60a5fa' },
                { range: '<50%', title: '🐾 Котёнок', color: '#c084fc' },
              ].map(r => (
                <div key={r.range} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: r.color }}>{r.title}</span>
                  <span className="text-xs" style={{ color: 'rgba(245,230,200,0.35)' }}>{r.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Кнопка — всегда видна внизу */}
        <div className="shrink-0 px-4 pb-4 pt-2">
          <button
            onClick={() => setPhase('question')}
            className="w-full py-4 rounded-2xl btn-primary font-display text-base tracking-wider"
          >
            НАЧАТЬ ИСПЫТАНИЕ
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'finish') {
    const rank = getRank(sessionScore, sessionAnswered);
    return (
      <div className="flex flex-col h-full">
        <div className="scrollable flex-1 px-4 pt-5 pb-2 space-y-3">
          <div className="text-center animate-bounce-in">
            <div className="text-5xl mb-1">{rank.emoji}</div>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--sand-light)' }}>
              РАУНД ЗАВЕРШЁН
            </h1>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center animate-fade-in">
            <div className="font-display text-5xl font-bold mb-1" style={{ color: rank.color }}>
              {sessionScore}/{sessionAnswered}
            </div>
            <div className="font-display text-lg mb-1" style={{ color: rank.color }}>{rank.emoji} {rank.title}</div>
            <div className="text-sm" style={{ color: 'rgba(245,230,200,0.6)' }}>{percent}% верных ответов</div>
            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(61,36,100,0.6)' }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${rank.color}, var(--neon-purple))` }} />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-3 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="flex gap-2 items-start">
              <span className="text-xl shrink-0">🐱</span>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(245,230,200,0.9)' }}>
                {percent >= 90
                  ? '«Признаю — вы меня впечатлили. Зафиксирую в журнале. Под грифом "Аномалия".»'
                  : percent >= 70
                    ? '«Неплохо. Вы работаете в правильном направлении. Продолжайте.»'
                    : percent >= 50
                      ? '«Половину знали — это уже что-то. Рекомендую изучить теорию внимательнее.»'
                      : '«Рекомендую вернуться в лабораторию и перечитать материалы. Наука требует времени.»'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-4 pb-4 pt-2">
          <button
            onClick={handleRestart}
            className="w-full py-4 rounded-2xl btn-primary font-display text-base tracking-wider"
          >
            СЫГРАТЬ ЕЩЁ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 pt-5 pb-4">
      {/* Progress */}
      <div className="mb-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display text-sm tracking-wide" style={{ color: 'rgba(245,230,200,0.5)' }}>
            Вопрос {currentIdx + 1} из {shuffledQuestions.length}
          </span>
          <span className="font-display text-sm font-bold" style={{ color: 'var(--orange-accent)' }}>
            🐾 {sessionScore} лап
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(61,36,100,0.6)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentIdx) / shuffledQuestions.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--neon-purple), var(--orange-accent))',
            }}
          />
        </div>
      </div>

      {phase === 'question' && (
        <div className="flex flex-col flex-1 animate-scale-in">
          {/* Category badge */}
          <div className="mb-3">
            <span className="text-xs px-3 py-1 rounded-full font-golos"
              style={{ background: 'rgba(191,95,255,0.2)', color: 'var(--neon-purple)', border: '1px solid rgba(191,95,255,0.3)' }}>
              {currentQ.category}
            </span>
          </div>

          {/* Question card */}
          <div className="glass-card rounded-2xl p-5 mb-5 flex-1 flex flex-col justify-center"
            style={{ border: '1.5px solid rgba(61,36,100,0.8)', minHeight: '160px' }}>
            <div className="text-center mb-3 text-3xl">🤔</div>
            <p className="text-base font-golos font-medium text-center leading-relaxed"
              style={{ color: 'var(--sand-light)' }}>
              {currentQ.statement}
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <button
              onClick={() => handleAnswer(true)}
              className="py-5 rounded-2xl font-display text-xl font-bold tracking-wider transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,21,53,0.9))',
                border: '2px solid rgba(74,222,128,0.5)',
                color: '#4ade80',
              }}
            >
              ✓ ПРАВДА
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="py-5 rounded-2xl font-display text-xl font-bold tracking-wider transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(248,113,113,0.2), rgba(34,21,53,0.9))',
                border: '2px solid rgba(248,113,113,0.5)',
                color: '#f87171',
              }}
            >
              ✗ ЛОЖЬ
            </button>
          </div>
        </div>
      )}

      {phase === 'result' && wasCorrect !== null && (
        <div className="flex flex-col flex-1 animate-scale-in">
          {/* Result indicator */}
          <div className={`rounded-2xl p-4 mb-4 text-center ${wasCorrect ? 'animate-bounce-in' : 'animate-shake'}`}
            style={{
              background: wasCorrect
                ? 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,21,53,0.9))'
                : 'linear-gradient(135deg, rgba(248,113,113,0.2), rgba(34,21,53,0.9))',
              border: `2px solid ${wasCorrect ? 'rgba(74,222,128,0.6)' : 'rgba(248,113,113,0.6)'}`,
            }}>
            <div className="text-4xl mb-1">{wasCorrect ? '✅' : '❌'}</div>
            <div className="font-display font-bold text-lg" style={{ color: wasCorrect ? '#4ade80' : '#f87171' }}>
              {wasCorrect ? 'ВЕРНО!' : 'НЕВЕРНО!'}
            </div>
          </div>

          {/* Explanation */}
          <div className="glass-card rounded-2xl p-4 mb-3">
            <p className="font-display text-xs tracking-widest mb-2" style={{ color: 'rgba(245,230,200,0.4)' }}>
              ОБЪЯСНЕНИЕ:
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,230,200,0.88)' }}>
              {currentQ.explanation}
            </p>
          </div>

          {/* Fitil reaction */}
          <div className="rounded-2xl p-4 mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(191,95,255,0.1), rgba(34,21,53,0.9))', border: '1.5px solid rgba(191,95,255,0.3)' }}>
            <div className="flex gap-2 items-start">
              <span className="text-xl shrink-0">🐱</span>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(245,230,200,0.85)' }}>
                {reaction}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl btn-primary font-display text-base tracking-wider mt-auto"
          >
            {currentIdx + 1 >= shuffledQuestions.length ? 'ПОСМОТРЕТЬ РЕЗУЛЬТАТ' : 'СЛЕДУЮЩИЙ ВОПРОС →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;