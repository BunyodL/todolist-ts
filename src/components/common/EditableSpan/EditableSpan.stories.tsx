import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { EditableSpan } from './EditableSpan';

const meta = {
  title: 'Common/Editable Span',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChangeItemTitle: fn(),
    title: 'Start title',
  },
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement, args: { onChangeItemTitle } }) => {
    const canvas = within(canvasElement);

    const span = canvas.getByText('Start title');
    await expect(span).toBeInTheDocument();

    await userEvent.dblClick(span);

    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();
    await expect(span).not.toBeInTheDocument();

    const confirmButton = canvas.getByRole('button');
    await expect(confirmButton).toBeInTheDocument();

    await userEvent.click(confirmButton);
    await expect(onChangeItemTitle).toBeCalledTimes(1);

    await expect(canvas.getByText('Start title')).toBeInTheDocument();
    await expect(input).not.toBeInTheDocument();
  },
};

export const EditMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const span = canvas.getByText('Start title');
    await userEvent.dblClick(span);

    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();
    await expect(span).not.toBeInTheDocument();

    const confirmButton = canvas.getByRole('button');
    await expect(confirmButton).toBeInTheDocument();
  },
};
