const {runCli} = require('./runCommand');

import {sentry, sentryConfig} from 'config/config';

export const sentrySettingRun = async () => {
    try {
        const releaseName = sentry.release;
        const environment = sentry.environment;

        await runCli(`sentry-cli releases new -p ${sentryConfig.project} ${releaseName} --org ${sentryConfig.org} --auth-token ${sentryConfig.token}`);

        await runCli(`sentry-cli releases --org ${sentryConfig.org} deploys ${releaseName} new -e ${environment} --auth-token ${sentryConfig.token}`);
        await runCli(`sentry-cli releases --org ${sentryConfig.org} set-commits ${releaseName} --auto --auth-token ${sentryConfig.token}`);
    } catch (error) {
        console.log(error);
    }
};

