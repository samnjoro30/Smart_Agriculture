// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Login from "../auth/login/page";
// import { vi } from "vitest";
// import axiosInstance from "../API/axiosInstance";

// // Mock next/navigation router
// vi.mock("next/navigation", () => {
//   return {
//     useRouter: () => ({
//       push: vi.fn(),
//     }),
//   };
// });

// // Mock axios instance
// vi.mock("../../API/axiosInstance", () => ({
//   default: {
//     post: vi.fn(),
//   },
// }));

// describe("Login Component", () => {
//   const mockRouter = require("next/navigation").useRouter();
//   const mockPost = axiosInstance.post as unknown as ReturnType<typeof vi.fn>;

//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should render login form inputs", () => {
//     render(<Login />);
//     expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
//   });

//   it("handles successful login", async () => {
//     mockPost.mockResolvedValueOnce({ data: { message: "Login successful" } });

//     render(<Login />);
//     await userEvent.type(screen.getByPlaceholderText(/email/i), "test@example.com");
//     await userEvent.type(screen.getByPlaceholderText(/enter password/i), "password123");
//     fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
//     await waitFor(() => {
//       expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
//     });
//   });

//   it("shows error on invalid credentials (400)", async () => {
//     mockPost.mockRejectedValueOnce({ response: { status: 400 } });

//     render(<Login />);
//     await userEvent.type(screen.getByPlaceholderText(/email/i), "bad@test.com");
//     await userEvent.type(screen.getByPlaceholderText(/enter password/i), "wrongpass");
//     fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     expect(
//       await screen.findByText(/invalid credentials/i)
//     ).toBeInTheDocument();
//   });

//   it("redirects to verification if account not verified (403)", async () => {
//     mockPost.mockRejectedValueOnce({ response: { status: 403 } });

//     render(<Login />);
//     await userEvent.type(screen.getByPlaceholderText(/email/i), "notverified@test.com");
//     await userEvent.type(screen.getByPlaceholderText(/enter password/i), "password");
//     fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     expect(
//       await screen.findByText(/your account is not verified/i)
//     ).toBeInTheDocument();

//     await waitFor(() => {
//       expect(mockRouter.push).toHaveBeenCalledWith("/auth/verification");
//     });
//   });

//   it("shows generic error on unexpected failure", async () => {
//     mockPost.mockRejectedValueOnce(new Error("Network error"));

//     render(<Login />);
//     await userEvent.type(screen.getByPlaceholderText(/email/i), "user@test.com");
//     await userEvent.type(screen.getByPlaceholderText(/enter password/i), "password");
//     fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     expect(
//       await screen.findByText(/unexpected error occurred/i)
//     ).toBeInTheDocument();
//   });
// });