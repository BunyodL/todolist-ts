import { AddItemInput } from './AddItemInput';
import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Common/AddItem Input',
  component: AddItemInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { addItem: fn() },
} satisfies Meta<typeof AddItemInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement, args: { addItem } }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const addButton = canvas.getByRole('button');

    await expect(input).toBeInTheDocument();

    await userEvent.type(input, 'some text');
    await userEvent.click(addButton);

    await expect(addItem).toBeCalledTimes(1);

    await userEvent.unhover(addButton);
  },
};

export const WithError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByRole('button');

    await userEvent.click(addButton);

    const errorMessage = canvas.getByText('Title is required');
    await expect(errorMessage).toBeInTheDocument();

    await userEvent.unhover(addButton);
  },
};
