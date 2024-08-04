/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "thothica-web",
            removal: input?.stage === "production" ? "retain" : "remove",
            home: "aws",
        };
    },
    async run() {
        new sst.aws.Nextjs("WebApp", {
            transform: {
                server: {
                    timeout: "60 seconds",
                    logging: {
                        retention: "3 days",
                        format: "text"
                    }
                }
            }
        });
    },
});
