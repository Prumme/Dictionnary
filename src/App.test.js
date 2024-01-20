/* eslint-disable testing-library/no-node-access */
import { render, screen, act } from "@testing-library/react";
import App from "./App";

test("render input search", () => {
  render(<App />);
  const linkElement = screen.getByTestId("inputSearch");
  expect(linkElement).toBeInTheDocument();
});

test("render button search", () => {
  render(<App />);
  const linkElement = screen.getByTestId("buttonSearch");
  expect(linkElement).toBeInTheDocument();
});

test("render switch dark mode", () => {
  render(<App />);
  const linkElement = screen.getByTestId("switchDarkMode");
  expect(linkElement).toBeInTheDocument();
});

test("default in light mode", () => {
  render(<App />);
  const html = document.querySelector("html");
  expect(html.classList.contains("dark")).toBe(false);
});

test("change dark mode", () => {
  render(<App />);
  const linkElement = screen.getByTestId("switchDarkMode");
  act(() => {
    linkElement.click();
  });
  const html = document.querySelector("html");
  expect(html.classList.contains("dark")).toBe(true);
});
