declare module "bun" {
    interface Env {
        PORT: number,
        DB_HOST: string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_NAME: string,
        SECRET_KEY: string,
        WATSON_APIKEY: string,
        WATSON_AI_PROJECT: string,
        WATSON_AI_URL: string
    }
}