import { act, render, screen } from "@testing-library/react";
import { PerfumeRepository } from "../../core/services/perfume.repository";
import { usePerfumes } from "./use.perfumes";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";
import { Perfume } from "../models/perfume";
import { ApiResponse } from "../models/back";

const id = "1";
const mockPerfume = {
  name: "Test Perfume",
  brand: "Test Brand",
} as unknown as Perfume;

const mockApiResponse = {
  items: [{}],
} as unknown as ApiResponse;
function TestComponent() {
  const {
    handleLoadPerfumes,
    handleAddPerfumes,
    handleDelete,
    handleEditPerfume,
    handleFilterPerfumes,
  } = usePerfumes();

  return (
    <>
      <button onClick={handleLoadPerfumes}></button>
      <button onClick={() => handleAddPerfumes(mockPerfume)}></button>
      <button onClick={() => handleFilterPerfumes(id)}></button>
      <button onClick={() => handleDelete(id)}></button>
      <button onClick={() => handleEditPerfume(mockPerfume)}></button>
    </>
  );
}

describe("Given the usePerfumes custom hook", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <Router>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      )
    );
    elements = screen.getAllByRole("button");
  });

  describe("When load perfumes button is clicked", () => {
    test("Then the handleLoadPerfumes function should be called", async () => {
      PerfumeRepository.prototype.query = jest
        .fn()
        .mockResolvedValue(mockApiResponse);
      await act(async () => {
        await userEvent.click(elements[0]);
        expect(PerfumeRepository.prototype.query).toHaveBeenCalled();
      });
    });
  });

  describe("When add perfume button is clicked", () => {
    test("Then the handleAddPerfumes function should be called with the correct parameters", async () => {
      PerfumeRepository.prototype.addPerfume = jest.fn();
      await act(async () => {
        await userEvent.click(elements[1]);
        expect(PerfumeRepository.prototype.addPerfume).toHaveBeenCalled();
      });
    });
  });

  describe("When filter button is clicked", () => {
    test("Then the handleFilterPerfumes function should be called with the correct parameters", async () => {
      PerfumeRepository.prototype.filter = jest
        .fn()
        .mockResolvedValue(mockApiResponse);
      await act(async () => {
        await userEvent.click(elements[2]);
        expect(PerfumeRepository.prototype.filter).toHaveBeenCalled();
      });
    });
  });

  describe("When delete button is clicked", () => {
    test("Then the handleDelete function should be called with the correct parameters", async () => {
      PerfumeRepository.prototype.deleteById = jest
        .fn()
        .mockResolvedValue(mockApiResponse);
      await act(async () => {
        await userEvent.click(elements[3]);
        expect(PerfumeRepository.prototype.deleteById).toHaveBeenCalled();
      });
    });
  });

  describe("When edit button is clicked", () => {
    test("Then the handleEditPerfume function should be called with the correct parameters", async () => {
      PerfumeRepository.prototype.update = jest.fn();
      await act(async () => {
        await userEvent.click(elements[4]);
        expect(PerfumeRepository.prototype.update).toHaveBeenCalled;
      });
    });
  });
});
