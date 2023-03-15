import { render, screen, waitFor } from "@testing-library/react"
import App from "./App"

describe("App", () => {
	it("should render loading at first", () => {
		render(<App />)
		const loadingElement = screen.getByText(/Loading/i)
		expect(loadingElement).toBeInTheDocument()
	})

	it("Should render advice after async code", async () => {
		render(<App />)
    await waitFor(() => {
      const h1Element = screen.getByText(/ADVICE/i)
      expect(h1Element).toBeInTheDocument()
    })
	})
})
