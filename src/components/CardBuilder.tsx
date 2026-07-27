import { fieldTypes } from '../state/catalog';
import { TaskCardShell } from './TaskCardShell';

export function CardBuilder(props: any) {
  return <><div className="palette"><button onClick={props.addBlock}>+ Блок</button><button onClick={props.addButton}>+ Кнопка перехода</button>{fieldTypes.map(type => <span key={type} draggable onDragStart={event => event.dataTransfer.setData('text/plain', type)}>{type}</span>)}</div><TaskCardShell blocks={props.blocks} buttons={props.buttons} editable setSel={props.setSel} patchField={props.patchField} setBlocks={props.setBlocks} setButtons={props.setButtons} onDropField={props.onDropField} /></>;
}
