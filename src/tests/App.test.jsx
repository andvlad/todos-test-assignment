import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('working', () => {
    render(<App />);

    const noteInput = screen.getByTestId('note-input');

    expect(noteInput).toBeInTheDocument();
    expect(screen.queryByTestId('notes')).not.toBeInTheDocument();

    fireEvent.change(noteInput, { target: { value: 'test note 1' } });
    expect(noteInput.value).toBe('test note 1');

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(noteInput.value).toBe('');

    const notes = screen.getByTestId('notes');
    const activeNotes = screen.getByTestId('active-notes');
    const completedNotes = screen.getByTestId('completed-notes');
    const firstTestNote = screen.getByText('test note 1');
    const firstCheckbox = screen.getByTestId('checkbox-0');
    const itemsCount = screen.getByTestId('items-count');
    const clearCompletedButton = screen.getByTestId('clear-completed');

    expect(notes).toBeInTheDocument();
    expect(activeNotes).toBeInTheDocument();
    expect(completedNotes).toBeInTheDocument();
    expect(firstTestNote).toBeInTheDocument();
    expect(firstCheckbox.checked).toBeFalsy();
    expect(itemsCount).toBeInTheDocument();
    expect(itemsCount.textContent).toBe('1 item left');
    expect(clearCompletedButton).toBeInTheDocument();
    expect(clearCompletedButton.disabled).toBeTruthy();

    fireEvent.change(noteInput, { target: { value: 'test note 2' } });
    fireEvent.submit(screen.getByTestId('form'));
    expect(noteInput.value).toBe('');

    const secondTestNote = screen.getByText('test note 2');
    expect(secondTestNote).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-1').checked).toBeFalsy();
    expect(itemsCount.textContent).toBe('2 items left');

    fireEvent.click(firstTestNote);
    expect(firstCheckbox.checked).toBeTruthy();
    expect(itemsCount.textContent).toBe('1 item left');

    fireEvent.click(activeNotes);
    expect(screen.queryByText('test note 1')).not.toBeInTheDocument();
    expect(screen.getByText('test note 2')).toBeInTheDocument();

    fireEvent.click(completedNotes);
    expect(screen.getByText('test note 1')).toBeInTheDocument();
    expect(screen.queryByText('test note 2')).not.toBeInTheDocument();

    expect(clearCompletedButton.disabled).toBeFalsy();
    fireEvent.click(clearCompletedButton);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});