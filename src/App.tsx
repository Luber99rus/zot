import type React from 'react';
import { useMemo, useState } from 'react';
import { ApprovalEditor } from './components/ApprovalEditor';
import { CardBuilder } from './components/CardBuilder';
import { CardRegistry } from './components/CardRegistry';
import { Preview } from './components/Preview';
import { Properties } from './components/Properties';
import { RouteDesigner } from './components/RouteDesigner';
import { createDefaultApprovals, createDefaultBlocks, createDefaultButtons, createDefaultLinks, createDefaultRoute, createField, emptyCardName, fieldTypes, registryCards, uid } from './state/catalog';
import type { Approval, Block, Field, FieldType, Link, RouteNode, Section, Selection, TaskCard, TransitionButton } from './types';

export function App() {
  const [cards, setCards] = useState<TaskCard[]>(registryCards);
  const [activeCardId, setActiveCardId] = useState<string>();
  const [section, setSection] = useState<Section>('card');
  const [blocks, setBlocks] = useState<Block[]>(createDefaultBlocks());
  const [buttons, setButtons] = useState<TransitionButton[]>(createDefaultButtons());
  const [route, setRoute] = useState<RouteNode[]>(createDefaultRoute());
  const [links, setLinks] = useState<Link[]>(createDefaultLinks());
  const [approvals, setApprovals] = useState<Approval[]>(createDefaultApprovals());
  const [sel, setSel] = useState<Selection>();
  const [query, setQuery] = useState('');
  const activeCard = cards.find(card => card.id === activeCardId);
  const allFields = blocks.flatMap(block => block.fields.map(field => `${field.title} (${field.code})`));
  const selected = useMemo(() => !sel ? undefined : sel.kind === 'card' ? cards.find(card => card.id === sel.id) : sel.kind === 'block' ? blocks.find(block => block.id === sel.id) : sel.kind === 'field' ? blocks.find(block => block.id === sel.blockId)?.fields.find(field => field.id === sel.id) : sel.kind === 'button' ? buttons.find(button => button.id === sel.id) : sel.kind === 'route' ? route.find(node => node.id === sel.id) : sel.kind === 'link' ? links.find(link => link.id === sel.id) : approvals.find(row => row.id === sel.id), [sel, cards, blocks, buttons, route, links, approvals]);

  const resetConstructor = () => { setBlocks(createDefaultBlocks()); setButtons(createDefaultButtons()); setRoute(createDefaultRoute()); setLinks(createDefaultLinks()); setApprovals(createDefaultApprovals()); };
  const openCard = (id: string) => { resetConstructor(); setActiveCardId(id); setSel({ kind: 'card', id }); setSection('card'); };
  const createCard = () => { const card: TaskCard = { id: uid(), name: emptyCardName, code: `task_${uid()}`, description: 'Новая карточка без кода, готова к настройке', status: 'Черновик', updated: '27.07.2026' }; setCards([card, ...cards]); resetConstructor(); setActiveCardId(card.id); setSel({ kind: 'card', id: card.id }); setSection('card'); };
  const backToRegistry = () => { setActiveCardId(undefined); setSel(undefined); setQuery(''); };
  const patchCard = (id: string, patch: Partial<TaskCard>) => setCards(items => items.map(card => card.id === id ? { ...card, ...patch } : card));
  const patchBlock = (id: string, patch: Partial<Block>) => setBlocks(items => items.map(block => block.id === id ? { ...block, ...patch } : block));
  const patchField = (blockId: string, id: string, patch: Partial<Field>) => setBlocks(items => items.map(block => block.id === blockId ? { ...block, fields: block.fields.map(field => field.id === id ? { ...field, ...patch } : field) } : block));
  const patchButton = (id: string, patch: Partial<TransitionButton>) => setButtons(items => items.map(button => button.id === id ? { ...button, ...patch } : button));
  const patchRoute = (id: string, patch: Partial<RouteNode>) => setRoute(items => items.map(node => node.id === id ? { ...node, ...patch } : node));
  const patchLink = (id: string, patch: Partial<Link>) => setLinks(items => items.map(link => link.id === id ? { ...link, ...patch } : link));
  const patchApproval = (id: string, patch: Partial<Approval>) => setApprovals(items => items.map(row => row.id === id ? { ...row, ...patch } : row));
  const addBlock = () => { const block: Block = { id: uid(), title: 'Новый блок', color: '#f7f8fa', columns: 2, fields: [] }; setBlocks([...blocks, block]); setSel({ kind: 'block', id: block.id }); };
  const addButton = () => { const button = { id: uid(), title: 'Новая кнопка', code: `transition_${uid()}`, target: 'Следующий этап', condition: '', color: '#eef4fb' }; setButtons([...buttons, button]); setSel({ kind: 'button', id: button.id }); };
  const onDropField = (blockId: string, event: React.DragEvent) => { event.preventDefault(); const data = event.dataTransfer.getData('text/plain'); if (fieldTypes.includes(data as FieldType)) patchBlock(blockId, { fields: [...blocks.find(block => block.id === blockId)!.fields, createField(data as FieldType)] }); else { const [fromBlockId, fieldId] = data.split(':'); const field = blocks.find(block => block.id === fromBlockId)?.fields.find(item => item.id === fieldId); if (field && fromBlockId !== blockId) setBlocks(items => items.map(block => block.id === fromBlockId ? { ...block, fields: block.fields.filter(item => item.id !== fieldId) } : block.id === blockId ? { ...block, fields: [...block.fields, field] } : block)); } };

  if (!activeCard) return <CardRegistry cards={cards} query={query} setQuery={setQuery} openCard={openCard} createCard={createCard} />;

  return <div className="app"><aside className="nav"><div className="brand">1Форма</div><div className="navCaption">Модуль карточек</div>{[['card', 'Конструктор карточки'], ['route', 'Маршрут'], ['approval', 'Согласование'], ['preview', 'Предпросмотр']].map(([key, title]) => <button key={key} className={section === key ? 'active' : ''} onClick={() => setSection(key as Section)}>{title}</button>)}<button onClick={backToRegistry}>← Выбор карточки</button></aside><main><header className="top"><div><b>{activeCard.name}</b><span>{activeCard.code} · {activeCard.status}</span></div><div className="actions"><button>Сохранить</button><button>Отменить</button><button>Повторить</button><button>Экспорт</button><button>Импорт</button><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Поиск" /></div></header><div className="content"><section className="work">{section === 'card' && <CardBuilder blocks={blocks} setBlocks={setBlocks} buttons={buttons} setButtons={setButtons} setSel={setSel} patchField={patchField} addBlock={addBlock} addButton={addButton} onDropField={onDropField} />}{section === 'route' && <RouteDesigner route={route} setRoute={setRoute} links={links} setLinks={setLinks} setSel={setSel} />}{section === 'approval' && <ApprovalEditor approvals={approvals} setApprovals={setApprovals} setSel={setSel} query={query} />}{section === 'preview' && <Preview card={activeCard} blocks={blocks} buttons={buttons} approvals={approvals} route={route} />}</section><Properties sel={sel} item={selected} allFields={allFields} patchCard={patchCard} patchBlock={patchBlock} patchField={patchField} patchButton={patchButton} patchRoute={patchRoute} patchLink={patchLink} patchApproval={patchApproval} /></div></main></div>;
}
