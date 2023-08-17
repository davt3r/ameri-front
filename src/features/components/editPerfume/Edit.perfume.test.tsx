import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { usePerfumes } from "../../hooks/use.perfumes";
import EditPerfumeForm from "./Edit.perfume";
import { Perfume } from "../../models/perfume";
import { store } from "../../../core/store/store";

jest.mock("../../hooks/use.perfumes", () => ({
  usePerfumes: jest.fn().mockReturnValue({
    handleEditPerfume: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockImplementation((selector) =>
    selector({
      perfumes: {
        perfumes: [
          {
            id: "1",
            image: {
              url: "https://example.com/image.jpg",
              urlOriginal: "",
              mimetype: "",
              size: 0,
            },
            name: "ysl",
            topNotes: "sample",
            baseNotes: "sample",
            description: "sample",
            lastNotes: "sample",
            owner: "sample",
            season: "sample",
          },
        ] as unknown as Perfume[],
      },
    })
  ),
}));

describe("EditPerfumeForm Component", () => {
  test("submits the form correctly", async () => {
    const handleEditPerfume = jest.fn();

    usePerfumes().handleEditPerfume = handleEditPerfume;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["editperfume/1"]}>
          <EditPerfumeForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByLabelText("form");
    const seasonInput = screen.getByLabelText("Choose a season");

    expect(seasonInput).toHaveValue("winter");

    await userEvent.type(seasonInput, "sample");
    fireEvent.change(seasonInput, { target: { value: "summer" } });
    expect(seasonInput).toHaveValue("summer");

    await act(async () => {
      fireEvent.submit(formElement);
    });

    expect(handleEditPerfume).toHaveBeenCalled();
  });
});
