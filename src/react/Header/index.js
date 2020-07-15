import React from 'react';
import { Menu } from 'semantic-ui-react';

export default function index() {
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item name="home" active />
        <Menu.Item name="messages" />
        <Menu.Item name="friends" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>
    </div>
  );
}