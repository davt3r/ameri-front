import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./Menu";
import "@testing-library/jest-dom/extend-expect";


describe("Given Menu component", () => {
  describe("When it is instantiated", () => {
    test("renders menu items correctly", () => {
      render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      );

      const InicioLink = screen.getAllByRole("link");


      expect(InicioLink[0]).toBeInTheDocument();

    });
  });
});
