import { useState, useMemo } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProjectCard from './components/ProjectCard';
import projectsData from './data/projects.json';
import type { Project } from './types/Project';

const projects: Project[] = projectsData;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((p) => p.category))];
    return uniqueCategories.sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Private Transfers Map</h1>
        <p className="subtitle">Explore and discover private transfer projects in the ecosystem</p>
      </header>

      <main className="app-main">
        <div className="filters">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="results-info">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
