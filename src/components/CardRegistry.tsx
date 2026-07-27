import type { TaskCard } from '../types';

type Props = { cards: TaskCard[]; query: string; setQuery: (value: string) => void; openCard: (id: string) => void; createCard: () => void };
export function CardRegistry({ cards, query, setQuery, openCard, createCard }: Props) {
  const filtered = cards.filter(card => `${card.name} ${card.code} ${card.description}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="registry"><header className="registryTop"><div><div className="brand">1Форма</div><h1>Конструктор карточек задач</h1><p>Сначала выберите карточку задачи для переделки или создайте новую. Редактор не открывает демо-карточку автоматически.</p></div><div className="actions"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Поиск карточки" /><button onClick={createCard}>+ Создать новую</button></div></header><table><thead><tr><th>Название</th><th>Код</th><th>Статус</th><th>Обновлена</th><th>Описание</th><th /></tr></thead><tbody>{filtered.map(card => <tr key={card.id}><td><b>{card.name}</b></td><td>{card.code}</td><td><span className="badge">{card.status}</span></td><td>{card.updated}</td><td>{card.description}</td><td><button onClick={() => openCard(card.id)}>Выбрать</button></td></tr>)}</tbody></table></div>;
}
