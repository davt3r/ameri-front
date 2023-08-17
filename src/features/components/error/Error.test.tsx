import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "./Error.page";

describe("Given Error component", () => {
  describe("When it is instantiated", () => {
    beforeEach(() => {
      render(<ErrorPage />);
    });

    test("Then it should be in the document", () => {
      const element = screen.getByRole("heading", { level: 2, name: "404" });
      expect(element).toBeInTheDocument();
    });
  });
});
