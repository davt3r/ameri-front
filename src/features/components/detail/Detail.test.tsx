import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import PerfumeDetail from "./Detail";
import { usePerfumes } from "../../hooks/use.perfumes";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/use.perfumes", () => ({
  usePerfumes: jest.fn().mockReturnValue({
    perfumes: [
      {
        id: "1",
        name: "ysl",
        image: { url: "ysl.jpg" },
        topNotes: "iris",
        baseNotes: "woodyNotes",
        lastNotes: "vetiver",
        season: "winter",
        description: "This is a test perfume.",
        owner: "ragno",
      },
      { id: "2", name: "vr", image: { url: "vr.jpg" } },
    ],
    handleDelete: jest.fn(),
  }),
}));

describe("PerfumeDetail", () => {
  test("renders the detail card with correct data", () => {
    render(
      <Router initialEntries={["/detail/1"]}>
        <Provider store={store}>
          <PerfumeDetail />
        </Provider>
      </Router>
    );

    expect(screen.getByText("ysl")).toBeInTheDocument();
  });

  test("calls handleDelete and navigate when Delete button is clicked", () => {
    const handleDelete = jest.fn();
    const navigate = jest.fn();
    (usePerfumes as jest.Mock).mockReturnValue({
      perfumes: [
        {
          id: "1",
          name: "ysl",
          image: { url: "ysl.jpg" },
          topNotes: "iris",
          baseNotes: "woodyNotes",
          lastNotes: "vetiver",
          season: "winter",
          description: "This is a test perfume.",
          owner: "ragno",
        },
        { id: "2", name: "vr", image: { url: "vr.jpg" } },
      ],
      handleDelete,
    });
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    localStorage.setItem("userToken", "exampleToken");

    render(
      <Router initialEntries={["/detail/1"]}>
        <Provider store={store}>
          <PerfumeDetail />
        </Provider>
      </Router>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith("1");
    expect(navigate).toHaveBeenCalledWith("/perfumes");
  });

  test("navigates to the Edit page when Edit button is clicked", () => {
    const navigate = jest.fn();
    (usePerfumes as jest.Mock).mockReturnValue({
      perfumes: [
        {
          id: "1",
          name: "ysl",
          image: { url: "ysl.jpg" },
          topNotes: "iris",
          baseNotes: "woodyNotes",
          lastNotes: "vetiver",
          season: "winter",
          description: "This is a test perfume.",
          owner: "ragno",
        },
        { id: "2", name: "vr", image: { url: "vr.jpg" } },
      ],
    });
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    localStorage.setItem("userToken", "exampleToken");

    render(
      <Router initialEntries={["/detail/1"]}>
        <Provider store={store}>
          <PerfumeDetail />
        </Provider>
      </Router>
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(navigate).toHaveBeenCalledWith("/edit/1");
  });
});
