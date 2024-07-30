class StreamResponseHandler {
  constructor() {
    this.fullResponse = '';
    this.jsonResponse = null;
    this.formattedContent = '';
  }

  handleChunk(chunk) {
    const content = chunk.choices[0]?.delta?.content || '';
    this.fullResponse += content;
    this.tryParseJSON();
    this.formatContent();
    return this.formattedContent;
  }

  tryParseJSON() {
    try {
      this.jsonResponse = JSON.parse(this.fullResponse);
    } catch (error) {
      // If parsing fails, it means the JSON is incomplete or invalid
      // We'll keep accumulating chunks until we have a valid JSON
    }
  }

  formatContent() {
    if (this.jsonResponse) {
      this.formattedContent = this.formatJSONResponse(this.jsonResponse);
    } else {
      // If we don't have a valid JSON yet, format the raw content
      this.formattedContent = this.formatRawContent(this.fullResponse);
    }
  }

  formatJSONResponse(json) {
    let formatted = '';

    if (json.response && json.response.component_code) {
      const { component_code } = json.response;

      formatted += '## React Component Analysis\n\n';

      if (component_code.import_statement) {
        formatted += '### Imports\n\n';
        formatted += '```jsx\n' + component_code.import_statement + '\n```\n\n';
      }

      if (component_code.dialog_component) {
        const { name, props, jsx } = component_code.dialog_component;
        formatted += `### ${name} Component\n\n`;
        formatted += `Props: ${props.join(', ')}\n\n`;
        formatted += '```jsx\n' + jsx.join('\n') + '\n```\n\n';
      }

      if (component_code.example_usage) {
        formatted += '### Example Usage\n\n';
        const { import_statement, jsx } =
          component_code.example_usage.parent_component;
        formatted +=
          '```jsx\n' + import_statement + '\n\n' + jsx.join('\n') + '\n```\n\n';
      }
    } else {
      // If the JSON structure is different, format it generically
      formatted = '```json\n' + JSON.stringify(json, null, 2) + '\n```\n\n';
    }

    return formatted;
  }

  formatRawContent(content) {
    // Basic Markdown formatting for raw content
    return content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, language, code) => {
        return `\`\`\`${language || ''}\n${code.trim()}\n\`\`\`\n\n`;
      }
    );
  }

  getFinalContent() {
    return this.formattedContent;
  }
}

export default StreamResponseHandler;
