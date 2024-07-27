import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { TodoList } from './TodoList';
import { withProviderDecorator } from '../utils/withProviderDecorator';

const meta = {
  title: 'Todolist',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    changeTodoListFilter: fn(),
    changeTodoListTitle: fn(),
    deleteTodolist: fn(),
    filter: 'all',
    id: 'todolistId2',
    title: 'Courses',
  },
  decorators: withProviderDecorator,
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvas.getByText('Courses');
    const deleteTodolistButton = canvas.getByRole('button', {
      name: 'Delete todolist',
    });
    const addItemInput = canvas.getByRole('textbox');
    const addTaskButton = canvas.getByRole('button', { name: 'Add task' });
    const allButton = canvas.getByRole('button', { name: /all/i });
    const activeButton = canvas.getByRole('button', { name: /active/i });
    const completedButton = canvas.getByRole('button', { name: /completed/i });

    const nodes = [
      header,
      deleteTodolistButton,
      addItemInput,
      addTaskButton,
      allButton,
      activeButton,
      completedButton,
    ];

    for (let i = 0; i < nodes.length; i++) {
      await expect(nodes[i]).toBeInTheDocument();
    }

    await userEvent.type(addItemInput, 'React');
    await userEvent.click(addTaskButton);

    const task = canvas.getByTestId('task');
    await expect(task).toBeInTheDocument();

    const deleteTaskButton = canvas.getByRole('button', {
      name: 'Delete task',
    });
    await userEvent.click(deleteTaskButton);
    await expect(task).not.toBeInTheDocument();
  },
};
