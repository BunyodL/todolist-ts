import type { Meta, StoryObj } from '@storybook/react';
import { AppWithRedux } from './AppWithRedux';
import { withProviderDecorator } from './components/utils/withProviderDecorator';

const meta = {
  title: 'App With Redux',
  component: AppWithRedux,
  decorators: withProviderDecorator,
  tags: ['autodocs'],
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
