import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import SkillsPage from '@/pages/SkillsPage';
import FrameworksPage from '@/pages/FrameworksPage';
import WorkflowsPage from '@/pages/WorkflowsPage';

function App() {
  return (
    <HashRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/frameworks" element={<FrameworksPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
        </Routes>
      </main>
      <footer className="border-t py-6 px-6">
        <div className="max-w-6xl mx-auto text-xs text-muted-foreground">
          Created by <a href="https://github.com/MoiSerene" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2">Serene Jiang</a>
        </div>
      </footer>
    </HashRouter>
  );
}

export default App;
