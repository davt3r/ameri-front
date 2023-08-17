import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { store } from "../../../core/store/store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";

describe("Given the Home component", () => {
  test("it should render the Home", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const homeElement = document.querySelector("li");
    expect(homeElement).toBeInTheDocument();
  });
});
