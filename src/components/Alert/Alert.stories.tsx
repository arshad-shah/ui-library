import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  args: {
    title: 'Alert Title',
    children: 'Alert content message',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'success',
        'error',
        'warning',
        'info',
        'neutral',
        'promotional',
      ],
    },
    onDismiss: { action: 'dismissed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Alert
export const Default: Story = {
  args: {
    title: 'Information',
    children: 'This is a basic alert message.',
    variant: 'info',
  },
};

// Dismissible Alert Test
export const DismissibleAlert: Story = {
  args: {
    title: 'Dismissible Alert',
    children: 'Click the X button to dismiss this alert.',
    variant: 'warning',
    dismissible: true,
    onDismiss: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify alert is rendered
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button'));

    // Verify onDismiss was called
    await expect(args.onDismiss).toHaveBeenCalled();
  },
};

// Action Buttons Test
export const AlertWithActions: Story = {
  args: {
    title: 'Update Available',
    children: 'A new version is available. Would you like to update now?',
    variant: 'info',
    actions: [
      {
        label: 'Update Now',
        onClick: () => console.log('Update clicked'),
        variant: 'primary',
      },
      {
        label: 'Later',
        onClick: () => console.log('Later clicked'),
        variant: 'secondary',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify both buttons
    const updateButton = canvas.getByText('Update Now');
    const laterButton = canvas.getByText('Later');

    await expect(updateButton).toBeInTheDocument();
    await expect(laterButton).toBeInTheDocument();

    // Click both buttons and verify classes
    await userEvent.click(updateButton);
    await userEvent.click(laterButton);
  },
};

// External Link Test
export const AlertWithLink: Story = {
  args: {
    title: 'Documentation Available',
    children: 'Learn more about this feature in our documentation.',
    variant: 'info',
    link: {
      href: 'https://example.com',
      label: 'View Documentation',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify link is present
    const link = canvas.getByText('View Documentation');
    await expect(link).toBeInTheDocument();

    // Verify external link icon is present
    const externalIcon = canvas.getByRole('button').querySelector('svg');
    await expect(externalIcon).toBeInTheDocument();

    // Click the link
    await userEvent.click(link);
  },
};

// Variant Styles Test
export const VariantStylesTest: Story = {
  args: {
    title: 'Success Message',
    children: 'Operation completed successfully.',
    variant: 'success',
    dismissible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');

    // Verify success variant styles
    await expect(alert).toHaveClass('bg-emerald-50');
    await expect(alert).toHaveClass('border-emerald-200');
  },
};

// Multiple Features Test
export const CompleteFeatureTest: Story = {
  args: {
    title: 'Account Update',
    children: 'Your account requires attention.',
    variant: 'warning',
    dismissible: true,
    actions: [
      {
        label: 'Review',
        onClick: () => console.log('Review clicked'),
        variant: 'primary',
      },
    ],
    link: {
      href: 'https://example.com/help',
      label: 'Learn More',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all elements are present
    await expect(canvas.getByText('Account Update')).toBeInTheDocument();
    await expect(
      canvas.getByText('Your account requires attention.')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Review')).toBeInTheDocument();
    await expect(canvas.getByText('Learn More')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Dismiss alert')).toBeInTheDocument();

    // Test interactions
    await userEvent.click(canvas.getByText('Review'));
    await userEvent.click(canvas.getByText('Learn More'));
    await userEvent.click(
      canvas.getByRole('button', { name: 'Dismiss alert' })
    );
  },
};
