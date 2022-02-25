import React from "react";
import axios from "axios";
import { getByText, getAllByAltText } from "@testing-library/react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  queryByAltText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
  });

  it("returns all test id's in the container", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => {
      const appointments = getAllByTestId(container, "appointment");

      return appointments;
    });
  });
  it("all appointment test_ids", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => {
      const appointments = getAllByTestId(container, "appointment")[0];
      return appointments;
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const spotsRemaining = getByTestId(day, "spotsRemaining").textContent;

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const dayAfterAdd = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    const spotsRemainingAfterAdd = getByTestId(dayAfterAdd, "spotsRemaining")
      .textContent;
    expect(+spotsRemainingAfterAdd).toEqual(+spotsRemaining - 1);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    const spotsRemaining = getByTestId(day, "spotsRemaining").textContent;

    fireEvent.click(getByTestId(appointment, "Delete"));
    let confirmModal;
    await waitForElement(() => {
      confirmModal = getByTestId(container, "confirmModal");
      return confirmModal;
    });

    fireEvent.click(getByText(confirmModal, "Confirm"));
    await waitForElement(() => getByText(container, "Deleting"));

    const dayAfterDelete = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    const spotRemainingAfterDelete = getByTestId(
      dayAfterDelete,
      "spotsRemaining"
    ).textContent;
    expect(+spotRemainingAfterDelete).toEqual(+spotsRemaining + 1);
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    const spotsRemaining = getByTestId(day, "spotsRemaining").textContent;

    fireEvent.click(getByTestId(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Mohamed" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Mohamed"));

    const spotsRemainingAfterAdd = getByTestId(day, "spotsRemaining")
      .textContent;
    expect(spotsRemainingAfterAdd).toEqual(spotsRemaining);
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => queryByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to Delete?")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Could not cancel appointment")
    );
  });
});