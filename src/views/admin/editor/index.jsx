/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-constant-condition */
'use client';
// =========================================================
// [CODE EDITOR] | React Code Editor with Live Preview
// =========================================================
import { Editor } from '@monaco-editor/react';
import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DiHtml5, DiCss3, DiJavascript } from 'react-icons/di';
import {
  FaFolder,
  FaFile,
  FaCog,
  FaGithub,
  FaBell,
  FaMoon,
  FaSun,
  FaPalette,
} from 'react-icons/fa';

const WebComponent = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorScheme, setColorScheme] = useState('default');
  const [files, setFiles] = useState([
    { id: 'html', name: 'index.html', content: '<h1>Hello World</h1>' },
    {
      id: 'css',
      name: 'styles.css',
      content: 'body { font-family: Arial, sans-serif; }',
    },
    { id: 'js', name: 'script.js', content: 'console.log("Hello World");' },
  ]);
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState('// Start coding here');
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [isFileNavOpen, setIsFileNavOpen] = useState(true);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const editorRef = useRef(null);
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
    fontSize: fontSize,
    minimap: { enabled: false },
    lineNumbers: 'on',
    folding: true,
    autoIndent: 'full',
    suggestOnTriggerCharacters: true,
  };
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFiles(items);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeColorScheme = () => {
    const schemes = ['default', 'blue', 'green', 'purple'];
    const currentIndex = schemes.indexOf(colorScheme);
    const nextIndex = (currentIndex + 1) % schemes.length;
    setColorScheme(schemes[nextIndex]);
  };

  const handleEditorChange = value => {
    setCode(value);
    // Simulating real-time error checking
    if (value.includes('console.log')) {
      addNotification('Warning: console.log found in production code');
    }
  };
  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  const addNotification = message => {
    setNotifications(prev => [...prev, { id: Date.now(), message }]);
  };

  const handleFileSelect = file => {
    setSelectedFile(file);
    setCode(file.content);
  };

  const handleThemeChange = newTheme => {
    setTheme(newTheme);
  };

  const handleFontSizeChange = newSize => {
    setFontSize(newSize);
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-screen ${isDarkMode ? 'dark' : ''} ${colorScheme}`}
    >
      <nav className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          File Navigation
        </h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="files">
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {files.map((file, index) => (
                  <Draggable key={file.id} draggableId={file.id} index={index}>
                    {provided => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center p-2 cursor-pointer ${activeTab === file.id ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                        onClick={() => handleTabChange(file.id)}
                      >
                        {file.id === 'html' && (
                          <DiHtml5 className="mr-2 text-orange-500" />
                        )}
                        {file.id === 'css' && (
                          <DiCss3 className="mr-2 text-blue-500" />
                        )}
                        {file.id === 'js' && (
                          <DiJavascript className="mr-2 text-yellow-500" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                          {file.name}
                        </span>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </nav>
      <main className="flex-grow flex flex-col md:flex-row">
        <section className="w-full md:w-1/2 p-4 bg-white dark:bg-gray-900">
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 p-2 flex justify-between items-center">
              <button
                className="p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsFileNavOpen(!isFileNavOpen)}
                aria-label="Toggle file navigation"
              >
                ≡
              </button>
              <div className="flex items-center space-x-4">
                <select
                  className="bg-gray-700 p-1 rounded"
                  value={theme}
                  onChange={e => handleThemeChange(e.target.value)}
                  aria-label="Select theme"
                >
                  <option value="vs-dark">Dark</option>
                  <option value="light">Light</option>
                </select>
                <input
                  type="number"
                  className="bg-gray-700 p-1 rounded w-16"
                  value={fontSize}
                  onChange={e => handleFontSizeChange(Number(e.target.value))}
                  aria-label="Font size"
                />
                <FaGithub className="cursor-pointer" title="Git integration" />
                <FaBell className="cursor-pointer" title="Notifications" />
              </div>
            </div>
            <Editor
              height="100%"
              language="javascript"
              theme={theme}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              onValidate={handleEditorValidation}
              editorProps={editorOptions}
              editorDidMount={editor => {
                editorRef.current = editor;
              }}
            />
          </div>
        </section>
        <section className="w-full md:w-1/2 p-4 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Live Preview
          </h2>
          <div
            className="w-full h-64 p-2 border border-gray-300 dark:border-gray-700 rounded overflow-auto bg-white dark:bg-gray-900"
            dangerouslySetInnerHTML={{
              __html: files.find(file => file.id === 'html')?.content || '',
            }}
          />
        </section>
      </main>
      {/* Properties and Preview */}
      <div
        className={`w-64 bg-gray-800 p-4 overflow-y-auto transition-all ${isPropertiesOpen ? '' : 'w-0 p-0'}`}
      >
        <h2 className="text-xl font-bold mb-4">Properties</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Current File</h3>
          <p>{selectedFile.name}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => addNotification('Changes saved successfully!')}
        >
          Save Changes
        </button>
      </div>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-500" />
          )}
        </button>
        <button
          onClick={changeColorScheme}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Change Color Scheme"
        >
          <FaPalette className="text-gray-500 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default WebComponent;
