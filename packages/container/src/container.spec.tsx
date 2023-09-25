import { Container } from "./index";
import { render } from "@react-email/render";

describe("Container component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it("renders children correctly", () => {
    const testMessage = "Test message";
    const html = render(<Container>{testMessage}</Container>);
    expect(html).toContain(testMessage);
  });

  it("passes style and other props correctly", () => {
    const style = { maxWidth: 300, backgroundColor: "red" };
    const html = render(
      <Container style={style} data-testid="container-test">
        Test
      </Container>,
    );
    expect(html).toContain('style="max-width:300px;background-color:red"');
    expect(html).toContain('data-testid="container-test"');
  });
});

describe("render", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it("renders the <Container> component", () => {
    const container = render(
      <Container style={{ maxWidth: "300px" }}>
        <button>Hi</button>
      </Container>,
    );

    expect(container).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" role=\\"presentation\\" cellSpacing=\\"0\\" cellPadding=\\"0\\" border=\\"0\\" style=\\"max-width:300px\\"><tbody><tr style=\\"width:100%\\"><td><button>Hi</button></td></tr></tbody></table>"`,
    );
  });
});
