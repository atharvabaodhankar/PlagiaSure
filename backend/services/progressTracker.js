// Progress tracking service for real-time updates
class ProgressTracker {
  constructor() {
    this.clients = new Map(); // reportId -> Set of response objects
    this.progress = new Map(); // reportId -> progress data
  }

  // Register a client for progress updates
  addClient(reportId, res) {
    if (!this.clients.has(reportId)) {
      this.clients.set(reportId, new Set());
    }
    this.clients.get(reportId).add(res);

    // Send initial progress
    this.sendProgress(reportId, {
      stage: 'initializing',
      progress: 0,
      message: 'Starting analysis...',
      timestamp: new Date().toISOString()
    });
  }

  // Remove a client
  removeClient(reportId, res) {
    if (this.clients.has(reportId)) {
      this.clients.get(reportId).delete(res);
      if (this.clients.get(reportId).size === 0) {
        this.clients.delete(reportId);
        this.progress.delete(reportId);
      }
    }
  }

  // Update progress for a report
  updateProgress(reportId, data) {
    const progressData = {
      ...data,
      timestamp: new Date().toISOString()
    };

    this.progress.set(reportId, progressData);
    this.sendProgress(reportId, progressData);
  }

  // Send progress to all connected clients
  sendProgress(reportId, data) {
    if (!this.clients.has(reportId)) return;

    const clients = this.clients.get(reportId);
    const message = `data: ${JSON.stringify(data)}\n\n`;

    clients.forEach(client => {
      try {
        client.write(message);
      } catch (error) {
        console.error('Error sending progress update:', error);
        this.removeClient(reportId, client);
      }
    });
  }

  // Get current progress for a report
  getProgress(reportId) {
    return this.progress.get(reportId) || {
      stage: 'unknown',
      progress: 0,
      message: 'No progress data available'
    };
  }

  // Mark analysis as complete
  complete(reportId, finalData) {
    this.updateProgress(reportId, {
      stage: 'completed',
      progress: 100,
      message: 'Analysis completed successfully',
      ...finalData
    });

    // Clean up after a short delay
    setTimeout(() => {
      if (this.clients.has(reportId)) {
        this.clients.get(reportId).forEach(client => {
          try {
            client.end();
          } catch (error) {
            console.error('Error closing client connection:', error);
          }
        });
        this.clients.delete(reportId);
      }
      this.progress.delete(reportId);
    }, 5000);
  }

  // Mark analysis as failed
  fail(reportId, error) {
    this.updateProgress(reportId, {
      stage: 'failed',
      progress: 0,
      message: error.message || 'Analysis failed',
      error: true
    });

    // Clean up after a short delay
    setTimeout(() => {
      if (this.clients.has(reportId)) {
        this.clients.get(reportId).forEach(client => {
          try {
            client.end();
          } catch (error) {
            console.error('Error closing client connection:', error);
          }
        });
        this.clients.delete(reportId);
      }
      this.progress.delete(reportId);
    }, 5000);
  }
}

// Singleton instance
const progressTracker = new ProgressTracker();

export default progressTracker;
