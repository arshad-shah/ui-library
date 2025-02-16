import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { PasswordRequirements } from './PasswordRequirements';
import React from 'react';

/**
 * The PasswordRequirements component provides real-time feedback on password strength
 * and validity based on customizable requirements. It features smooth animations and
 * visual feedback for each requirement.
 */
const meta: Meta<typeof PasswordRequirements> = {
  title: 'Components/PasswordRequirements',
  component: PasswordRequirements,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dynamic password requirements checker with animated feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
      description: 'The current password string to validate',
    },
    isVisible: {
      control: 'boolean',
      description: 'Controls the visibility of the requirements panel',
    },
    requirements: {
      control: 'object',
      description:
        'Array of password requirements with labels and validator functions',
    },
  },
} satisfies Meta<typeof PasswordRequirements>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default requirements for stories
const DEFAULT_REQUIREMENTS = [
  {
    label: 'At least 8 characters long',
    validator: (password: string) => password.length >= 8,
  },
  {
    label: 'Contains at least one uppercase letter',
    validator: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains at least one lowercase letter',
    validator: (password: string) => /[a-z]/.test(password),
  },
  {
    label: 'Contains at least one number',
    validator: (password: string) => /\d/.test(password),
  },
  {
    label: 'Contains at least one special character',
    validator: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

/**
 * Default state with no requirements met
 */
export const Empty: Story = {
  args: {
    password: '',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all requirements are shown and marked as not met
    for (const req of DEFAULT_REQUIREMENTS) {
      const reqElement = canvas.getByText(req.label);
      await expect(reqElement).toBeInTheDocument();
      // Check that the requirement is not marked as met
      const reqContainer = reqElement.closest('div');
      await expect(reqContainer).not.toHaveClass('text-green-600');
    }
  },
};

/**
 * Shows the component with some requirements met
 */
export const PartiallyValid: Story = {
  args: {
    password: 'Password123',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify specific requirements are met
    const upperCaseReq = canvas.getByText(/uppercase letter/);
    const lowerCaseReq = canvas.getByText(/lowercase letter/);
    const numberReq = canvas.getByText(/number/);
    const lengthReq = canvas.getByText(/8 characters/);

    // Check that these requirements are marked as met
    await expect(upperCaseReq.closest('span')).toHaveClass('text-green-800');
    await expect(lowerCaseReq.closest('span')).toHaveClass('text-green-800');
    await expect(numberReq.closest('span')).toHaveClass('text-green-800');
    await expect(lengthReq.closest('span')).toHaveClass('text-green-800');

    // Verify special character requirement is not met
    const specialCharReq = canvas.getByText(/special character/);
    await expect(specialCharReq.closest('span')).not.toHaveClass(
      'text-green-800'
    );
  },
};

/**
 * Shows the component with all requirements met
 */
export const AllValid: Story = {
  args: {
    password: 'Password123!',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all requirements are met
    for (const req of DEFAULT_REQUIREMENTS) {
      const reqElement = canvas.getByText(req.label);
      await expect(reqElement).toBeInTheDocument();
      // Check that each requirement is marked as met
      const reqContainer = reqElement.closest('span');
      await expect(reqContainer).toHaveClass('text-green-800');
    }
  },
};

/**
 * Interactive demo that changes as you type
 */
export const Interactive: Story = {
  render: function Render() {
    const [password, setPassword] = React.useState('');

    return (
      <div className="w-80">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password..."
          className="w-full px-4 py-2 border rounded-lg mb-2"
          data-testid="password-input"
        />
        <PasswordRequirements
          password={password}
          requirements={DEFAULT_REQUIREMENTS}
          isVisible={true}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('password-input');

    // Test empty state
    await expect(input).toHaveValue('');

    // Test partial requirements
    await userEvent.type(input, 'pass');
    // Verify lowercase requirement is met
    const lowerCaseReq = canvas.getByText(/lowercase letter/);
    await expect(lowerCaseReq.closest('span')).toHaveClass('text-green-800');

    // Test more requirements
    await userEvent.clear(input);
    await userEvent.type(input, 'Password123');

    // Verify multiple requirements are met
    const upperCaseReq = canvas.getByText(/uppercase letter/);
    const numberReq = canvas.getByText(/number/);
    await expect(upperCaseReq.closest('span')).toHaveClass('text-green-800');
    await expect(numberReq.closest('span')).toHaveClass('text-green-800');

    // Test all requirements
    await userEvent.clear(input);
    await userEvent.type(input, 'Password123!');

    // Verify all requirements are met
    for (const req of DEFAULT_REQUIREMENTS) {
      const reqElement = canvas.getByText(req.label);
      await expect(reqElement.closest('span')).toHaveClass('text-green-800');
    }
  },
};

/**
 * Shows how the component handles extremely long passwords
 */
export const LongPassword: Story = {
  args: {
    password: 'ThisIsAnExtremelyLongPasswordThatMightCauseWrappingIssues123!@#',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all requirements are still met with long password
    for (const req of DEFAULT_REQUIREMENTS) {
      const reqElement = canvas.getByText(req.label);
      await expect(reqElement).toBeInTheDocument();
      await expect(reqElement.closest('span')).toHaveClass('text-green-800');
    }

    // Verify the container maintains proper layout
    const container = canvas.getByRole('list');
    const style = window.getComputedStyle(container);
    await expect(style.overflow).toBe('visible');
  },
};
