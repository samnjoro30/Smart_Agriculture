
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../auth/login/page";
import { vi } from "vitest";
// import Register from "../auth/register/page";
import axiosInstance from '../API/axiosInstance';

vi.mock("../API/axiosInstance", () => ({
    default: { post: vi.fn() },   // provide a mock `post`
  }));
  
const pushMock = vi.fn();
vi.mock("next/navigation", () => {
    return {
      useRouter: () => ({
        push: vi.fn(),   
        replace: vi.fn(),
        prefetch: vi.fn(),
      }),
    };
  });

describe("LoginForm", () => {
  it("logs in successfully", async () => {
    (axiosInstance.post as any).mockResolvedValue({ data: { message: "success" } });

    const onSuccess = vi.fn();
    render(<Login onSuccess={onSuccess} />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@test.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  );
  expect(pushMock).toHaveBeenCalledWith("/dashboard");
});

  it("shows error on invalid login", async () => {
    (axiosInstance.post as any).mockRejectedValue({ response: { status: 400 } });

    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "bad@test.com");
    await userEvent.type(screen.getByPlaceholderText("Enter Password"), "wrongpass");
    fireEvent.click(screen.getByRole("button", { name: /sign in/i}));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});