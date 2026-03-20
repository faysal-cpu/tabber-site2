/**
 * Microsoft Graph API OAuth 2.0 authentication
 */

export interface GraphTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Get Microsoft Graph API access token using client credentials flow
 */
export async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Missing Microsoft Graph API credentials');
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get access token: ${error}`);
    }

    const data: GraphTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Microsoft Graph authentication error:', error);
    throw new Error('Failed to authenticate with Microsoft Graph API');
  }
}
