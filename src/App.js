import React from "react";
import marked from "marked";

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.options({
  breaks: true,
  renderer: renderer
});

const defaultMarkdown =
  "# This is a header\n\n" +
  "## This is a subheader\n\n" +
  "[This is a link](#)\n\n" +
  "This is inline `<code>`\n\n" +
  "```\nThis is a code block\n```\n\n" +
  "* This is a list item\n\n" +
  "> This is a blockquote\n\n" +
  "![This is an image](https://octodex.github.com/images/yaktocat.png)\n\n" +
  "**This is bolded text**";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
    this.parseData = this.parseData.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: marked(defaultMarkdown)
    });
  }

  parseData(event) {
    this.setState({
      data: marked(event.target.value)
    });
  }

  componentDidUpdate() {
    this.refs.previewRef.innerHTML = this.state.data;
  }

  render() {
    return (
      <div id="previewer">
        <textarea
          id="editor"
          defaultValue={defaultMarkdown}
          onChange={this.parseData}
        />
        <div id="preview" ref="previewRef" />
      </div>
    );
  }
}

export default App;
