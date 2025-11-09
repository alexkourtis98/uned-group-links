/**
 * Vercel Serverless Function to Update Cards Data
 *
 * This function:
 * 1. Receives card data from the admin panel
 * 2. Authenticates the request
 * 3. Updates the REACT_APP_CARDS_DATA environment variable in Vercel
 * 4. Triggers a new deployment
 * 5. Returns the deployment status
 */

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { cards, adminSecret } = req.body;

        // Validate admin secret
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Validate cards data
        if (!cards || !Array.isArray(cards)) {
            return res.status(400).json({ error: 'Invalid cards data' });
        }

        const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
        const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
        const TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional - for team accounts

        if (!VERCEL_TOKEN || !PROJECT_ID) {
            return res.status(500).json({
                error: 'Server configuration error: Missing VERCEL_TOKEN or VERCEL_PROJECT_ID'
            });
        }

        // Step 1: Update environment variable
        const cardsData = JSON.stringify(cards);

        const envUpdateUrl = TEAM_ID
            ? `https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`
            : `https://api.vercel.com/v10/projects/${PROJECT_ID}/env`;

        // First, check if the env variable exists
        const checkResponse = await fetch(envUpdateUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const existingEnvVars = await checkResponse.json();
        const existingVar = existingEnvVars.envs?.find(env => env.key === 'REACT_APP_CARDS_DATA');

        if (existingVar) {
            // Update existing environment variable
            const updateUrl = TEAM_ID
                ? `https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${existingVar.id}?teamId=${TEAM_ID}`
                : `https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${existingVar.id}`;

            const updateResponse = await fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${VERCEL_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: cardsData
                })
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(`Failed to update env variable: ${JSON.stringify(errorData)}`);
            }
        } else {
            // Create new environment variable
            const createResponse = await fetch(envUpdateUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VERCEL_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: 'REACT_APP_CARDS_DATA',
                    value: cardsData,
                    type: 'plain',
                    target: ['production', 'preview', 'development']
                })
            });

            if (!createResponse.ok) {
                const errorData = await createResponse.json();
                throw new Error(`Failed to create env variable: ${JSON.stringify(errorData)}`);
            }
        }

        // Step 2: Trigger a new deployment
        const deployUrl = TEAM_ID
            ? `https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`
            : `https://api.vercel.com/v13/deployments`;

        const deployResponse = await fetch(deployUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: process.env.VERCEL_PROJECT_NAME || 'uned-group-links',
                project: PROJECT_ID,
                target: 'production',
                gitSource: {
                    type: 'github',
                    ref: process.env.VERCEL_GIT_COMMIT_REF || 'main'
                }
            })
        });

        if (!deployResponse.ok) {
            const errorData = await deployResponse.json();
            console.error('Deployment error:', errorData);
            // Don't fail completely - env var was updated
            return res.status(200).json({
                success: true,
                message: 'Environment variable updated, but deployment trigger failed. Changes will apply on next deployment.',
                envUpdated: true,
                deploymentTriggered: false
            });
        }

        const deploymentData = await deployResponse.json();

        return res.status(200).json({
            success: true,
            message: 'Cards updated successfully. Deployment in progress...',
            envUpdated: true,
            deploymentTriggered: true,
            deploymentId: deploymentData.id,
            deploymentUrl: deploymentData.url
        });

    } catch (error) {
        console.error('Error updating cards:', error);
        return res.status(500).json({
            error: 'Failed to update cards',
            details: error.message
        });
    }
};
