import FileCopyIcon from '@mui/icons-material/FileCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
// import { RCButton } from 'components/index';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, hasCopied: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  handleCopyErrorDetails = async () => {
    try {
      await navigator.clipboard.writeText(this.state.error.stack);
      this.setState({ hasCopied: true });
      setTimeout(() => this.setState({ hasCopied: false }), 2000); // Reset copy status after 2 seconds
    } catch (error) {
      console.error('Failed to copy error details:', error);
    }
  };

  render() {
    if (this.state.hasError) {
      const { error, hasCopied } = this.state;
      return (
        <Container component="main" maxWidth="sm">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              An unexpected error has occurred. Our team has been notified.
            </Typography>
            <Box
              marginTop={2}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              border={'1px solid #f44336'}
            >
              <Typography
                variant="h6"
                color="textPrimary"
                fontWeight="bold"
                gutterBottom
              >
                Error: {error.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {error.message}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {error.stack}
              </Typography>
            </Box>
            <Box marginTop={2} display={'flex'} flexDirection={'row'}>
              <Button
                startIcon={<RefreshIcon />}
                color="success"
                size="small"
                variant="holo"
                withContainer={false}
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
              <Button
                startIcon={<FileCopyIcon />}
                color="error"
                onClick={this.handleCopyErrorDetails}
                style={{ marginLeft: '10px' }}
              >
                {hasCopied ? 'Copied' : 'Copy Error'}
              </Button>
              {/* <RCButton
                startIcon={<RefreshIcon />}
                color="success"
                size="small"
                variant="holo"
                withContainer={false}
                onClick={() => window.location.reload()}
              >
                Refresh
              </RCButton>
              <RCButton
                startIcon={<FileCopyIcon />}
                color="error"
                onClick={this.handleCopyErrorDetails}
                style={{ marginLeft: '10px' }}
              >
                {hasCopied ? 'Copied' : 'Copy Error'}
              </RCButton> */}
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
