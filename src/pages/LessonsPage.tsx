import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import LESSONS, { SUBJECTS, Lesson } from '@/data/lessons';
import FlaskAnimation from '@/components/animations/FlaskAnimation';
import LightAnimation from '@/components/animations/LightAnimation';
import PlanetAnimation from '@/components/animations/PlanetAnimation';
import AtomAnimation from '@/components/animations/AtomAnimation';

type Subject = 'all' | 'chemistry' | 'physics' | 'astronomy' | 'history';

interface LessonsPageProps {
  onLessonRead: (id: string) => void;
  readLessons: Set<string>;
}

const AnimationMap: Record<string, React.FC> = {
  flask: FlaskAnimation,
  light: LightAnimation,
  planet: PlanetAnimation,
  atom: AtomAnimation,
};

const LessonModal: React.FC<{ lesson: Lesson; onClose: () => void }> = ({ lesson, onClose }) => {
  const Animation = AnimationMap[lesson.animationType];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--lab-dark)',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '448px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(61,36,100,0.6)', paddingTop: 'max(16px, env(safe-area-inset-top, 16px))' }}
      >
        <button
          onClick={onClose}
          className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl active:scale-90 transition-transform"
          style={{ background: 'rgba(34,21,53,0.8)', color: 'var(--sand-light)' }}
        >
          ←
        </button>
        <div className="flex-1">
          <h2 className="font-display font-bold text-base" style={{ color: 'var(--sand-light)' }}>
            {lesson.title}
          </h2>
          <p className="text-xs" style={{ color: `${lesson.color}99` }}>
            {SUBJECTS[lesson.subject].label}
          </p>
        </div>
        <span className="text-2xl">{lesson.emoji}</span>
      </div>

      <div className="scrollable flex-1 px-4 py-4 space-y-4">
        {/* Animation block */}
        <div className="rounded-2xl overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${lesson.color}15, rgba(34,21,53,0.9))`, border: `1px solid ${lesson.color}40` }}>
          <Animation />
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-4">
          <h3 className="font-display font-semibold text-sm mb-3 tracking-wide" style={{ color: lesson.color }}>
            📖 ТЕОРИЯ
          </h3>
          {lesson.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: 'rgba(245,230,200,0.88)' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Fitil comment */}
        <div className="rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(191,95,255,0.12), rgba(34,21,53,0.9))', border: '1.5px solid rgba(191,95,255,0.4)' }}>
          <div className="flex gap-2 items-start">
            <span className="text-2xl shrink-0 animate-float">🐱</span>
            <div>
              <p className="font-display text-xs tracking-widest mb-2" style={{ color: 'rgba(191,95,255,0.7)' }}>
                ПРОФЕССОР ФИТИЛЬ КОММЕНТИРУЕТ:
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,230,200,0.9)' }}>
                {lesson.fitilComment}
              </p>
            </div>
          </div>
        </div>

        {/* Done button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl btn-primary font-display text-base tracking-wide"
        >
          ПОНЯЛ, ПРОФЕССОР!
        </button>

        {/* Отступ под плашку платформы */}
        <div style={{ height: '60px' }} />
      </div>
    </div>,
    document.body
  );
};

const LessonCard: React.FC<{ lesson: Lesson; isRead: boolean; onRead: (id: string) => void }> = ({
  lesson, isRead, onRead
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleOpen = () => {
    setExpanded(true);
    if (!isRead) onRead(lesson.id);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full text-left rounded-2xl p-4 transition-all active:scale-95 relative overflow-hidden"
        style={{
          background: 'rgba(34,21,53,0.7)',
          border: `1.5px solid ${isRead ? lesson.color + '60' : 'rgba(61,36,100,0.6)'}`,
        }}
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl mt-0.5 shrink-0">{lesson.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm tracking-wide truncate" style={{ color: 'var(--sand-light)' }}>
                {lesson.title}
              </span>
              {isRead && (
                <span className="text-xs shrink-0 px-1.5 py-0.5 rounded-full"
                  style={{ background: lesson.color + '30', color: lesson.color, fontSize: '10px' }}>
                  ✓ изучено
                </span>
              )}
            </div>
            <div className="text-xs mt-1" style={{ color: `${lesson.color}99` }}>
              {SUBJECTS[lesson.subject].label}
            </div>
          </div>
          <div className="shrink-0 text-xl opacity-40" style={{ color: 'var(--neon-purple)' }}>›</div>
        </div>
      </button>

      {expanded && <LessonModal lesson={lesson} onClose={() => setExpanded(false)} />}
    </>
  );
};

const LessonsPage: React.FC<LessonsPageProps> = ({ onLessonRead, readLessons }) => {
  const [activeSubject, setActiveSubject] = useState<Subject>('all');

  const filtered = activeSubject === 'all'
    ? LESSONS
    : LESSONS.filter(l => l.subject === activeSubject);

  const subjects: { key: Subject; label: string; emoji: string }[] = [
    { key: 'all', label: 'Все', emoji: '🔬' },
    { key: 'chemistry', label: 'Химия', emoji: '🧪' },
    { key: 'physics', label: 'Физика', emoji: '🍎' },
    { key: 'astronomy', label: 'Космос', emoji: '🪐' },
    { key: 'history', label: 'История', emoji: '📜' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <h1 className="font-display text-xl font-bold tracking-wide" style={{ color: 'var(--sand-light)' }}>
          🧪 ЛАБОРАТОРИЯ
        </h1>
        <p className="text-xs mt-1" style={{ color: 'rgba(245,230,200,0.5)' }}>
          {readLessons.size} из {LESSONS.length} уроков изучено
        </p>

        {/* Progress bar */}
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(61,36,100,0.6)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(readLessons.size / LESSONS.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--neon-purple), var(--orange-accent))',
            }}
          />
        </div>
      </div>

      {/* Subject filter */}
      <div className="px-4 pb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto scrollable pb-1" style={{ scrollbarWidth: 'none' }}>
          {subjects.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSubject(s.key)}
              className="flex items-center gap-1.5 shrink-0 rounded-full px-3 py-2 text-xs font-golos transition-all active:scale-95"
              style={activeSubject === s.key
                ? { background: 'rgba(191,95,255,0.25)', border: '1.5px solid var(--neon-purple)', color: 'var(--neon-purple)' }
                : { background: 'rgba(34,21,53,0.7)', border: '1.5px solid rgba(61,36,100,0.6)', color: 'rgba(245,230,200,0.6)' }
              }
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons list */}
      <div className="scrollable flex-1 px-4 space-y-3 pb-4">
        {filtered.map((lesson, i) => (
          <div key={lesson.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
            <LessonCard
              lesson={lesson}
              isRead={readLessons.has(lesson.id)}
              onRead={onLessonRead}
            />
          </div>
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
};

export default LessonsPage;