import React from 'react'
import {Table, Icon, Popup} from 'semantic-ui-react';

export default function TaskItem({item,deleteTaskById}) {
    return (
        <Table.Row>
        <Table.Cell>{item.id}</Table.Cell>
        <Table.Cell>{item.title}</Table.Cell>
        <Table.Cell>{item.createdAt}</Table.Cell>
        <Table.Cell textAlign='right'>
            <Popup content='Edit task' trigger={<Icon color="blue" name="pencil"  />} />
             <Popup content='Delete task' trigger={<Icon color="red" name="trash" onClick={() => deleteTaskById(item.id)} />} />
        </Table.Cell>
      </Table.Row>
    )
}
