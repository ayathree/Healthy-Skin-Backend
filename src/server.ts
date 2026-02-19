import app from "./app";
import { envVars } from "./app/config/env";

const bootstrap = () => {
    try {
        app.listen(envVars.PORT, () => {
            console.log(`HealthySkin Server is running on http://localhost:${envVars.PORT}`);
        });


    } catch (error) {
        console.log("failed to start server:", error)
    }
}

bootstrap();