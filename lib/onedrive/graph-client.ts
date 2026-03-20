import { getGraphAccessToken } from './auth';

const GRAPH_API_BASE_URL = 'https://graph.microsoft.com/v1.0';

export interface GraphAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Microsoft Graph API client
 */
export class GraphClient {
  private accessToken: string | null = null;

  /**
   * Get authenticated access token
   */
  private async getToken(): Promise<string> {
    if (!this.accessToken) {
      this.accessToken = await getGraphAccessToken();
    }
    return this.accessToken;
  }

  /**
   * Make an authenticated request to Microsoft Graph API
   */
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<GraphAPIResponse<T>> {
    try {
      const token = await this.getToken();
      const url = endpoint.startsWith('http') ? endpoint : `${GRAPH_API_BASE_URL}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        return {
          success: false,
          error: `Graph API request failed: ${error}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Graph API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Upload a file to OneDrive
   */
  async uploadFile(
    path: string,
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<GraphAPIResponse> {
    try {
      const token = await this.getToken();

      // Encode the path properly for the Graph API
      const encodedPath = encodeURIComponent(path);
      const url = `${GRAPH_API_BASE_URL}/drive/root:/${path}:/content`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': mimeType,
        },
        body: fileBuffer,
      });

      if (!response.ok) {
        const error = await response.text();
        return {
          success: false,
          error: `Failed to upload file: ${error}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create a folder in OneDrive
   */
  async createFolder(parentPath: string, folderName: string): Promise<GraphAPIResponse> {
    const endpoint = `/drive/root:/${parentPath}:/children`;

    return this.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: folderName,
        folder: {},
        '@microsoft.graph.conflictBehavior': 'rename',
      }),
    });
  }

  /**
   * Check if a folder exists
   */
  async folderExists(path: string): Promise<boolean> {
    const endpoint = `/drive/root:/${path}`;
    const result = await this.request(endpoint);
    return result.success;
  }
}

// Export a singleton instance
export const graphClient = new GraphClient();
