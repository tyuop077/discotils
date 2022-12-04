import {Component, ReactNode} from "react";
import styles from "./errorBoundary.module.scss";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {hasError: false, error: null}
  }
  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error}
  }
/*  componentDidCatch(error: Error, errorInfo: any) {
    console.log({ error, errorInfo })
  }*/
  static getIssueLink(error: Error) {
    const url = new URL("https://github.com/tyuop077/discotils/issues/new");
    url.searchParams.set("title", `Error: ${error.message ?? "Unknown error"}`);
    url.searchParams.set("body", `Error: ${error.message ?? "Unknown error"}\n\n` +
      `Stack trace:\n\`\`\`\n${error.stack ?? "No stack trace"}\n\`\`\`\n\n` +
      `Page URL: ${window.location.href}\n` +
      `User agent: \`${window.navigator.userAgent}\`\n` +
      `Platform: ${window.navigator.platform}`
    );
    return url.toString();
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2>Oops, there is an error!</h2>
          <div className={styles.buttons}>
            <button
              onClick={() => this.setState({hasError: false, error: null})}
            >
              Try again?
            </button>
            <button
              onClick={() => window.open(ErrorBoundary.getIssueLink(this.state.error!), "_blank")}
            >
              Open an issue
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
