import React from 'react';
import LESSONS from '@/data/lessons';
import QUIZ_QUESTIONS from '@/data/quiz';

interface AchievementsPageProps {
  readLessons: Set<string>;
  totalScore: number;
  totalAnswered: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  unlocked: boolean;
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({
  readLessons,
  totalScore,
  totalAnswered,
}) => {
  const totalLessons = LESSONS.length;
  const totalQuizQ = QUIZ_QUESTIONS.length;
  const accuracy = totalAnswered > 0 ? Math.round((totalScore / totalAnswered) * 100) : 0;

  const rank = (() => {
    if (accuracy >= 90 && totalAnswered >= 5) return { title: 'Гений-Лауреат', emoji: '🏅', color: '#fbbf24' };
    if (accuracy >= 70 && totalAnswered >= 3) return { title: 'Старший Лаборант', emoji: '🔬', color: '#4ade80' };
    if (totalAnswered >= 1) return { title: 'Стажёр Фитиля', emoji: '📚', color: '#60a5fa' };
    return { title: 'Новичок Лаборатории', emoji: '🐾', color: '#c084fc' };
  })();

  const achievements: Achievement[] = [
    {
      id: 'first_lesson',
      title: 'Первый шаг',
      description: 'Прочитал первый урок',
      emoji: '📖',
      color: '#4ade80',
      unlocked: readLessons.size >= 1,
    },
    {
      id: 'five_lessons',
      title: 'Прилежный студент',
      description: 'Изучил 5 уроков',
      emoji: '📚',
      color: '#4ade80',
      unlocked: readLessons.size >= 5,
    },
    {
      id: 'all_lessons',
      title: 'Аспирант Фитиля',
      description: `Прочитал все ${totalLessons} уроков`,
      emoji: '🎓',
      color: '#fbbf24',
      unlocked: readLessons.size >= totalLessons,
    },
    {
      id: 'chemistry_all',
      title: 'Химик',
      description: 'Изучил все уроки химии',
      emoji: '🧪',
      color: '#4ade80',
      unlocked: LESSONS.filter(l => l.subject === 'chemistry').every(l => readLessons.has(l.id)),
    },
    {
      id: 'physics_all',
      title: 'Физик',
      description: 'Изучил все уроки физики',
      emoji: '🍎',
      color: '#60a5fa',
      unlocked: LESSONS.filter(l => l.subject === 'physics').every(l => readLessons.has(l.id)),
    },
    {
      id: 'astronomy_all',
      title: 'Звездочёт',
      description: 'Изучил все уроки астрономии',
      emoji: '🪐',
      color: '#c084fc',
      unlocked: LESSONS.filter(l => l.subject === 'astronomy').every(l => readLessons.has(l.id)),
    },
    {
      id: 'history_all',
      title: 'Историк науки',
      description: 'Изучил всю историю науки',
      emoji: '📜',
      color: '#fbbf24',
      unlocked: LESSONS.filter(l => l.subject === 'history').every(l => readLessons.has(l.id)),
    },
    {
      id: 'first_quiz',
      title: 'Первая попытка',
      description: 'Ответил на первый вопрос',
      emoji: '🎯',
      color: '#c084fc',
      unlocked: totalAnswered >= 1,
    },
    {
      id: 'ten_answers',
      title: 'Испытуемый',
      description: 'Ответил на 10 вопросов',
      emoji: '💡',
      color: '#c084fc',
      unlocked: totalAnswered >= 10,
    },
    {
      id: 'perfect',
      title: 'Перфекционист',
      description: '100% точность (не менее 5 вопросов)',
      emoji: '💎',
      color: '#fbbf24',
      unlocked: accuracy === 100 && totalAnswered >= 5,
    },
    {
      id: 'half_correct',
      title: 'Больше половины',
      description: 'Более 50% правильных ответов',
      emoji: '⭐',
      color: '#fbbf24',
      unlocked: accuracy >= 50 && totalAnswered >= 5,
    },
    {
      id: 'genius',
      title: 'Гений-Лауреат',
      description: '90%+ точность и 5+ вопросов',
      emoji: '🏅',
      color: '#fbbf24',
      unlocked: accuracy >= 90 && totalAnswered >= 5,
    },
  ];

  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);

  const fitilComment = (() => {
    if (unlocked.length === 0) return '«Пусто? Серьёзно? Начните хотя бы один урок. Даже мой хвост знает больше.»';
    if (readLessons.size >= totalLessons) return '«Все уроки пройдены. Признаю — это впечатляет. Почти как моя диссертация.»';
    if (unlocked.length >= 6) return '«Неплохая коллекция достижений. Чувствую, вы втягиваетесь. Добро пожаловать в науку.»';
    return '«Прогресс зафиксирован. Продолжайте — вселенная не закончится, пока вы учитесь.»';
  })();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3 shrink-0">
        <h1 className="font-display text-xl font-bold tracking-wide" style={{ color: 'var(--sand-light)' }}>
          🏆 ДОСТИЖЕНИЯ
        </h1>
      </div>

      <div className="scrollable flex-1 px-4 pb-4 space-y-4">
        {/* Rank card */}
        <div className="rounded-2xl p-5 text-center animate-scale-in relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${rank.color}20, rgba(34,21,53,0.95))`,
            border: `2px solid ${rank.color}50`,
          }}>
          <div className="text-5xl mb-2 animate-float inline-block">{rank.emoji}</div>
          <h2 className="font-display text-xl font-bold" style={{ color: rank.color }}>
            {rank.title}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'rgba(245,230,200,0.5)' }}>
            Текущее звание
          </p>

          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ boxShadow: `inset 0 0 40px ${rank.color}15` }} />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {[
            { label: 'Уроков изучено', value: `${readLessons.size}/${totalLessons}`, emoji: '📚', color: '#4ade80' },
            { label: 'Вопросов', value: totalAnswered, emoji: '❓', color: '#c084fc' },
            { label: 'Лап заработано', value: totalScore, emoji: '🐾', color: '#fbbf24' },
            { label: 'Точность', value: `${accuracy}%`, emoji: '🎯', color: '#60a5fa' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-3 text-center">
              <div className="text-2xl">{s.emoji}</div>
              <div className="font-display text-xl font-bold mt-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(245,230,200,0.5)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Subject progress */}
        <div className="glass-card rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <p className="font-display text-xs tracking-widest mb-3" style={{ color: 'rgba(245,230,200,0.4)' }}>
            ПРОГРЕСС ПО РАЗДЕЛАМ
          </p>
          <div className="space-y-3">
            {[
              { key: 'chemistry', label: 'Химия и Биология', emoji: '🧪', color: '#4ade80' },
              { key: 'physics', label: 'Физика', emoji: '🍎', color: '#60a5fa' },
              { key: 'astronomy', label: 'Астрономия', emoji: '🪐', color: '#c084fc' },
              { key: 'history', label: 'История науки', emoji: '📜', color: '#fbbf24' },
            ].map(subj => {
              const total = LESSONS.filter(l => l.subject === subj.key).length;
              const done = LESSONS.filter(l => l.subject === subj.key && readLessons.has(l.id)).length;
              const pct = total > 0 ? (done / total) * 100 : 0;
              return (
                <div key={subj.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-golos" style={{ color: 'rgba(245,230,200,0.7)' }}>
                      {subj.emoji} {subj.label}
                    </span>
                    <span className="text-xs font-display font-bold" style={{ color: subj.color }}>
                      {done}/{total}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(61,36,100,0.6)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: subj.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fitil comment */}
        <div className="rounded-2xl p-4 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0, background: 'linear-gradient(135deg, rgba(191,95,255,0.1), rgba(34,21,53,0.9))', border: '1.5px solid rgba(191,95,255,0.3)' }}>
          <div className="flex gap-2 items-start">
            <span className="text-xl">🐱</span>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(245,230,200,0.9)' }}>
              {fitilComment}
            </p>
          </div>
        </div>

        {/* Achievements grid */}
        {unlocked.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.25s', opacity: 0 }}>
            <p className="font-display text-xs tracking-widest mb-3" style={{ color: 'rgba(245,230,200,0.4)' }}>
              ПОЛУЧЕНО ({unlocked.length})
            </p>
            <div className="grid grid-cols-2 gap-2">
              {unlocked.map((a, i) => (
                <div key={a.id}
                  className="rounded-xl p-3 animate-bounce-in"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    background: `linear-gradient(135deg, ${a.color}18, rgba(34,21,53,0.95))`,
                    border: `1.5px solid ${a.color}50`,
                  }}>
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <div className="font-display text-xs font-bold" style={{ color: a.color }}>{a.title}</div>
                  <div className="text-xs mt-0.5 leading-tight" style={{ color: 'rgba(245,230,200,0.55)' }}>
                    {a.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked achievements */}
        {locked.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <p className="font-display text-xs tracking-widest mb-3" style={{ color: 'rgba(245,230,200,0.3)' }}>
              ЕЩЁ ВПЕРЕДИ ({locked.length})
            </p>
            <div className="grid grid-cols-2 gap-2">
              {locked.map((a) => (
                <div key={a.id}
                  className="rounded-xl p-3"
                  style={{ background: 'rgba(34,21,53,0.5)', border: '1.5px solid rgba(61,36,100,0.4)' }}>
                  <div className="text-2xl mb-1 grayscale opacity-40">🔒</div>
                  <div className="font-display text-xs font-bold" style={{ color: 'rgba(245,230,200,0.35)' }}>
                    {a.title}
                  </div>
                  <div className="text-xs mt-0.5 leading-tight" style={{ color: 'rgba(245,230,200,0.3)' }}>
                    {a.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
};

export default AchievementsPage;
