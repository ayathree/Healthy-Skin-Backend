import app from "./app";

const bootstrap = () => {
    try {
        app.listen(3000, () => {
            console.log(`HealthySkin Server is running on http://localhost:3000`);
        });


    } catch (error) {
        console.log("failed to start server:", error)
    }
}

bootstrap();