import React, { useState, useEffect } from 'react';
import { Draggable, Droppable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Button, TextField, Divider, Box } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { ColumnProps } from '../interfaces';
import TaskCard from './Task';

const Column: React.FC<ColumnProps> = ({
  column,
  addTask,
  renameColumn,
  deleteColumn,
  clearColumn,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && !target.closest('.menu-container')) {
        setShowMenu(false);
        setAnchorEl(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  const handleAddTask = () => {
    if (newTaskContent.trim() === '') return;
    addTask(column.id, newTaskContent);
    setNewTaskContent('');
    setShowAddTaskForm(false);
  };

  const handleRenameColumn = () => {
    if (newTitle.trim() === '') return;
    renameColumn(column.id, newTitle);
    setEditingTitle(false);
  };
  

  return (
    <Card className="menu-container" sx={{ width: 256 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {editingTitle ? (
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleRenameColumn}
              onKeyDown={(e) => e.key === 'Enter' && handleRenameColumn()}
              variant="outlined"
              size="small"
              fullWidth
            />
          ) : (
            <Typography variant="h6" onClick={() => setEditingTitle(true)} sx={{ cursor: 'pointer' }}>
              {column.title}
            </Typography>
          )}

          <IconButton onClick={handleMenuClick}>
            <MoreHorizRoundedIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={showMenu} onClose={handleMenuClose}>
            <MenuItem onClick={() => {
              handleMenuClose();
              setEditingTitle(true);
            }}>Rename</MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              clearColumn(column.id);
            }}>Clear</MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              deleteColumn(column.id);
            }} sx={{ color: 'red' }}>
              Delete
            </MenuItem>
          </Menu>
        </Box>

        <Divider  sx={{ my: 2 }}  />

        {/* Tasks */}
        <Droppable droppableId={column.id}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Divider sx={{ my: 2 }} />

        {/* Add Task Button */}
        {showAddTaskForm ? (
          <Box mt={2}>
            <TextField
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              placeholder="Title"
              fullWidth
              size="small"
              variant="outlined"
              margin="dense"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={() => setShowAddTaskForm(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddTask} variant="contained" color="primary">
                Add
              </Button>
            </Box>
          </Box>
        ) : (
          <Box textAlign="center" mt={0}>
            <Button onClick={() => setShowAddTaskForm(true)}
                   sx={{
                    textTransform: 'none'
                   }}
             color="primary">
              Add Card
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Column;