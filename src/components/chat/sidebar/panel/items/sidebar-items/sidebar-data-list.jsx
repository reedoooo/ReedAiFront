// SidebarDataList.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Separator } from '../ui/separator';
import { AssistantItem } from './items/assistants/assistant-item';
import { ChatItem } from './items/chat/chat-item';
import { CollectionItem } from './items/collections/collection-item';
import { FileItem } from './items/files/file-item';
import { Folder } from './items/folders/folder-item';
import { ModelItem } from './items/models/model-item';
import { PresetItem } from './items/presets/preset-item';
import { PromptItem } from './items/prompts/prompt-item';
import { ToolItem } from './items/tools/tool-item';
import { useDragAndDrop } from './useDragAndDrop';
import { ChatbotUIContext } from '@/context/context';
import { updateAssistant } from '@/db/assistants';
import { updateChat } from '@/db/chats';
import { updateCollection } from '@/db/collections';
import { updateFile } from '@/db/files';
import { updateModel } from '@/db/models';
import { updatePreset } from '@/db/presets';
import { updatePrompt } from '@/db/prompts';
import { updateTool } from '@/db/tools';
import { cn } from '@/lib/utils';

export const SidebarDataList = ({ contentType, data, folders }) => {
  const {
    setChats,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels,
  } = useContext(ChatbotUIContext);

  const divRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const getDataListComponent = (contentType, item) => {
    switch (contentType) {
      case 'chats':
        return <ChatItem chat={item} />;
      case 'presets':
        return <PresetItem preset={item} />;
      case 'prompts':
        return <PromptItem prompt={item} />;
      case 'files':
        return <FileItem file={item} />;
      case 'collections':
        return <CollectionItem collection={item} />;
      case 'assistants':
        return <AssistantItem assistant={item} />;
      case 'tools':
        return <ToolItem tool={item} />;
      case 'models':
        return <ModelItem model={item} />;
      default:
        return null;
    }
  };

  const getSortedData = (data, dateCategory) => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const yesterdayStart = new Date(
      new Date().setDate(todayStart.getDate() - 1)
    );
    const oneWeekAgoStart = new Date(
      new Date().setDate(todayStart.getDate() - 7)
    );

    return data
      .filter(item => {
        const itemDate = new Date(item.updated_at || item.created_at);
        switch (dateCategory) {
          case 'Today':
            return itemDate >= todayStart;
          case 'Yesterday':
            return itemDate >= yesterdayStart && itemDate < todayStart;
          case 'Previous Week':
            return itemDate >= oneWeekAgoStart && itemDate < yesterdayStart;
          case 'Older':
            return itemDate < oneWeekAgoStart;
          default:
            return true;
        }
      })
      .sort(
        (a, b) =>
          new Date(b.updated_at || b.created_at).getTime() -
          new Date(a.updated_at || a.created_at).getTime()
      );
  };

  const updateFunctions = {
    chats: updateChat,
    presets: updatePreset,
    prompts: updatePrompt,
    files: updateFile,
    collections: updateCollection,
    assistants: updateAssistant,
    tools: updateTool,
    models: updateModel,
  };

  const stateUpdateFunctions = {
    chats: setChats,
    presets: setPresets,
    prompts: setPrompts,
    files: setFiles,
    collections: setCollections,
    assistants: setAssistants,
    tools: setTools,
    models: setModels,
  };

  const updateFolder = async (itemId, folderId) => {
    const item = data.find(item => item.id === itemId);
    if (!item) return null;
    const updateFunction = updateFunctions[contentType];
    const setStateFunction = stateUpdateFunctions[contentType];
    if (!updateFunction || !setStateFunction) return;
    const updatedItem = await updateFunction(item.id, {
      folder_id: folderId,
    });
    setStateFunction(items =>
      items.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const { isDragOver, dragHandlers, handleDragStart } =
    useDragAndDrop(updateFolder);

  useEffect(() => {
    if (divRef.current) {
      setIsOverflowing(
        divRef.current.scrollHeight > divRef.current.clientHeight
      );
    }
  }, [data]);

  const dataWithFolders = data.filter(item => item.folder_id);
  const dataWithoutFolders = data.filter(item => item.folder_id === null);

  return (
    <>
      {data.length === 0 && <div>No {contentType}.</div>}
      {(dataWithFolders.length > 0 || dataWithoutFolders.length > 0) && (
        <div {...dragHandlers}>
          {folders.map(folder => (
            <Folder key={folder.id} folder={folder}>
              {dataWithFolders
                .filter(item => item.folder_id === folder.id)
                .map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={e => handleDragStart(e, item.id)}
                  >
                    {getDataListComponent(contentType, item)}
                  </div>
                ))}
            </Folder>
          ))}
          {folders.length > 0 && <Separator />}
          {contentType === 'chats' ? (
            <>
              {['Today', 'Yesterday', 'Previous Week', 'Older'].map(
                dateCategory => {
                  const sortedData = getSortedData(
                    dataWithoutFolders,
                    dateCategory
                  );
                  return (
                    sortedData.length > 0 && (
                      <div key={dateCategory}>
                        <div>{dateCategory}</div>
                        {sortedData.map(item => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={e => handleDragStart(e, item.id)}
                          >
                            {getDataListComponent(contentType, item)}
                          </div>
                        ))}
                      </div>
                    )
                  );
                }
              )}
            </>
          ) : (
            <>
              {dataWithoutFolders.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={e => handleDragStart(e, item.id)}
                >
                  {getDataListComponent(contentType, item)}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
