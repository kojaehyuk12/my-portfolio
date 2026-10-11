import { useEffect, useRef, useState } from 'react';
import { profile, projects, projectCategories, skillGroups, principles, awards, education } from './data/portfolio';
import Icon from './components/Icon';
import ProjectVisual from './components/ProjectVisual';
import ProjectDialog from './components/ProjectDialog';

const navigation = [
  ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
  ['awards', 'Awards'], ['education', 'Education'], ['contact', 'Contact'],
];

function SectionHeading({ number, label, title, description, children }) {
  return <div className="section-heading"><div><div className="eyebrow"><span className="section-number">{number}</span>{label}</div><h2>{title}<span className="accent">.</span></h2>{description && <p>{description}</p>}</div>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('전체');
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const menuButtonRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  const visibleProjects = projects.filter(project => projectFilter === '전체' || project.category === projectFilter);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

  async function copyContact() {
    const value = profile.email || profile.github;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setToast(profile.email ? '이메일 주소를 복사했습니다.' : 'GitHub 주소를 복사했습니다.');
    } catch {
      setToast(`직접 복사해 주세요: ${value}`);
    }
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => { setToast(''); setCopied(false); }, 5000);
  }

  return <>
    <a className="skip-link" href="#main">본문으로 이동</a>
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#hero" aria-label="고재혁 포트폴리오 처음으로"><span className="brand-symbol" aria-hidden="true">j<span>h</span></span><span>{profile.name}<span className="accent">.</span><small>DEVELOPER PORTFOLIO</small></span></a>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="주요 메뉴">{navigation.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)} className={activeSection === id ? 'is-active' : ''} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}</nav>
        <a className="header-github icon-button" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필 새 창에서 열기"><Icon name="github" size={21} /></a>
        <button ref={menuButtonRef} type="button" className="menu-toggle icon-button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
      </div>
    </header>

    <main id="main">
      <section id="hero" className="hero container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-line" />FRONTEND & MOBILE DEVELOPER</div>
            <h1>{profile.headline[0]}<br /><span>{profile.headline[1]}</span></h1>
            <p className="hero-intro">안녕하세요, 개발자 <strong>{profile.name}</strong>입니다.</p>
            <p className="hero-description">웹과 모바일에서 사용자의 다음 행동을 고민합니다.<br />흐름을 설계하고, 동작하는 서비스로 구현합니다.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">프로젝트 둘러보기<Icon name="down" size={17} /></a><a className="button button-secondary" href={profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={19} />GitHub<span className="sr-only">새 창에서 열기</span></a></div>
            <div className="hero-footnote"><span>THINK DEEPLY.</span><span>BUILD THOUGHTFULLY.</span></div>
          </div>

          <div className="hero-visual">
            <div className="code-window" aria-label="고재혁 개발자 소개 카드">
              <div className="code-window-bar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>developer.js</span><Icon name="code" size={17} /></div>
              <div className="code-content" aria-hidden="true">
                <div><span className="line-number">01</span><span className="code-comment">// A little introduction</span></div>
                <div><span className="line-number">02</span><span><b className="code-violet">const</b> <b className="code-blue">developer</b> = {'{'}</span></div>
                <div><span className="line-number">03</span><span>&nbsp; name: <b className="code-lime">'{profile.name}'</b>,</span></div>
                <div><span className="line-number">04</span><span>&nbsp; focus: <b className="code-lime">'User experience'</b>,</span></div>
                <div><span className="line-number">05</span><span>&nbsp; buildWith: [</span></div>
                <div><span className="line-number">06</span><span>&nbsp;&nbsp;&nbsp; <b className="code-lime">'React & Vue'</b>,</span></div>
                <div><span className="line-number">07</span><span>&nbsp;&nbsp;&nbsp; <b className="code-lime">'Kotlin & Compose'</b>,</span></div>
                <div><span className="line-number">08</span><span>&nbsp;&nbsp;&nbsp; <b className="code-lime">'Unity & C#'</b></span></div>
                <div><span className="line-number">09</span><span>&nbsp; ],</span></div>
                <div><span className="line-number">10</span><span>&nbsp; next: <b className="code-lime">'A new challenge'</b></span></div>
                <div><span className="line-number">11</span><span>{'}'};</span></div>
                <div className="last-code-line"><span className="line-number">12</span><span><b className="code-blue">developer</b>.<b className="code-yellow">build</b>();<i className="code-caret" /></span></div>
              </div>
              <div className="code-window-bottom"><span><Icon name="check" size={13} /> Ready to create</span><span>JavaScript · UTF-8</span></div>
            </div>
            <div className="hero-sticker"><span className="sticker-icon"><Icon name="spark" size={22} /></span><div><b>Small details. Big difference.</b><span>작은 디테일이 더 나은 경험을 만듭니다.</span></div></div>
            <span className="visual-corner" aria-hidden="true">{'{ }'}</span>
          </div>
        </div>
        <div className="hero-bottom"><div><span className="mono">01 — 07</span><span>개발자로서의 생각과 기록</span></div><a href="#about" className="scroll-hint">SCROLL TO EXPLORE<Icon name="down" size={15} /></a></div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <SectionHeading number="01" label="ABOUT ME" title={profile.aboutTitle} />
          <div className="about-grid">
            <div className="about-name-card">
              <span className="name-card-label">안녕하세요.</span>
              <div className="name-card-identity">
                <h3>{profile.name}<span className="accent">.</span></h3>
                <p>{profile.roleKorean}</p>
              </div>
              <div className="name-card-bottom"><span>화면 설계부터 기능 구현까지</span><Icon name="code" size={23} /></div>
            </div>
            <div className="about-text">
              <h3>{profile.aboutLead.map(line => <span key={line}>{line}</span>)}</h3>
              {profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <a href={profile.notion} target="_blank" rel="noopener noreferrer" className="inline-link about-notion-link"><Icon name="book" size={18} />개발 과정과 기록 보기<Icon name="arrow" size={17} /><span className="sr-only"> — Notion, 새 창에서 열기</span></a>
            </div>
          </div>
          <div className="principle-grid">{principles.map((principle, index) => <article className="principle" key={principle.title}><div className="principle-top"><Icon name={principle.icon} size={24} /><span className="mono">0{index + 1}</span></div><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
        </div>
      </section>

      <section id="skills" className="section skills-section container">
        <SectionHeading number="02" label="SKILLS" title="아이디어를 구현하는 도구들" description="웹, 모바일, 게임 프로젝트에서 사용한 기술입니다." />
        <div className="skills-grid">{skillGroups.map(group => <article className="skill-card" key={group.title}><div className="skill-icon"><Icon name={group.icon} size={26} /></div><h3>{group.title}</h3><p>{group.description}</p><div className="skill-tags">{group.skills.map(skill => <span key={skill}><i aria-hidden="true">{skill === 'React' ? '⚛' : skill === 'JavaScript' ? 'JS' : skill === 'Java' ? 'J' : skill === 'Git' ? 'G' : skill.slice(0, 1)}</i>{skill}</span>)}</div></article>)}</div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <SectionHeading number="03" label="SELECTED PROJECTS" title="직접 만들고, 고민한 것들" description="프로젝트에 담긴 선택과 문제 해결 과정을 소개합니다."><span className="project-count">PROJECTS <b>{String(projects.length).padStart(2, '0')}</b></span></SectionHeading>
          <div className="project-toolbar"><div className="project-filters" role="group" aria-label="프로젝트 분야 필터">{projectCategories.map(category => <button key={category} type="button" aria-pressed={projectFilter === category} onClick={() => setProjectFilter(category)}>{category}<span>{category === '전체' ? projects.length : projects.filter(project => project.category === category).length}</span></button>)}</div><span className="filter-result" role="status" aria-live="polite">{visibleProjects.length}개의 프로젝트</span></div>
          <div className="projects-grid">{visibleProjects.map(project => <article className={`project-card ${project.featured && projectFilter === '전체' ? 'featured-project' : ''}`} key={project.id}>
            <button className="project-cover-button" type="button" onClick={() => setSelectedProject(project)} aria-label={`${project.title} 프로젝트 상세 보기`}><ProjectVisual project={project} /><span className="cover-open"><Icon name="arrow" size={23} /></span></button>
            <div className="project-card-content"><div className="project-title-row"><div><span className="project-subtitle">{project.subtitle}</span><h3>{project.title}</h3></div><span className="project-number mono">/{project.number}</span></div><p className="project-summary">{project.summary}</p>
              <dl className="project-metadata"><div><dt><Icon name="calendar" size={14} />기간</dt><dd>{project.period || '추가 정리 예정'}</dd></div><div><dt><Icon name="person" size={14} />역할</dt><dd>{project.role || '기여 범위 정리 중'}</dd></div></dl>
              <div className="project-stack">{project.stack.length ? project.stack.map(tech => <span key={tech}>{tech}</span>) : <span className="pending-tag">기술 스택 입력 예정</span>}</div>
              <div className="project-facts"><div><span>주요 기능</span><p>{project.features.length ? project.features[0] : '구현한 핵심 기능을 정리할 공간입니다.'}</p></div><div><span>성과</span><p>{project.outcomes.length ? project.outcomes[0] : '검증 가능한 결과와 배운 점을 추가합니다.'}</p></div></div>
              <div className="project-actions"><a href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} ${project.githubUrl ? 'GitHub 저장소' : 'GitHub 프로필'} 새 창에서 열기`}><Icon name="github" size={17} />{project.githubUrl ? 'GitHub' : 'GitHub 프로필'}</a><button type="button" onClick={() => setSelectedProject(project)}>상세보기<Icon name="arrow" size={17} /></button></div>
            </div>
          </article>)}</div>
        </div>
      </section>

      <div className="experience-area container">
        <section id="awards" className="experience-section">
          <SectionHeading number="04" label="AWARDS" title="도전의 기록"><Icon name="trophy" size={26} /></SectionHeading>
          {awards.length ? <div className="timeline">{awards.map((award, index) => <article key={`${award.title}-${index}`} className="timeline-item"><span className="timeline-mark"><Icon name="trophy" size={17} /></span><span className="timeline-date mono">{award.date}</span><h3>{award.title}</h3><span className="timeline-organization">{award.organization}</span><p>{award.description}</p></article>)}</div> : <div className="empty-record"><span className="empty-record-icon"><Icon name="trophy" size={29} /></span><h3>수상 내역 업데이트 예정</h3><p>수상명, 주최 기관, 수상 연도와<br />프로젝트의 성과를 담을 공간입니다.</p><span className="empty-record-label mono">A PLACE FOR MILESTONES</span></div>}
        </section>
        <section id="education" className="experience-section">
          <SectionHeading number="05" label="EDUCATION" title="성장을 쌓는 시간"><Icon name="education" size={29} /></SectionHeading>
          {education.length ? <div className="timeline">{education.map((item, index) => <article key={`${item.title}-${index}`} className="timeline-item"><span className="timeline-mark"><Icon name="education" size={18} /></span><span className="timeline-date mono">{item.period}</span><h3>{item.title}</h3><span className="timeline-organization">{item.organization}</span><p>{item.description}</p></article>)}</div> : <div className="empty-record"><span className="empty-record-icon"><Icon name="education" size={31} /></span><h3>교육·학력 정보 업데이트 예정</h3><p>학교, 교육 과정, 학습 기간과<br />성장의 과정을 정리할 공간입니다.</p><span className="empty-record-label mono">ALWAYS A WORK IN PROGRESS</span></div>}
        </section>
      </div>

      <section id="contact" className="contact-section container">
        <div className="contact-panel"><div className="contact-grid"><div className="contact-copy"><div className="eyebrow"><span className="section-number">06</span>CONTACT</div><h2>다음 이야기를<br /><span>함께 만들어요.</span></h2><p>프로젝트에 관한 이야기부터 새로운 기회까지.<br />저의 작업과 가능성이 궁금하다면 연결해 주세요.</p><div className="contact-buttons">{profile.email ? <a href={`mailto:${profile.email}`} className="button button-primary"><Icon name="mail" size={18} />이메일 보내기<Icon name="arrow" size={17} /></a> : <a href={profile.github} target="_blank" rel="noopener noreferrer" className="button button-primary"><Icon name="github" size={18} />GitHub에서 만나기<Icon name="arrow" size={17} /><span className="sr-only">새 창에서 열기</span></a>}<button type="button" onClick={copyContact} className="button button-secondary"><Icon name={copied ? 'check' : 'copy'} size={17} />{copied ? '복사 완료' : profile.email ? '이메일 복사' : '프로필 주소 복사'}</button></div></div><div className="contact-side"><div className="contact-spark" aria-hidden="true">✳</div><span className="mono">GOOD PEOPLE.<br />GREAT POSSIBILITIES.</span><div className="contact-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a><a href={profile.notion} target="_blank" rel="noopener noreferrer">Notion<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>{profile.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Resume<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>}</div></div></div><div className="contact-bottom"><span className="mono">LET’S BUILD SOMETHING MEANINGFUL.</span><span>{profile.email || 'github.com/kojaehyuk12'}</span></div></div>
      </section>
    </main>

    <footer className="site-footer container"><a href="#hero" className="footer-brand">{profile.name}<span className="accent">.</span></a><p>© {new Date().getFullYear()} {profile.name}. Built with React & Vite.</p><a href="#hero" className="back-to-top">Back to top<Icon name="up" size={15} /></a></footer>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast && <><Icon name={copied ? 'check' : 'link'} size={18} /><span>{toast}</span><button type="button" aria-label="알림 닫기" onClick={() => setToast('')}><Icon name="close" size={17} /></button></>}</div>
  </>;
}

export default App;
