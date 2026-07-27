import type { Approval, RouteNode, TaskCard } from '../types';
import { TaskCardShell } from './TaskCardShell';

export function Preview({ card, blocks, buttons, approvals, route }: any & { card: TaskCard }) {
  return <div className="preview"><h2>{card.name}</h2><TaskCardShell blocks={blocks} buttons={buttons} /><h3>Маршрут</h3><ol>{route.map((node: RouteNode) => <li key={node.id}>{node.title} — {node.role || node.type}</li>)}</ol><h3>Согласование</h3><table><tbody>{approvals.map((row: Approval) => <tr key={row.id}><td>{row.n}</td><td>{row.stage}</td><td>{row.executor}</td><td>{row.required ? 'обязательно' : ''}</td></tr>)}</tbody></table></div>;
}
