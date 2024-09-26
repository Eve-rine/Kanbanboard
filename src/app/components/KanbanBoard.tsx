import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { Box, Button} from '@mui/material';
import { Column as ColumnType, Task } from '../interfaces';
import Column from './Column';

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);


  const addColumn = () => {
    const newColumn: ColumnType = {
      id: `column-${Date.now()}`,
      title: 'New Column',
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const handleAddTask = (columnId: string, taskContent: string) => {
    setColumns(prevColumns => prevColumns.map(column => {
      if (column.id === columnId) {
        const newTask: Task = { id: `task-${Date.now()}`, content: taskContent };
        return { ...column, tasks: [...column.tasks, newTask] };
      }
      return column;
    }));
  };

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    setColumns(prevColumns => prevColumns.map(column => 
      column.id === columnId ? { ...column, title: newTitle } : column
    ));
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
  };

  const handleClearColumn = (columnId: string) => {
    setColumns(prevColumns => prevColumns.map(column => 
      column.id === columnId ? { ...column, tasks: [] } : column
    ));
  };

const handleMoveTask = (fromColumnId: string, toColumnId: string, taskId: string) => {
    setColumns(prevColumns => {
      const newColumns = prevColumns.map(column => ({ ...column, tasks: [...column.tasks] }));
      
      const sourceColumn = newColumns.find(col => col.id === fromColumnId);
      const destColumn = newColumns.find(col => col.id === toColumnId);

      if (!sourceColumn || !destColumn) return prevColumns;

      const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);
      if (!taskToMove) return prevColumns;

      sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== taskId);
      const newIndex = destColumn.tasks.findIndex(task => task.id === taskId);
      destColumn.tasks.splice(newIndex, 0, taskToMove);

      return newColumns;
    });
  };


  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    handleMoveTask(source.droppableId, destination.droppableId, draggableId);
  };

  const handleMenuToggle = (columnId: string) => {
    setActiveColumn((prev) => (prev === columnId ? null : columnId)); // Toggle or close menu
  };

  return (

  <Box sx={{ overflowX: 'auto', width: '100%' }}>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box display="flex" alignItems="flext-start" gap={2}>
        {columns.map((column) => (
          <Box key={column.id} flexShrink={0}>
            <Droppable droppableId={column.id}>
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column
                    column={column}
                    addTask={handleAddTask}
                    moveTask={handleMoveTask}
                    renameColumn={handleRenameColumn}
                    deleteColumn={handleDeleteColumn}
                    clearColumn={handleClearColumn}
                    isActive={activeColumn === column.id}
                    toggleMenu={() => handleMenuToggle(column.id)}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
        ))}
        <Box flexShrink={0}>
          <Button
            onClick={addColumn}
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main', 
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main', 
                color: 'white',
              },
              textTransform: 'none',
              fontWeight:"bold"
            }}
          >
            Add Column
          </Button>
        </Box>
      </Box>
    </DragDropContext>
  </Box>
  );
};

export default KanbanBoard;

