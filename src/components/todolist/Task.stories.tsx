import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';
import { withProviderDecorator } from '../utils/withProviderDecorator';
import { fn } from '@storybook/test';

const meta = {
  title: 'Todolist Tasks',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    removeTask: fn(),
    onTaskStatusChange: fn(),
    onChangeTaskTitle: fn(),
  },
  decorators: withProviderDecorator,
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unfulfilled: Story = {
  args: {
    task: {
      id: '1',
      isDone: false,
      title: 'go to sleep',
    },
  },
};

export const Done: Story = {
  args: {
    task: {
      id: '2',
      isDone: true,
      title: 'buy a book',
    },
  },
};
