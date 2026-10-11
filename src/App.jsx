import { useEffect, useRef, useState } from 'react';
import { profile, projects, projectCategories, skillGroups, principles, awards, education } from './data/portfolio';
import Icon from './components/Icon';
import ProjectDialog from './components/ProjectDialog';
import { caseStudies } from './data/caseStudies';

const navigation = [
  { id: 'hero', file: 'README.md', label: '시작', icon: 'book' },
  { id: 'projects', file: 'projects/', label: '프로젝트', icon: 'folder' },
  { id: 'skills', file: 'stack.json', label: '기술 스택', icon: 'code' },
  { id: 'about', file: 'about.md', label: '소개', icon: 'person' },
  { id: 'education', file: 'education.md', label: '교육', icon: 'education' },
  { id: 'contact', file: 'contact.md', label: '연락', icon: 'mail' },
];
const categories = { '웹': 'Web', '모바일': 'Mobile', '게임': 'Game' };

function SectionHeading({ file, title, description, children }) {
  return <div className="section-heading"><div><span className="section-path"><span aria-hidden="true">~/</span>{file}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div>;
}
function ExternalLink({ href, children, className = '', ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>{children}<span className="sr-only"> (새 창에서 열기)</span></a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('전체');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const menuButtonRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  const projectSearchRef = useRef(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProjects = projects.filter(project => (projectFilter === '전체' || project.category === projectFilter) && `${project.title} ${project.summary} ${project.role} ${project.stack.join(' ')}`.toLocaleLowerCase().includes(normalizedQuery));
  const currentFile = navigation.find(item => item.id === activeSection)?.file || 'README.md';

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
      const isTyping = event.target instanceof HTMLElement && (event.target.matches('input, textarea, select') || event.target.isContentEditable);
      if (event.key === '/' && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey && !selectedProject) {
        event.preventDefault(); setMenuOpen(false);
        document.getElementById('projects')?.scrollIntoView();
        projectSearchRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, selectedProject]);
  useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

  async function copyContact() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setToast('이메일 주소를 복사했습니다.'); }
    catch { setToast(`직접 복사해 주세요: ${profile.email}`); }
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => { setToast(''); setCopied(false); }, 5000);
  }
  function navigate() { setMenuOpen(false); }

  return <>
    <a className="skip-link" href="#main">본문으로 이동</a>
    <header className="mobile-header"><a href="#hero" onClick={navigate} className="mobile-brand"><Icon name="terminal" size={20} /><strong>{profile.name}</strong><span>/ portfolio</span></a><button ref={menuButtonRef} type="button" className="icon-button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="workspace-navigation" onClick={() => setMenuOpen(open => !open)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></header>
    {menuOpen && <button type="button" className="sidebar-backdrop" aria-label="메뉴 닫기" onClick={navigate} />}
    <aside className={`workspace-sidebar ${menuOpen ? 'is-open' : ''}`}>
      <a className="workspace-brand" href="#hero" onClick={navigate}><span className="brand-mark"><Icon name="terminal" size={22} /></span><span>{profile.name}<small>DEVELOPER PORTFOLIO</small></span></a>
      <div className="sidebar-profile"><span className="profile-initial" aria-hidden="true">고</span><strong>{profile.name}</strong><span>Frontend &amp; Mobile<br />Developer</span><ExternalLink href={profile.github} className="profile-handle">@kojaehyuk12<Icon name="arrow" size={12} /></ExternalLink></div>
      <nav id="workspace-navigation" aria-label="포트폴리오 메뉴"><div className="nav-label">EXPLORER<span>{navigation.length}</span></div><div className="explorer-root"><Icon name="chevron" size={13} /><Icon name="folder" size={15} />portfolio</div><div className="file-navigation">{navigation.map(item => <a href={`#${item.id}`} key={item.id} onClick={navigate} className={activeSection === item.id ? 'is-active' : ''} aria-current={activeSection === item.id ? 'location' : undefined}><Icon name={item.icon} size={16} /><span>{item.file}</span><span className="sr-only"> · {item.label}</span>{item.id === 'projects' && <small>{projects.length}</small>}</a>)}</div></nav>
      <div className="sidebar-links"><div className="nav-label">ELSEWHERE</div><ExternalLink href={profile.github}><Icon name="github" size={17} />GitHub<Icon name="arrow" size={13} /></ExternalLink><ExternalLink href={profile.notion}><Icon name="book" size={17} />개발 기록<Icon name="arrow" size={13} /></ExternalLink></div>
      <div className="sidebar-bottom"><Icon name="branch" size={15} /><span>main</span><span className="sidebar-location">웹 · 모바일 · 게임</span></div>
    </aside>

    <div className="workspace-main">
      <div className="workspace-topbar"><div className="breadcrumb"><span>portfolio</span><Icon name="chevron" size={13} /><span>{currentFile}</span></div><ExternalLink href={profile.github}><Icon name="github" size={15} /><span>GitHub 프로필</span><Icon name="arrow" size={13} /></ExternalLink></div>
      <main id="main" className="content-container">
        <section id="hero" className="readme-section">
          <div className="file-tab"><Icon name="book" size={16} /><span>README.md</span><span className="file-tab-detail">고재혁의 개발 기록</span></div>
          <div className="readme-panel">
            <div className="readme-intro"><div className="hero-kicker"><span />FRONTEND &amp; MOBILE DEVELOPER</div><h1>안녕하세요,<br /><strong>개발자 고재혁</strong>입니다<span className="accent">.</span></h1><p className="hero-description">화면의 흐름을 설계하고,<br />웹과 모바일에서 동작하는 서비스로 구현합니다.</p><div className="hero-tech"><span>React</span><span>Vue</span><span>Kotlin</span><span>Jetpack Compose</span></div><div className="hero-actions"><a className="button button-primary" href="#projects"><Icon name="folder" size={17} />프로젝트 보기<Icon name="down" size={15} /></a><a className="button button-secondary" href={`mailto:${profile.email}`}><Icon name="mail" size={17} />연락하기</a></div></div>
            <div className="profile-code" aria-label="개발자 프로필 요약"><div className="code-file"><Icon name="code" size={15} />profile.json<span>JSON</span></div><div className="code-lines"><div><span>01</span><code>{'{'}</code></div><div><span>02</span><code>&nbsp; <b>"name"</b>: <em>"고재혁"</em>,</code></div><div><span>03</span><code>&nbsp; <b>"focus"</b>: [</code></div><div><span>04</span><code>&nbsp; &nbsp; <em>"Frontend"</em>,</code></div><div><span>05</span><code>&nbsp; &nbsp; <em>"Android"</em></code></div><div><span>06</span><code>&nbsp; ],</code></div><div><span>07</span><code>&nbsp; <b>"experience"</b>: <em>"FE Lead"</em>,</code></div><div><span>08</span><code>&nbsp; <b>"projects"</b>: <i>{projects.length}</i></code></div><div><span>09</span><code>{'}'}</code></div></div><div className="code-caption"><Icon name="check" size={13} />경험을 코드와 기록으로 남깁니다.</div></div>
          </div>
          <div className="readme-summary"><div><span className="summary-number">{String(projects.length).padStart(2, '0')}</span><span>프로젝트<small>직접 구현하고 협업한 경험</small></span></div><div><span className="summary-number">03</span><span>개발 영역<small>Web · Mobile · Game</small></span></div><div><Icon name="education" size={27} /><span>SSAFY 13기<small>팀 프로젝트와 성장의 기록</small></span></div></div>
        </section>

        <section id="projects" className="content-section">
          <SectionHeading file="projects/" title="프로젝트와 문제 해결" description="담당 아키텍처부터 문제 상황, 기술적 판단과 구현 결과까지."><span className="section-count">{String(projects.length).padStart(2, '0')} projects</span></SectionHeading>
          <div className="project-toolbar"><div className="project-filters" role="group" aria-label="프로젝트 분야 필터">{projectCategories.map(category => <button key={category} type="button" aria-pressed={projectFilter === category} onClick={() => setProjectFilter(category)}>{category}<span>{category === '전체' ? projects.length : projects.filter(p => p.category === category).length}</span></button>)}</div><div className="project-search"><Icon name="search" size={16} /><input ref={projectSearchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="프로젝트 또는 기술 검색" aria-label="프로젝트 또는 기술 검색" aria-keyshortcuts="/" /><kbd aria-hidden="true">/</kbd></div></div>
          <p className="sr-only" role="status" aria-live="polite">{visibleProjects.length}개의 프로젝트</p>
          <div className="repository-grid">{visibleProjects.map(project => <article className={`repository-card ${Number(project.number) <= 2 ? 'is-featured' : ''}`} key={project.id}>
            <div className="repository-top"><span className={`project-category category-${categories[project.category].toLowerCase()}`}><Icon name="folder" size={18} />{categories[project.category]}</span>{Number(project.number) <= 2 ? <span className="featured-label"><Icon name="pin" size={12} />대표 프로젝트</span> : <span className="project-index">/{project.number}</span>}</div>
            <h3><button type="button" onClick={() => setSelectedProject(project)}>{project.title}<Icon name="arrow" size={18} /></button></h3><p className="project-subtitle">{caseStudies[project.id]?.focus || project.subtitle}</p><p className="project-description">{project.summary}</p>
            {project.challenge && project.solution && <dl className="project-engineering"><div><dt>문제</dt><dd>{project.challenge}</dd></div><div><dt>해결</dt><dd>{project.solution}</dd></div></dl>}
            <dl className="project-metadata"><div><dt>기간</dt><dd>{project.period}</dd></div><div><dt>역할</dt><dd>{project.role}</dd></div></dl><div className="tech-tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="project-actions"><ExternalLink href={project.githubUrl || profile.github}><Icon name="github" size={16} />{project.githubUrl ? '소스 코드' : 'GitHub 프로필'}</ExternalLink><button type="button" onClick={() => setSelectedProject(project)} aria-label={`${project.title} 구현 상세 보기`}>{caseStudies[project.id] ? '구조도 · 해결 과정' : '담당 내용 보기'}<Icon name="chevron" size={16} /></button></div>
          </article>)}</div>
          {!visibleProjects.length && <div className="empty-search"><Icon name="search" size={27} /><h3>일치하는 프로젝트가 없습니다.</h3><p>다른 기술명으로 검색하거나 필터를 초기화해 보세요.</p><button type="button" className="button button-secondary" onClick={() => { setQuery(''); setProjectFilter('전체'); }}>전체 프로젝트 보기</button></div>}
        </section>

        <section id="skills" className="content-section"><SectionHeading file="stack.json" title="기술 스택" description="프로젝트에서 직접 사용하며 익힌 기술입니다." /><div className="stack-table">{skillGroups.map((group, index) => <article className="stack-row" key={group.title}><div className={`stack-icon stack-${index}`}><Icon name={group.icon} size={22} /></div><div className="stack-label"><h3>{['Web', 'Mobile', 'Game'][index]}</h3><p>{group.description}</p></div><div className="tech-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>

        <section id="about" className="content-section"><SectionHeading file="about.md" title="개발하는 방식" /><div className="about-layout"><div className="about-copy"><h3>{profile.aboutTitle}.</h3>{profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<ExternalLink className="inline-link" href={profile.notion}><Icon name="book" size={16} />개발 과정과 기록 보기<Icon name="arrow" size={15} /></ExternalLink></div><div className="principle-list">{principles.map((principle, index) => <article key={principle.title}><span className="principle-number">0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.text}</p></div></article>)}</div></div></section>

        <section id="education" className="content-section"><SectionHeading file="education.md" title="교육과 성장" /><div className="education-list">{education.map(item => <article key={item.title} className="education-item"><div className="education-date"><Icon name="education" size={20} /><span>{item.period}</span></div><div><h3>{item.title}</h3><span className="education-organization">{item.organization}</span><p>{item.description}</p></div></article>)}</div>{awards.length > 0 && <div className="awards-list">{awards.map(award => <article key={award.title}><Icon name="trophy" size={20} /><div><h3>{award.title}</h3><p>{award.date} · {award.organization}</p><p>{award.description}</p></div></article>)}</div>}</section>

        <section id="contact" className="content-section contact-section"><SectionHeading file="contact.md" title="함께 만들 다음 프로젝트" description="프로젝트에 관한 이야기나 새로운 기회가 있다면 연락해 주세요." /><div className="contact-terminal"><div className="terminal-label"><Icon name="terminal" size={17} />연락처<span>contact</span></div><div className="contact-content"><div><span className="terminal-prompt" aria-hidden="true">$</span><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}</a><button type="button" className="icon-button" onClick={copyContact} aria-label={copied ? '이메일 복사 완료' : '이메일 주소 복사'}><Icon name={copied ? 'check' : 'copy'} size={17} /></button></div><div className="contact-links"><ExternalLink href={profile.github}><Icon name="github" size={16} />GitHub<Icon name="arrow" size={14} /></ExternalLink><ExternalLink href={profile.notion}><Icon name="book" size={16} />Notion<Icon name="arrow" size={14} /></ExternalLink></div></div></div></section>
        <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}<span className="footer-stack">Built with React &amp; Vite</span></span><a href="#hero">맨 위로<Icon name="up" size={14} /></a></footer>
      </main>
      <div className="workspace-status"><span><Icon name="branch" size={13} />main</span><span><span className="status-dot" />Frontend &amp; Mobile</span><span className="status-right">UTF-8<span>한국어</span></span></div>
    </div>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast && <><Icon name={copied ? 'check' : 'mail'} size={17} /><span>{toast}</span><button type="button" className="icon-button" aria-label="알림 닫기" onClick={() => setToast('')}><Icon name="close" size={16} /></button></>}</div>
  </>;
}
