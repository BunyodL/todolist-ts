import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { FilterButtons } from './FilterButtons';
import { TasksFilterValue } from '../../@types/todolist';

const meta = {
  title: 'Todolist Filter Buttons',
  component: FilterButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    allFilter: fn(),
    activeFilter: fn(),
    completedFilter: fn(),
    filter: 'all',
  },
} satisfies Meta<typeof FilterButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({
    canvasElement,
    args: { allFilter, activeFilter, completedFilter },
  }) => {
    const canvas = within(canvasElement);

    const allButton = canvas.getByRole('button', { name: /all/i });
    await expect(allButton).toBeInTheDocument();
    await userEvent.click(allButton);
    await expect(allFilter).toBeCalled();

		const activeButton = canvas.getByRole('button', { name: /active/i });
    await expect(activeButton).toBeInTheDocument();
    await userEvent.click(activeButton);
    await expect(activeFilter).toBeCalled();

		const completedButton = canvas.getByRole('button', { name: /completed/i });
    await expect(completedButton).toBeInTheDocument();
    await userEvent.click(completedButton);
    await expect(completedFilter).toBeCalled();

    await userEvent.unhover(completedButton);
  },
};
