import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";

describe("Given the Header component", () => {
  test("it should render the Header", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeTruthy();
  });
});
