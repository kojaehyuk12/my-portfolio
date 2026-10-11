export default function ProjectVisual({ project, compact = false }) {
  return <div className={`project-visual visual-${project.visual} ${project.image ? 'has-image' : ''} ${compact ? 'compact' : ''}`}>
    {project.image && <img className="project-source-image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />}
    <div className="visual-meta"><span>PROJECT {project.number}</span><span>{project.imageLabel || 'PORTFOLIO COVER'}</span></div>
    {project.visual === 'running' && <div className="run-composition" aria-hidden="true">
      <div className="run-title"><span>RUN WITH A STORY</span><strong>뜀오<span>↗</span></strong><small>오늘의 러닝이, 하나의 이야기가 되도록.</small></div>
      <svg className="run-route" viewBox="0 0 330 250" fill="none"><path d="M15 212C40 120 132 238 186 138S243 9 306 57" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5"/><path d="M15 212C40 120 132 238 186 138S243 9 306 57" stroke="currentColor" strokeWidth="5" pathLength="100" strokeDasharray="35 65"/><circle cx="15" cy="212" r="8" fill="currentColor"/><circle cx="306" cy="57" r="10" fill="currentColor"/><circle cx="306" cy="57" r="20" stroke="currentColor" opacity=".4"/></svg>
      <div className="run-mode"><span>01 / CINEMA</span><span>02 / DOCENT</span><b>STORY<br />IN MOTION.</b></div>
    </div>}
    {project.visual === 'dance' && <div className="dance-cover-title" aria-hidden="true"><span>A THOUGHTFUL FINAL CHAPTER</span><strong>Last<br /><i>Dance.</i></strong><small>DESIGNING A CLEARER JOURNEY</small></div>}
    {project.visual === 'neko' && <div className="neko-composition" aria-hidden="true"><span className="neko-category">SINGLE PLAYER / ROGUELIKE</span><strong>SMALL CAT.<br /><i>BIG ADVENTURE.</i></strong><div className="pixel-cat"><span>✦</span><svg viewBox="0 0 160 120"><path d="M25 50V15H50V35H110V15H135V100H25Z" fill="currentColor"/><path d="M45 55H60V70H45ZM100 55H115V70H100ZM72 77H88V87H72Z" fill="#353025"/><path d="M15 80H45M115 80H145" stroke="#353025" strokeWidth="5"/></svg><span>✧</span></div></div>}
    {project.visual === 'movies' && <div className="ai-composition" aria-hidden="true"><span>IMAGINATION → DISCOVERY</span><strong>상상에서<br /><i>다음 영화로.</i></strong><div className="ai-prompt"><span>✳</span> “보고 싶은 장면을 상상해 보세요”<b>↗</b></div><small>DALL·E 3 &nbsp; / &nbsp; VISION &nbsp; / &nbsp; TMDB</small></div>}
    {project.visual === 'film' && <div className="film-composition" aria-hidden="true"><span>ONE FILM. MANY PERSPECTIVES.</span><strong>SEE THE<br /><i>BIGGER PICTURE.</i></strong><div className="film-score"><span>01<br /><b>DISCOVER</b></span><span>02<br /><b>COMPARE</b></span><span>03<br /><b>WATCH</b></span></div></div>}
    <span className="visual-bottom">{project.englishTitle}<span>{project.category} PROJECT</span></span>
  </div>;
}
