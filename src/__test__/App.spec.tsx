import { render, screen } from '@testing-library/react'
// @vitest-environment jsdom
import { describe, expect, test } from 'vitest'
import App from '../App.tsx'

describe('Appをrenderしたとき', () => {
  test('Hello worldが表示', () => {
    render(<App />)

    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
