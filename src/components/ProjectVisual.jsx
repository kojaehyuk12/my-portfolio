export default function ProjectVisual({ project }) {
  if (!project.image) return null;
  return <figure className="project-evidence"><img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" /><figcaption>{project.imageLabel}</figcaption></figure>;
}
