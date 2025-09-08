
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../auth/login/page";
import { vi } from "vitest";
// import Register from "../auth/register/page";
import axiosInstance from '../API/axiosInstance';

vi.mock("../API/axiosInstance", () => ({
    default: { post: vi.fn() },   // provide a mock `post`
  }));

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
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("shows error on invalid login", async () => {
    (axiosInstance.post as any).mockRejectedValue(new Error("Invalid"));

    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "bad@test.com");
    await userEvent.type(screen.getByPlaceholderText("......"), "wrongpass");
    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid credentials");
  });
});