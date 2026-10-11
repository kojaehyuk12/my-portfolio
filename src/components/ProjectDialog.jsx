import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';
import Icon from './Icon';
import ProjectVisual from './ProjectVisual';

function DetailSection({ number, title, children }) {
  return <section className="modal-detail"><span className="eyebrow">{number} / {title}</span>{children}</section>;
}

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);

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
      <ProjectVisual project={project} />
      <DetailSection number="01" title="KEY FEATURES"><h3>어떤 경험을 만들었나요?</h3>{project.features.length ? <ul className="detail-list">{project.features.map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul> : <p className="content-pending">실제로 구현한 주요 기능과 사용자 흐름을 추가할 예정입니다.</p>}</DetailSection>
      {project.challenge && project.solution && <DetailSection number="02" title="DESIGN & IMPLEMENTATION"><h3>문제를 바라보는 방식</h3><div className="problem-solution"><div><span>THE CHALLENGE</span><p>{project.challenge}</p></div><div><span>THE APPROACH</span><p>{project.solution}</p></div></div></DetailSection>}
      <DetailSection number="03" title="OUTCOMES"><h3>결과와 배운 점</h3>{project.outcomes.length ? <ul className="detail-list">{project.outcomes.map(item => <li key={item}><Icon name="spark" size={17} />{item}</li>)}</ul> : <p className="content-pending">검증 가능한 성과와 프로젝트를 통해 배운 점을 추가할 예정입니다.</p>}</DetailSection>
      {project.image && <a className="source-image-link inline-link" href={project.image} target="_blank" rel="noopener noreferrer">{project.imageLabel} 원본 보기<Icon name="arrow" size={15} /><span className="sr-only">새 창에서 열기</span></a>}
      {project.gallery?.map(item => <figure className="project-gallery" key={item.src}><a href={item.src} target="_blank" rel="noopener noreferrer"><img src={item.src} alt={item.alt} loading="lazy" /></a><figcaption>{item.caption} · 클릭하면 원본을 볼 수 있습니다.</figcaption></figure>)}
      <div className="modal-links"><a className="button button-primary" href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />{project.githubUrl ? 'GitHub 저장소' : 'GitHub 프로필'}<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>{project.detailUrl && <a className="button button-secondary" href={project.detailUrl} target="_blank" rel="noopener noreferrer">Notion 기록<Icon name="arrow" size={16} /><span className="sr-only">새 창에서 열기</span></a>}<button type="button" className="button button-text" onClick={onClose}>다른 프로젝트 보기</button></div>
      <p className="modal-footnote">{project.sourceNote}</p>
    </div>
  </dialog>;
}
