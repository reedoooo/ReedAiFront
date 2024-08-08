import {
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Switch,
} from '@mui/material';
import { fetchChatModel } from 'api/chat/models';
import { useChatStore } from 'contexts/ChatProvider';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

const optionFromModel = model => {
  return {
    label: model.label,
    value: model.name,
  };
};

const SessionConfig = ({ uuid }) => {
  const chatStore = useChatStore();
  const session = chatStore.actions.getChatSessionById(uuid);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [model, setModel] = useState({
    chatModel: session?.model ?? 'gpt-3.5-turbo',
    summarizeMode: session?.summarizeMode ?? false,
    contextCount: session?.maxLength ?? 4,
    temperature: session?.temperature ?? 1.0,
    maxTokens: session?.maxTokens ?? 2048,
    topP: session?.topP ?? 1.0,
    n: session?.n ?? 1,
    debug: session?.debug ?? false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchChatModel();
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const debouncedUpdate = debounce(updatedModel => {
    chatStore.updateChatSession(uuid, {
      maxLength: updatedModel.contextCount,
      temperature: updatedModel.temperature,
      maxTokens: updatedModel.maxTokens,
      topP: updatedModel.topP,
      n: updatedModel.n,
      debug: updatedModel.debug,
      model: updatedModel.chatModel,
      summarizeMode: updatedModel.summarizeMode,
    });
  }, 200);

  useEffect(() => {
    debouncedUpdate(model);
  }, [model]);

  const handleChange = (event, newValue) => {
    const { name, type, checked } = event.target;
    const value =
      newValue !== undefined
        ? newValue
        : type === 'checkbox'
          ? checked
          : event.target.value;
    setModel(prevModel => ({
      ...prevModel,
      [name]: value,
    }));
  };

  const chatModelOptions = data?.map(optionFromModel) ?? [];

  const tokenUpperLimit =
    data?.find(modelConfig => modelConfig.name === model.chatModel)?.maxToken ??
    1024 * 4;
  const defaultToken =
    data?.find(modelConfig => modelConfig.name === model.chatModel)
      ?.defaultToken ?? 2048;

  return (
    <Container>
      <form>
        <FormControl component="fieldset">
          <FormLabel component="legend">Chat Model</FormLabel>
          {isLoading ? (
            <CircularProgress size="medium" />
          ) : (
            <RadioGroup
              name="chatModel"
              value={model.chatModel}
              onChange={handleChange}
            >
              {chatModelOptions.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Summarize Mode</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={model.summarizeMode}
                onChange={handleChange}
                name="summarizeMode"
              />
            }
            label={model.summarizeMode ? 'Summarize Mode' : 'No Summarize Mode'}
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">
            Context Count: {model.contextCount}
          </FormLabel>
          <Slider
            name="contextCount"
            value={model.contextCount}
            onChange={handleChange}
            min={1}
            max={40}
            step={1}
            valueLabelDisplay="auto"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">
            Temperature: {model.temperature}
          </FormLabel>
          <Slider
            name="temperature"
            value={model.temperature}
            onChange={handleChange}
            min={0.1}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Top P: {model.topP}</FormLabel>
          <Slider
            name="topP"
            value={model.topP}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">
            Max Tokens: {model.maxTokens}
          </FormLabel>
          <Slider
            name="maxTokens"
            value={model.maxTokens}
            onChange={handleChange}
            min={256}
            max={tokenUpperLimit}
            step={16}
            valueLabelDisplay="auto"
            defaultValue={defaultToken}
          />
        </FormControl>

        {(model.chatModel.startsWith('gpt') ||
          model.chatModel.includes('davinci')) && (
          <FormControl component="fieldset">
            <FormLabel component="legend">N: {model.n}</FormLabel>
            <Slider
              name="n"
              value={model.n}
              onChange={handleChange}
              min={1}
              max={10}
              step={1}
              valueLabelDisplay="auto"
            />
          </FormControl>
        )}

        <FormControl component="fieldset">
          <FormLabel component="legend">Debug</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={model.debug}
                onChange={handleChange}
                name="debug"
              />
            }
            label={model.debug ? 'Enable Debug' : 'Disable Debug'}
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default SessionConfig;
