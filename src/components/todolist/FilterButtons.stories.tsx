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

    type Filter = {
      filter: TasksFilterValue;
      callback: () => void;
    };

    const filters: Array<Filter> = [
      { filter: 'all', callback: allFilter },
      { filter: 'active', callback: activeFilter },
      { filter: 'completed', callback: completedFilter },
    ];

    for (let i = 0; i < filters.length; i++) {
      const filterButton = canvas.getByRole('button', {
        name: RegExp(`${filters[i].filter}`, 'i'),
      });

      await expect(filterButton).toBeInTheDocument();
      await userEvent.click(filterButton);
      await expect(filters[i].callback).toBeCalled();

      await userEvent.unhover(filterButton);
    }
  },
};
