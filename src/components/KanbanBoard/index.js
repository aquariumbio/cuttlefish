import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import Header from './Header';
import TaskList from './TaskList';
import TaskListItem from './TaskListItem';
import TaskDetails from './TaskDetails';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flexGrow: 1,
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap'
  }
}));

function KanbanBoard(props) {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('New List');
  const [openedTask, setOpenedTask] = useState(null);
  const tempLists = [];

  useEffect(() => {
    for (const list of props.data.lists) {
      tempLists.push({ ...list, items: [] });
    }

    for (const task of props.data.tasks) {
      tempLists.forEach(list => {
        if (list.id === task.list) {
          list.items.push(task);
        }
      });
    }
    setLists(tempLists);
  }, [props.data.lists, props.data.tasks, tempLists]);

  const handleDragEnd = event => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const newLists = _.clone(lists);
    const sourceList = newLists.find(list => list.id === source.droppableId);
    const destinationList = newLists.find(
      list => list.id === destination.droppableId
    );
    const [removedItem] = sourceList.items.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.items.splice(destination.index, 0, removedItem);
      setLists(newLists);
    } else {
      removedItem.list = destination.droppableId;
      removedItem.status = destinationList.title;
      removedItem.statusColor = destinationList.titleColor;
      destinationList.items.splice(destination.index, 0, removedItem);
      setLists(newLists);
    }
  };

  const handleListAdd = () => {
    const list = {
      id: uuid(),
      title: listName,
      items: []
    };

    setLists(prevLists => [...prevLists, list]);
  };

  const handleListDelete = () => {
    const filter = lists.filter(list => list.title !== listName)
    setLists(filter)
  }

  const handleTaskOpen = task => {
    setOpenedTask(task);
  };

  const handleTaskClose = () => {
    setOpenedTask(null);
  };

  return (
    <Page className={classes.root} title="Kanban Board">
      <Header onListAdd={handleListAdd} listName={listName} setListName={setListName}/>
      <div className={classes.container}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {lists.map(list => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided, snapshot) => (
                <TaskList
                  provided={provided}
                  snapshot={snapshot}
                  title={list.title}
                  titleColor={list.titleColor}
                  total={list.items.length}
                  onListDelete={handleListDelete}
                >
                  {list.items.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <TaskListItem
                          onOpen={() => handleTaskOpen(task)}
                          provided={provided}
                          snapshot={snapshot}
                          task={task}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <TaskDetails
        onClose={handleTaskClose}
        open={Boolean(openedTask)}
        task={openedTask}
      />
    </Page>
  );
}

export default KanbanBoard;
