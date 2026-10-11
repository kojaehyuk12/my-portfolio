import { Fragment } from 'react';

function Connector({ label, bidirectional = false }) {
  return <div className="architecture-connector" aria-hidden="true">
    <span>{label}</span>
    <svg viewBox="0 0 64 20" fill="none">
      <path d="M2 10H61M54 4L61 10L54 16" />
      {bidirectional && <path d="M9 4L2 10L9 16" />}
    </svg>
  </div>;
}

export default function ProjectArchitecture({ architecture, projectId }) {
  const captionId = `${projectId}-architecture-title`;
  return <figure className="architecture" aria-labelledby={captionId}>
    <figcaption id={captionId}><strong>{architecture.title}</strong><p>{architecture.description}</p></figcaption>
    <div className="architecture-legend" aria-label="구조도 범례"><span><i className="owned-marker" />담당 영역의 구현</span><span><i className="external-marker" />외부 서비스 · 연동 대상</span></div>
    <div className="architecture-flows">
      {architecture.flows.map(flow => <div className="architecture-lane" key={flow.label}>
        <h4>{flow.label}</h4>
        <div className="architecture-track">
          {flow.nodes.map((node, index) => <Fragment key={node.name}>
            <div className={`architecture-node is-${node.type}`}>
              <span className="architecture-scope">{node.type === 'owned' ? '담당 영역' : '연동 대상'}</span>
              <strong>{node.name}</strong><p>{node.detail}</p>
            </div>
            {index < flow.nodes.length - 1 && <><span className="sr-only">{node.next} → </span><Connector label={node.next} bidirectional={node.bidirectional} /></>}
          </Fragment>)}
        </div>
      </div>)}
    </div>
    <p className="architecture-note">{architecture.note}</p>
  </figure>;
}
