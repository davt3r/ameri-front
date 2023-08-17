import { AppRoutes } from "./app.routes";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const MockComponent = jest.fn().mockReturnValue(<h1>Routes</h1>);
jest.mock("../home/Home", () => MockComponent);
jest.mock("../login/login", () => MockComponent);
jest.mock("../register/Register", () => MockComponent);
jest.mock("../detail/Detail", () => MockComponent);
jest.mock("../createPerfume/Create.perfume", () => MockComponent);
jest.mock("../list/List", () => MockComponent);
jest.mock("../error/Error.page", () => MockComponent);
jest.mock("../editPerfume/Edit.perfume", () => MockComponent);

describe("Given the AppRoutes component", () => {
  describe("When it is instantiated with the Home route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with the Login route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/login"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with the register route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/register"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with the details route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/details/:id"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe("When it is instantiated with the create route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/create"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe("When it is instantiated with the list route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/perfumes"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe("When it is instantiated with the error route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/*"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe("When it is instantiated with the edit route", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={["/edit/:id"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText("Routes");
    });

    test("Then it should be in the document", () => {
      expect(MockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
