// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.tsx";

describe('Appをrenderしたとき', () => {
  test("Vite + Reactが表示", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  })
})