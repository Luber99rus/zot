import type { Approval, Block, Field, FieldType, Link, RouteNode, TaskCard, TransitionButton, Width } from '../types';

export const uid = () => Math.random().toString(36).slice(2, 9);
export const fieldTypes: FieldType[] = ['Текст', 'Число', 'Дата', 'Выпадающий список', 'Множественный список', 'Пользователь', 'Организация', 'Файл', 'Ссылка', 'Checkbox', 'Таблица'];
export const nodeTypes = ['Старт', 'Действие', 'Проверка', 'Условие', 'Согласование', 'Возврат', 'Завершение'];
export const emptyCardName = 'Новая карточка задачи';

export const createField = (type: FieldType): Field => ({ id: uid(), title: `Новое поле ${type}`, code: `dp_${uid()}`, type, description: '', required: false, readonly: false, defaultValue: '', width: '50%', hidden: false, position: 'В блоке', display: 'Обычное' });

export const createDefaultBlocks = (): Block[] => ([
  { id: uid(), title: 'Реквизиты задачи', color: '#dfeaf7', columns: 2, fields: [{ ...createField('Текст'), id: uid(), title: 'Тема', code: 'task_subject', required: true, width: '100%' as Width }, { ...createField('Пользователь'), id: uid(), title: 'Инициатор', code: 'initiator' }] },
  { id: uid(), title: 'Дополнительные сведения', color: '#eef1f5', columns: 3, fields: [{ ...createField('Дата'), id: uid(), title: 'Плановая дата', code: 'plan_date', width: '33%' as Width }, { ...createField('Организация'), id: uid(), title: 'Организация', code: 'company', width: '33%' as Width }] }
]);

export const createDefaultButtons = (): TransitionButton[] => ([
  { id: uid(), title: 'Сохранить черновик', code: 'save_draft', target: 'Черновик', condition: '', color: '#ffffff' },
  { id: uid(), title: 'Отправить дальше', code: 'send_next', target: 'Следующий этап', condition: 'Заполнены обязательные поля', color: '#eef4fb' }
]);

export const createDefaultRoute = (): RouteNode[] => ([
  { id: 'start', type: 'Старт', title: 'Создание задачи', x: 54, y: 106, executor: '', role: 'Инициатор', term: '', sla: '', comment: '', condition: '' },
  { id: 'fill', type: 'Действие', title: 'Заполнение карточки', x: 282, y: 106, executor: 'Ответственный', role: 'Исполнитель', term: '2 дн.', sla: '8 ч.', comment: '', condition: '' },
  { id: 'finish', type: 'Завершение', title: 'Завершено', x: 520, y: 106, executor: '', role: '', term: '', sla: '', comment: '', condition: '' }
]);

export const createDefaultLinks = (): Link[] => ([
  { id: uid(), from: 'start', to: 'fill', title: 'Открыть', condition: '' },
  { id: uid(), from: 'fill', to: 'finish', title: 'Завершить', condition: 'Нет замечаний' }
]);

export const createDefaultApprovals = (): Approval[] => ([
  { id: uid(), n: 1, stage: 'Первичная проверка', role: 'Ответственный', executor: '', condition: 'При необходимости', term: '1 дн.', delegation: 'Нет', required: false, comment: '' }
]);

export const registryCards: TaskCard[] = [
  { id: 'existing-task-1', name: 'Заявка на обслуживание', code: 'service_request', description: 'Пример существующей карточки для доработки структуры', status: 'На изменении', updated: '27.07.2026' },
  { id: 'existing-task-2', name: 'Внутреннее поручение', code: 'internal_assignment', description: 'Опубликованная карточка, которую можно открыть как основу', status: 'Опубликована', updated: '18.07.2026' }
];
