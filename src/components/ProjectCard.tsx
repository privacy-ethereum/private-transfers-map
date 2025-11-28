import type { Project } from "../types/Project";
import "./ProjectCard.css";

const MAX_DESCRIPTION_LENGTH = 90;
const TRUNCATION_SUFFIX = "...";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const shortDescription =
    project.description.length > MAX_DESCRIPTION_LENGTH
      ? project.description.substring(
          0,
          MAX_DESCRIPTION_LENGTH - TRUNCATION_SUFFIX.length
        ) + TRUNCATION_SUFFIX
      : project.description;

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
