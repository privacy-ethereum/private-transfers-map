import type { Project } from "../types/Project";
import { truncateText } from "../utils/truncateText";
import "./ProjectCard.css";

const MAX_DESCRIPTION_LENGTH = 90;

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const shortDescription = truncateText(
    project.description,
    MAX_DESCRIPTION_LENGTH
  );

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/vite.svg";
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-header">
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          className="project-logo"
          onError={handleLogoError}
        />
        <div className="project-header-info">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-category">{project.category}</span>
        </div>
      </div>
      <p className="project-description">{shortDescription}</p>
    </div>
  );
}

export default ProjectCard;
