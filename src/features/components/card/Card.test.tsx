import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./Card";
import { Perfume } from "../../models/perfume";
import "@testing-library/jest-dom";

describe("Card component", () => {
  const mockPerfume: Perfume = {
    id: "1",
    name: "YSL",
    image: {
      url: "https://example.com/image.jpg",
      urlOriginal: "",
      mimetype: "",
      size: 0,
    },
    season: "winter",
    topNotes: "bergamote",
    baseNotes: "woodyNotes",
    lastNotes: "vetiver",
    owner: {
      id: "",
      userName: "",
      email: "",
      password: "",
      addPerfumes: [],
      isLogged: false,
      token: "",
    },
    description: "",
  };

  test("renders the card with correct data", () => {
    render(
      <MemoryRouter>
        <Card item={mockPerfume} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link");
    const imageElement = screen.getByAltText(
      mockPerfume.name
    ) as HTMLImageElement;
    const nameElement = screen.getByText(mockPerfume.name);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/details/${mockPerfume.id}`);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(mockPerfume.image.url);
    expect(imageElement.width).toBe(160);
    expect(imageElement.height).toBe(180);
    expect(nameElement).toBeInTheDocument();
  });
});
