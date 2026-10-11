import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';
import Icon from './Icon';
import ProjectVisual from './ProjectVisual';
import ProjectArchitecture from './ProjectArchitecture';
import { caseStudies } from '../data/caseStudies';

function DetailSection({ number, title, children }) {
  return <section className="modal-detail"><span className="eyebrow">{number} / {title}</span>{children}</section>;
}

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const study = caseStudies[project.id];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }

  return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="modal-project-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={closeOnBackdrop}>
    <div className="modal-topbar"><span>projects / {project.id} <span className="muted">/ README.md</span></span><button type="button" onClick={onClose} className="icon-button" aria-label="프로젝트 상세 닫기"><Icon name="close" size={22} /></button></div>
    <div className="modal-content">
      <span className="draft-label">{project.category} · PROJECT {project.number}</span>
      <h2 id="modal-project-title">{project.title}</h2>
      {study && <p className="case-focus">{study.focus}</p>}
      <DetailSection number="01" title="PROJECT OVERVIEW"><h3>프로젝트 개요</h3>
      <p className="modal-subtitle">{project.summary}</p>
      <dl className="modal-metadata"><div><dt>기간</dt><dd>{project.period || '추가 정리 예정'}</dd></div><div><dt>역할</dt><dd>{project.role || '기여 범위 정리 중'}</dd></div><div><dt>프로젝트 기술</dt><dd>{project.stack.join(', ')}</dd></div></dl>
      {project.contribution && <div className="contribution-note"><span>기여 범위</span><p>{project.contribution}</p></div>}
      </DetailSection>
      {study && <>
        <DetailSection number="02" title="ARCHITECTURE"><h3>담당 아키텍처</h3><ProjectArchitecture architecture={study.architecture} projectId={project.id} /></DetailSection>
        <DetailSection number="03" title="ENGINEERING DECISIONS"><h3>핵심 문제 해결 및 기술적 의사결정</h3>
          <div className="case-issues">{study.issues.map((issue, index) => <article className="case-issue" key={issue.title}>
            <header><span className="issue-number">ISSUE {String(index + 1).padStart(2, '0')}</span><h4>{issue.title}</h4></header>
            <dl className="issue-narrative">
              <div><dt>문제 상황</dt><dd>{issue.problem}</dd></div>
              <div><dt>원인 분석 및 판단</dt><dd>{issue.decision}</dd></div>
              <div className="issue-solution"><dt>해결 방법</dt><dd>{issue.solution}<div className="issue-code">{issue.code.map(code => <code key={code}>{code}</code>)}</div></dd></div>
              <div><dt>결과</dt><dd>{issue.result}</dd></div>
            </dl>
          </article>)}</div>
        </DetailSection>
      </>}
      {!study && <DetailSection number="02" title="CONTRIBUTION"><h3>담당 개발 내용</h3><ul className="detail-list">{project.outcomes.map(item => <li key={item}><Icon name="code" size={17} />{item}</li>)}</ul></DetailSection>}
      <DetailSection number={study ? '04' : '03'} title="FEATURES & REFERENCES"><h3>주요 기능과 화면 자료</h3><ul className="detail-list">{project.features.map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul>
      <ProjectVisual project={project} />
      {project.image && <a className="source-image-link inline-link" href={project.image} target="_blank" rel="noopener noreferrer">{project.imageLabel} 원본 보기<Icon name="arrow" size={15} /><span className="sr-only">새 창에서 열기</span></a>}
      {project.gallery?.map(item => <figure className="project-gallery" key={item.src}><a href={item.src} target="_blank" rel="noopener noreferrer"><img src={item.src} alt={item.alt} loading="lazy" /></a><figcaption>{item.caption} · 클릭하면 원본을 볼 수 있습니다.</figcaption></figure>)}
      </DetailSection>
      <div className="modal-links"><a className="button button-primary" href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />{project.githubUrl ? 'GitHub 저장소' : 'GitHub 프로필'}<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>{project.detailUrl && <a className="button button-secondary" href={project.detailUrl} target="_blank" rel="noopener noreferrer">Notion 기록<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>}<button type="button" className="button button-text" onClick={onClose}>다른 프로젝트 보기</button></div>
      <p className="modal-footnote">{project.sourceNote}</p>
    </div>
  </dialog>;
}
