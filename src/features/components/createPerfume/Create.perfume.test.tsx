import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../../../core/store/store";
import PerfumeForm from "./Create.perfume";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe("Form Component", () => {
  let mockFetch: jest.Mock;

  test("submits the form correctly", async () => {
    mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        error: false,
      }),
    });
    global.fetch = mockFetch;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerfumeForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const seasonInput = screen.getByLabelText("Choose a season");
    const topInput = screen.getByLabelText("Choose the Top Note");
    const baseInput = screen.getByLabelText("Choose the Base Note");
    const lastInput = screen.getByLabelText("Choose the last Note");
    const descriptionInput = screen.getByPlaceholderText("description");

    fireEvent.change(seasonInput, { target: { value: "summer" } });
    fireEvent.change(topInput, { target: { value: "ginger" } });
    fireEvent.change(baseInput, { target: { value: "aquaticNotes" } });
    fireEvent.change(lastInput, { target: { value: "sandal" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    expect(seasonInput).toHaveValue("summer");
    // expect(formData.get("topNotes")).toBe("ginger");
    // expect(formData.get("baseNotes")).toBe("aquaticNotes");
    // expect(formData.get("lastNotes")).toBe("sandal");
    // expect(formData.get("description")).toBe("Test description");

    await fireEvent.submit(formElement);
    // expect(useNavigate()).toHaveBeenCalled();
  });

  test("Form component error", async () => {
    mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        error: true,
      }),
    });
    global.fetch = mockFetch;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerfumeForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByRole("form");
    await fireEvent.submit(formElement);
  });
});
