import React from 'react';
import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from "./header-main";
import { SignOutButton } from '../auth/sign-out-button';
import { Sheet } from 'lucide-react';
import { SheetClose } from '../components/sheet';

vi.mock('../components/icon', () => ({
    Icon: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="icon">{children}</div>
    ),
  }));

describe('Header', () => {
    test('Company Details', () => {
        render(<Header />)
        render(<SignOutButton />)
        render(<Sheet />)
        render(<SheetClose />)
        expect(screen.getByText('CN')).toBeTruthy()
        expect(screen.getByText('Sign out')).toBeTruthy()
        expect(screen.getByText('Today')).toBeTruthy()
    });

    test('renders the LuAlignJustify icon inside the SheetTrigger', () => {
        render(<Header />);
        const icon = screen.getAllByTestId('icon');
        expect(icon).toBeDefined();
      });
})