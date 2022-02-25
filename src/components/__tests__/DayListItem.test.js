import React from "react";

import { render, cleanup, getByText } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByTestId } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByTestId("spotsRemaining")).toHaveTextContent("no");
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByTestId } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByTestId("spotsRemaining")).toHaveTextContent("1");
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByTestId } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByTestId("spotsRemaining")).toHaveTextContent("2");
});