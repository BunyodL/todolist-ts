import type { Meta, StoryObj } from '@storybook/react';
import { AppWithRedux } from './AppWithRedux';
import { withProviderDecorator } from './components/utils/withProviderDecorator';
import { expect, within } from '@storybook/test';

const meta = {
  title: 'App/App With Redux',
  component: AppWithRedux,
  decorators: withProviderDecorator,
  tags: ['autodocs'],
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvas.getByTestId('header');
    await expect(header).toBeInTheDocument();

    const createTodolist = canvas.getByRole('heading', {
      name: 'Create todolist',
    });
    await expect(createTodolist).toBeInTheDocument();

    const addTodoInput = canvas.getByRole('textbox', {
      name: 'Create todolist',
    });
    await expect(addTodoInput).toBeInTheDocument();

    const addTodoBtn = canvas.getByRole('button', { name: 'Add todolist' });
    await expect(addTodoBtn).toBeInTheDocument();

    const hr = canvas.getByRole('separator');
    await expect(hr).toBeInTheDocument();

    const todolistsHeading = canvas.getByRole('heading', { name: 'Todolists' });
    await expect(todolistsHeading).toBeInTheDocument();

    const todoHeading1 = canvas.getByRole('heading', { name: 'What to buy' });
    await expect(todoHeading1).toBeInTheDocument();

    const todoHeading2 = canvas.getByRole('heading', { name: 'What to learn' });
    await expect(todoHeading2).toBeInTheDocument();
  },
};
