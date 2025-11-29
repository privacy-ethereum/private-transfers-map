import type { Project } from "../../types/Project";
import "./ProjectPage.css";

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

function ProjectPage({ project, onBack }: ProjectPageProps) {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/pse-logo-white.png";
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="project-page-content">
        <div className="project-page-header">
          <img
            src={project.logo}
            alt={`${project.title} logo`}
            className="project-page-logo"
            onError={handleLogoError}
          />
          <div className="project-page-title-section">
            <h1 className="project-page-title">{project.title}</h1>
            <span className="project-page-category">{project.category}</span>
          </div>
        </div>

        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="project-page-website"
        >
          {project.website}
        </a>

        <div
          className="project-page-description"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <div className="project-page-lists">
          {project.pros.length > 0 && (
            <div className="project-page-pros">
              <h3>Pros</h3>
              <ul>
                {project.pros.map((pro, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: pro }} />
                ))}
              </ul>
            </div>
          )}
          {project.cons.length > 0 && (
            <div className="project-page-cons">
              <h3>Cons</h3>
              <ul>
                {project.cons.map((con, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: con }} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
