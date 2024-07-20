import { AddItemInput } from './AddItemInput';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// export default {
//   title: 'AddItemInput Component',
//   component: AddItemInput,
// };

// export const AddItemInputBaseExample = (props: any) => {
//   return <AddItemInput addItem={(title: string) => alert(title)} />;
// };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'AddItemInput',
  component: AddItemInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { addItem: fn() },
} satisfies Meta<typeof AddItemInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
