'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';

type SortableListWrapperProps<T> = {
  items: T[];
  onReorder: (newItems: T[], oldIndex?: number, newIndex?: number) => void;
  enabled?: boolean;
  children: ReactNode;
  idAccessor?: (item: T) => string;
};

export default function SortableListWrapper<T extends { _id?: string; id?: string }>({
  items,
  onReorder,
  enabled = true,
  children,
  idAccessor = (item: T) => item._id || item.id || '',
}: SortableListWrapperProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => idAccessor(item) === active.id);
      const newIndex = items.findIndex((item) => idAccessor(item) === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems, oldIndex, newIndex);
    }
  };

  if (!enabled) {
    return children;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items.map(idAccessor)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
