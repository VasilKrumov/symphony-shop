import { render, screen } from "@testing-library/react"
import { StarRating } from "@/components/star-rating"

describe("StarRating", () => {
  it("renders correct number of stars", () => {
    const { container } = render(<StarRating rating={3.5} />)
    const stars = container.querySelectorAll("svg")
    expect(stars).toHaveLength(10)
  })

  it("displays correct rating value", () => {
    render(<StarRating rating={4.2} />)
    expect(screen.getByText("4.2")).toBeInTheDocument()
  })

  it("formats rating to one decimal place", () => {
    render(<StarRating rating={3} />)
    expect(screen.getByText("3.0")).toBeInTheDocument()
  })

  it("applies correct fill percentage for full stars", () => {
    const { container } = render(<StarRating rating={3} />)
    const filledStars = container.querySelectorAll('div[style*="width: 100%"]')
    expect(filledStars.length).toBeGreaterThanOrEqual(3)
  })

  it("applies correct fill percentage for partial stars", () => {
    const { container } = render(<StarRating rating={2.5} />)
    const partialStar = container.querySelector('div[style*="width: 50%"]')
    expect(partialStar).toBeInTheDocument()
  })

  it("applies correct opacity based on low rating", () => {
    const { container } = render(<StarRating rating={1.5} />)
    const filledStar = container.querySelector(".text-yellow-500")
    expect(filledStar).toBeInTheDocument()
    const opacity = window.getComputedStyle(filledStar!).opacity
    const expectedOpacity = 0.3 + (1.5 / 2) * 0.2
    expect(parseFloat(opacity)).toBeCloseTo(expectedOpacity, 1)
  })

  it("applies correct opacity based on medium rating", () => {
    const { container } = render(<StarRating rating={3} />)
    const filledStar = container.querySelector(".text-yellow-500")
    expect(filledStar).toBeInTheDocument()
    const opacity = window.getComputedStyle(filledStar!).opacity
    const expectedOpacity = 0.5 + ((3 - 2) / 2) * 0.3
    expect(parseFloat(opacity)).toBeCloseTo(expectedOpacity, 1)
  })

  it("applies correct opacity based on high rating", () => {
    const { container } = render(<StarRating rating={4.5} />)
    const filledStar = container.querySelector(".text-yellow-500")
    expect(filledStar).toBeInTheDocument()
    const opacity = window.getComputedStyle(filledStar!).opacity
    const expectedOpacity = 0.8 + ((4.5 - 4) / 1) * 0.2
    expect(parseFloat(opacity)).toBeCloseTo(expectedOpacity, 1)
  })

  it("handles edge case of 0 rating", () => {
    render(<StarRating rating={0} />)
    expect(screen.getByText("0.0")).toBeInTheDocument()
  })

  it("handles edge case of max rating", () => {
    render(<StarRating rating={5} />)
    expect(screen.getByText("5.0")).toBeInTheDocument()
  })

  it("renders custom max rating", () => {
    const { container } = render(<StarRating rating={4} maxRating={10} />)
    const stars = container.querySelectorAll("svg")
    expect(stars).toHaveLength(20)
  })

  it("applies custom size", () => {
    const { container } = render(<StarRating rating={3} size={24} />)
    const starContainer = container.querySelector('div[style*="width: 24"]')
    expect(starContainer).toBeInTheDocument()
  })
})
