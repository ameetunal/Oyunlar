import { useState } from 'react';
import BottomNav from './components/BottomNav.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import CategoriesScreen from './screens/CategoriesScreen.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import StoryScreen from './screens/StoryScreen.jsx';
import ResultScreen from './screens/ResultScreen.jsx';
import LeaderboardScreen from './screens/LeaderboardScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { questions } from './data/questions.js';
import { loadStats, recordQuizResult } from './stats.js';

const ROUND_SIZE = 10;
const TAB_SCREENS = new Set(['home', 'categories', 'leaderboard', 'profile']);

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRoundFromPool(pool) {
  const picked = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
  return picked.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return {
      ...q,
      shuffledOptions: order.map((i) => q.options[i]),
      shuffledCorrectIndex: order.indexOf(q.correctIndex),
    };
  });
}

function buildRound(categoryKey) {
  const pool = categoryKey ? questions.filter((q) => q.category === categoryKey) : questions;
  return buildRoundFromPool(pool);
}

export default function QuizApp({ onExit }) {
  const [screen, setScreen] = useState('home');
  const [stats, setStats] = useState(loadStats);
  const [session, setSession] = useState(null);
  const [pendingStory, setPendingStory] = useState(null);
  const [lastPointsEarned, setLastPointsEarned] = useState(0);

  const startQuiz = (categoryKey) => {
    setSession({
      categoryKey,
      roundQuestions: buildRound(categoryKey),
      index: 0,
      correctCount: 0,
      solvedIds: [],
      wrongIds: [],
      selected: null,
      answered: false,
    });
    setScreen('quiz');
  };

  const startReview = () => {
    const pool = questions.filter((q) => stats.wrongIds.includes(q.id));
    if (pool.length === 0) return;
    setSession({
      categoryKey: null,
      roundQuestions: buildRoundFromPool(pool),
      index: 0,
      correctCount: 0,
      solvedIds: [],
      wrongIds: [],
      selected: null,
      answered: false,
    });
    setScreen('quiz');
  };

  const selectAnswer = (index) => {
    setSession((prev) => {
      if (!prev || prev.answered) return prev;
      const question = prev.roundQuestions[prev.index];
      const isCorrect = index === question.shuffledCorrectIndex;
      return {
        ...prev,
        selected: index,
        answered: true,
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        solvedIds: [...prev.solvedIds, question.id],
        wrongIds: isCorrect ? prev.wrongIds : [...prev.wrongIds, question.id],
      };
    });
  };

  const continueQuiz = () => {
    setSession((prev) => {
      if (!prev) return prev;
      const nextIndex = prev.index + 1;
      if (nextIndex >= prev.roundQuestions.length) {
        const { stats: newStats } = recordQuizResult({
          categoryKey: prev.categoryKey ?? prev.roundQuestions[0]?.category,
          correctCount: prev.correctCount,
          solvedIds: prev.solvedIds,
          wrongIds: prev.wrongIds,
        });
        setStats(newStats);
        setLastPointsEarned(prev.correctCount * 10);
        setScreen('result');
        return prev;
      }
      return { ...prev, index: nextIndex, selected: null, answered: false };
    });
  };

  const learnStory = () => {
    const question = session.roundQuestions[session.index];
    setPendingStory({ ref: question.storyRef, origin: 'quiz' });
    setScreen('story');
  };

  const openStoryFromHome = (ref) => {
    setPendingStory({ ref, origin: 'home' });
    setScreen('story');
  };

  const backFromStory = () => {
    setScreen(pendingStory?.origin === 'quiz' ? 'quiz' : 'home');
    setPendingStory(null);
  };

  const closeQuiz = () => {
    setSession(null);
    setScreen('home');
  };

  const navigate = (target) => {
    setSession(null);
    setScreen(target);
  };

  function renderScreen() {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            stats={stats}
            onStartQuiz={startQuiz}
            onOpenStory={openStoryFromHome}
            onExit={onExit}
            onStartReview={startReview}
          />
        );
      case 'categories':
        return <CategoriesScreen stats={stats} onStartQuiz={startQuiz} />;
      case 'quiz':
        return (
          <QuizScreen
            session={session}
            onSelectAnswer={selectAnswer}
            onContinue={continueQuiz}
            onLearnStory={learnStory}
            onClose={closeQuiz}
          />
        );
      case 'story':
        return <StoryScreen storyRef={pendingStory.ref} origin={pendingStory.origin} onBack={backFromStory} />;
      case 'result':
        return (
          <ResultScreen
            session={session}
            pointsEarned={lastPointsEarned}
            onStartQuiz={startQuiz}
            onGoHome={() => navigate('home')}
          />
        );
      case 'leaderboard':
        return <LeaderboardScreen stats={stats} />;
      case 'profile':
        return <ProfileScreen stats={stats} />;
      default:
        return null;
    }
  }

  return (
    <div className="quiz-app">
      {renderScreen()}
      {TAB_SCREENS.has(screen) && <BottomNav active={screen} onNavigate={navigate} />}
    </div>
  );
}
