import * as monaco from 'monaco-editor';

// Define worker loaders
let jsonWorker, cssWorker, htmlWorker, tsWorker, editorWorker;

// Dynamically import workers only in browser environment
if (typeof window !== 'undefined') {
  jsonWorker = () =>
    import('monaco-editor/esm/vs/language/json/json.worker?worker');
  cssWorker = () =>
    import('monaco-editor/esm/vs/language/css/css.worker?worker');
  htmlWorker = () =>
    import('monaco-editor/esm/vs/language/html/html.worker?worker');
  tsWorker = () =>
    import('monaco-editor/esm/vs/language/typescript/ts.worker?worker');
  editorWorker = () =>
    import('monaco-editor/esm/vs/editor/editor.worker?worker');
}

// Configure Monaco environment
self.MonacoEnvironment = {
  getWorker: async function (_, label) {
    let worker;

    switch (label) {
      case 'json':
        worker = await jsonWorker();
        break;
      case 'css':
      case 'scss':
      case 'less':
        worker = await cssWorker();
        break;
      case 'html':
      case 'handlebars':
      case 'razor':
        worker = await htmlWorker();
        break;
      case 'typescript':
      case 'javascript':
        worker = await tsWorker();
        break;
      default:
        worker = await editorWorker();
    }

    return new Worker(worker.default);
  },
};

// Set TypeScript defaults
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

export default monaco;
