const {runCli} = require('./runCommand');

import {sentry, sentryConfig} from 'config/config';

export const sentrySettingRun = async () => {
    try {
        const releaseName = sentry.release;
        const environment = sentry.environment;

        await runCli(`sentry-cli releases --org ${sentryConfig.org} deploys ${releaseName} new -e ${environment} `)
        await runCli(`sentry-cli releases --org ${sentryConfig.org} set-commits ${releaseName} --auto `)
    } catch (error) {
        console.log(error);
    }
};

