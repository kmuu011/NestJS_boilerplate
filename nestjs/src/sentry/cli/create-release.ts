const {runCli} = require('./runCommand');

import {sentry, sentryConfig} from 'config/config';

export const sentrySettingRun = async () => {
    try {
        const releaseName = sentry.release;
        const environment = sentry.environment;
        // let version = await runCli('sentry-cli releases propose-version');
        // version = version.substring(0, version.indexOf('\n'));

        await runCli(`sentry-cli releases new -p ${sentryConfig.project} ${releaseName} --org ${sentryConfig.org}`)

        await runCli(`sentry-cli releases --org ${sentryConfig.org} deploys ${releaseName} new -e ${environment} `);
        await runCli(`sentry-cli releases --org ${sentryConfig.org} set-commits ${releaseName} --auto `);

    } catch (error) {
        console.log(error);
    }
};

