import type { Project } from '../types/Project';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>
        <span className="project-category">{project.category}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-lists">
        {project.pros.length > 0 && (
          <div className="pros">
            <h4>Pros</h4>
            <ul>
              {project.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
        )}
        {project.cons.length > 0 && (
          <div className="cons">
            <h4>Cons</h4>
            <ul>
              {project.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
