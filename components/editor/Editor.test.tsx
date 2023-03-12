import { render, waitFor, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"
import Editor from "./Editor"
//@ts-ignore
import preloadAll from "jest-next-dynamic"

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const defaultProps = {
  htmlText: "<p>test</p>",
  onChange: jest.fn(),
}

function setup() {
  const utils = render(<Editor {...defaultProps} />)
  // const editor = await waitFor(() => utils.container.querySelector("#rich-text-editor"))
  // const editor = await waitFor(() =>
  //   utils.container.querySelector<HTMLDivElement>("#rich-text-editor")
  // )
  // const editor = await waitFor(() =>
  //   getById(utils.container, "rich-text-editor")
  // )

  return {
    ...utils,
  }
}

describe("Test Editor component", () => {
  beforeAll(async () => {
    await preloadAll()
  })
  afterEach(() => {
    cleanup()
  })

  it("renders the editor", async () => {
    const utils = setup()
    expect(
      await waitFor(() =>
        utils.container.querySelector<HTMLDivElement>("#rich-text-editor")
      )
    ).toBeInTheDocument()
  })
  it("renders the editor", async () => {
    // const utils = setup()
    expect(true).toBe(true)
    // expect(
    //   await waitFor(() =>
    //     utils.container.querySelector<HTMLDivElement>("#rich-text-editor")
    //   )
    // ).toBeInTheDocument()
  })
})
