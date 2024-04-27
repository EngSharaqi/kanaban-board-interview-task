import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import { StyledColumn, StyledColumnTitle } from './Column.styles';
import { TitleInput } from './TitleInput';

type ColumnProps = {
  id: string | number | null;
  title: string;
  items: any[];
  onColumnChange: Function;
  onNewItem?: Function;
};

export const Column = (props: ColumnProps) => {
  const { id, title, items, onColumnChange, onNewItem } = props;
  const [uniqueId, setUniqueId] = useState(0)
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: any, monitor) => {
      onColumnChange(item.id, id);
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));


  console.log(items)
  return (
    <StyledColumn
      ref={drop}
      layout={{
        '@initial': 'sm',
        '@xs': 'sm',
      }}
    >
      <StyledColumnTitle>
        {title} ({items.length})
      </StyledColumnTitle>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, i) => (
          <>
            {
              <div key={item.id} onClick={() => {
                const activeItemIndex = items.findIndex(item => item.active == true);
                console.log(activeItemIndex)

                if (activeItemIndex != -1) {
                  items[activeItemIndex].active = false
                }

                setUniqueId(item.id)
                item["active"] = true

                console.log(items)
              }} className={`${uniqueId == item.id && 'activeCard'}`}><Card item={item} /></div>
            }
          </>
        ))}
      </div>
      {canDrop && `Drop it ${isOver ? 'here!' : ''}!`}
      <div>
        <TitleInput onSubmit={(title: string) => onNewItem?.(title)} />
      </div>
    </StyledColumn>
  );
};
