import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';
import Icon from './Icon';
import ProjectVisual from './ProjectVisual';

function DetailSection({ number, title, children }) {
  return <section className="modal-detail"><span className="eyebrow">{number} / {title}</span>{children}</section>;
}

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const hasProblemSolution = Boolean(project.challenge && project.solution);

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
      <p className="modal-subtitle">{project.summary}</p>
      <dl className="modal-metadata"><div><dt>기간</dt><dd>{project.period || '추가 정리 예정'}</dd></div><div><dt>역할</dt><dd>{project.role || '기여 범위 정리 중'}</dd></div><div><dt>프로젝트 기술</dt><dd>{project.stack.join(', ')}</dd></div></dl>
      {project.contribution && <div className="contribution-note"><span>기여 범위</span><p>{project.contribution}</p></div>}
      {hasProblemSolution && <DetailSection number="01" title="PROBLEM SOLVING"><h3>{project.technicalTitle || '문제와 해결 방법'}</h3><div className="problem-solution"><div><span>해결해야 했던 문제</span><p>{project.challenge}</p></div><div><span>해결 방향</span><p>{project.solution}</p></div></div>{project.implementation?.length > 0 && <ol className="implementation-list">{project.implementation.map(step => <li key={step.title}><h4>{step.title}</h4><code>{step.code}</code><p>{step.text}</p></li>)}</ol>}</DetailSection>}
      <DetailSection number={hasProblemSolution ? '02' : '01'} title="OUTCOMES"><h3>구현 결과</h3>{project.outcomes.length ? <ul className="detail-list">{project.outcomes.map(item => <li key={item}><Icon name="spark" size={17} />{item}</li>)}</ul> : <p className="content-pending">검증 가능한 구현 결과를 추가할 예정입니다.</p>}</DetailSection>
      <DetailSection number={hasProblemSolution ? '03' : '02'} title="KEY FEATURES"><h3>주요 기능</h3>{project.features.length ? <ul className="detail-list">{project.features.map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul> : <p className="content-pending">실제로 구현한 주요 기능과 사용자 흐름을 추가할 예정입니다.</p>}</DetailSection>
      <ProjectVisual project={project} />
      {project.image && <a className="source-image-link inline-link" href={project.image} target="_blank" rel="noopener noreferrer">{project.imageLabel} 원본 보기<Icon name="arrow" size={15} /><span className="sr-only">새 창에서 열기</span></a>}
      {project.gallery?.map(item => <figure className="project-gallery" key={item.src}><a href={item.src} target="_blank" rel="noopener noreferrer"><img src={item.src} alt={item.alt} loading="lazy" /></a><figcaption>{item.caption} · 클릭하면 원본을 볼 수 있습니다.</figcaption></figure>)}
      <div className="modal-links"><a className="button button-primary" href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />{project.githubUrl ? 'GitHub 저장소' : 'GitHub 프로필'}<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>{project.detailUrl && <a className="button button-secondary" href={project.detailUrl} target="_blank" rel="noopener noreferrer">Notion 기록<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>}<button type="button" className="button button-text" onClick={onClose}>다른 프로젝트 보기</button></div>
      <p className="modal-footnote">{project.sourceNote}</p>
    </div>
  </dialog>;
}
