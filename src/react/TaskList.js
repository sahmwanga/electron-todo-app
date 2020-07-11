import React from 'react'

import {Table, Icon} from 'semantic-ui-react';
import TaskItem from './TaskItem';

export default function TaskList({todos,deleteTaskById}) {
    return (
        <Table stackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell >Created Date</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {todos && todos.map((item) => (
        <TaskItem item={item} deleteTaskById={deleteTaskById}/>
      ))}
      
    </Table.Body>
  </Table>
    )
}
