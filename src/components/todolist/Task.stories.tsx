import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';
import { withProviderDecorator } from '../utils/withProviderDecorator';
import { expect, fn, userEvent, within } from '@storybook/test';

const meta = {
  title: 'Todolist/Tasks',
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

  play: async ({ canvasElement, args: { onTaskStatusChange, removeTask } }) => {
    const canvas = within(canvasElement);

    const task = canvas.getByText('go to sleep');
    await expect(task).toBeInTheDocument();

    const checkbox = canvas.getByRole('checkbox') as HTMLInputElement;
    await expect(checkbox.checked).toBe(false);
    await userEvent.click(checkbox);
    await expect(onTaskStatusChange).toBeCalledTimes(1);

    const deleteButton = canvas.getByRole('button', { name: 'Delete task' });
    await expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    await userEvent.unhover(deleteButton);
    await expect(removeTask).toBeCalledTimes(1);
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

  play: async ({ canvasElement, args: { onTaskStatusChange, removeTask } }) => {
    const canvas = within(canvasElement);

    const task = canvas.getByText('buy a book');
    await expect(task).toBeInTheDocument();

    const checkbox = canvas.getByRole('checkbox') as HTMLInputElement;
    await expect(checkbox.checked).toBe(true);
    await userEvent.click(checkbox);
    await expect(onTaskStatusChange).toBeCalledTimes(1);

    const deleteButton = canvas.getByRole('button', { name: 'Delete task' });
    await expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    await userEvent.unhover(deleteButton);
    await expect(removeTask).toBeCalledTimes(1);
  },
};
