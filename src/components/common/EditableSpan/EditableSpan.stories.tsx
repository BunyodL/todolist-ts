import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableSpan } from './EditableSpan';

const meta = {
  title: 'Editable Span',
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
	play: ({canvasElement}) => {
		const canvas = 


	}
};
