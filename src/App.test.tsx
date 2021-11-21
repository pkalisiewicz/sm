import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./app";
import { mockedData } from "./testing";

describe("File uploader application", () => {
  it("should render the description properly", () => {
    render(<App />);
    expect(screen.getByText("Upload your files")).toBeInTheDocument();
    expect(
      screen.getByText("only .log files are acceptable")
    ).toBeInTheDocument();
    expect(screen.getByText("Add log file")).toBeInTheDocument();
  });

  it("should allow user to upload the files", async () => {
    const data = new File([mockedData], "webserver.log");
    render(<App />);

    const uploadButton = await screen.findByLabelText("Add log file");
    userEvent.upload(uploadButton, data);
    expect(await screen.findByTestId("result-table")).toBeInTheDocument();
  });

  it("should error if file is empty or corrupted", async () => {
    const data = new File([""], "webserver.log");
    render(<App />);

    const uploadButton = await screen.findByLabelText("Add log file");
    userEvent.upload(uploadButton, data);
    expect(
      await screen.findByText("File is corrupted, or empty. Please try again!")
    ).toBeInTheDocument();
  });
});
