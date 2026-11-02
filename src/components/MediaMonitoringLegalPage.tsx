'use client'

import type { ReactNode } from 'react';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { LegalPageShell } from './LegalPageShell';
import {
  APP_NAME,
  IMPRINT_LABEL,
  PROVIDER,
  RELATED_TITLE,
  UPDATED,
  legalDocs,
  type LegalBlock,
  type LegalDocId,
} from './mediaMonitoringLegalContent';

const h2Style: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '1rem',
  color: '#0b99cc'
};

const pStyle: React.CSSProperties = { marginBottom: '1rem' };

const linkStyle: React.CSSProperties = { color: '#0b99cc', textDecoration: 'none' };

// Open points render as a highlighted placeholder so a draft can't pass for final text.
const placeholderStyle: React.CSSProperties = {
  backgroundColor: '#FFD54F',
  color: '#012332',
  fontWeight: '600',
  padding: '0.1em 0.4em',
  borderRadius: '4px'
};

const cellStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', verticalAlign: 'top' };

const INLINE_TOKENS = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/;

/** Renders the inline markup used in mediaMonitoringLegalContent.ts. */
function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_TOKENS).filter(Boolean).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('[[')) return <mark key={i} style={placeholderStyle}>{part.slice(2, -2)}</mark>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith('http');
      return (
        <a key={i} href={href} style={linkStyle} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {label}
        </a>
      );
    }
    return part;
  });
}

function Block({ block }: { block: LegalBlock }) {
  const { language } = useLanguage();

  switch (block.type) {
    case 'p':
      return <p style={pStyle}>{renderInline(block.text[language])}</p>;
    case 'list':
    case 'steps': {
      const items = block.items.map((item, i) => (
        <li key={i} style={{ marginBottom: '0.5rem' }}>{renderInline(item[language])}</li>
      ));
      const listStyle: React.CSSProperties = { paddingLeft: '1.5rem', marginBottom: '1rem' };
      return block.type === 'steps'
        ? <ol style={{ ...listStyle, listStyle: 'decimal' }}>{items}</ol>
        : <ul style={{ ...listStyle, listStyle: 'disc' }}>{items}</ul>;
    }
    case 'table':
      return (
        <div style={{ overflowX: 'auto', marginTop: '0.5rem', marginBottom: '1rem' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              color: 'var(--gray-white)'
            }}
          >
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                {block.head.map((cell, i) => <th key={i} style={cellStyle}>{cell[language]}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={i < block.rows.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : undefined}>
                  {row.map((cell, j) => <td key={j} style={cellStyle}>{renderInline(cell[language])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'provider':
      return (
        <p style={pStyle}>
          {PROVIDER[language].map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {renderInline(line)}
            </span>
          ))}
        </p>
      );
  }
}

function MediaMonitoringLegalPageContent({ docId }: { docId: LegalDocId }) {
  const { language } = useLanguage();
  const doc = legalDocs[docId];
  const related = (Object.keys(legalDocs) as LegalDocId[]).filter((id) => id !== docId);

  return (
    <LegalPageShell title={doc.title[language]} subtitle={APP_NAME}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={pStyle}>{renderInline(doc.intro[language])}</p>
        <p style={{ fontSize: '14px', color: 'var(--gray-light)' }}>{UPDATED[language]}</p>
      </div>

      {doc.sections.map((section, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h2 style={h2Style}>{section.title[language]}</h2>
          {section.blocks.map((block, j) => <Block key={j} block={block} />)}
        </div>
      ))}

      <nav
        aria-label={RELATED_TITLE[language]}
        style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <h2 style={{ ...h2Style, fontSize: '18px' }}>{RELATED_TITLE[language]}</h2>
        <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
          {related.map((id) => (
            <li key={id}>
              <a href={`/${language}/${legalDocs[id].route}/`} style={linkStyle}>{legalDocs[id].title[language]}</a>
            </li>
          ))}
          <li>
            <a href={`/${language}/imprint/`} style={linkStyle}>{IMPRINT_LABEL[language]}</a>
          </li>
        </ul>
      </nav>
    </LegalPageShell>
  );
}

export default function MediaMonitoringLegalPage({ docId, initialLanguage }: { docId: LegalDocId; initialLanguage?: "en" | "de" }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <MediaMonitoringLegalPageContent docId={docId} />
    </LanguageProvider>
  );
}
