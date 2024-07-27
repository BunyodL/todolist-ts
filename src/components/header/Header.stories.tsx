import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { expect, within } from '@storybook/test';

const meta = {
  title: 'Header/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvas.getByTestId('header');
    await expect(header).toBeInTheDocument();

    const heading = canvas.getByText('Todo Lists');
    await expect(heading).toBeInTheDocument();

    const menuButton = canvas.getByTestId('menu');
    await expect(menuButton).toBeInTheDocument();

    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeInTheDocument();
  },
};
