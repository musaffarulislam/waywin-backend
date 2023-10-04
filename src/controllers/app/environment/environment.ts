import * as dotenv from "dotenv";
dotenv.config();

const environment_name: string = process.env.Environment;
const PORT: number = Number(process.env.PORT);
const DB_PREFIX: string = process.env.DB_NAME;

enum Environments {
    local_environment = "local",
    dev_environment = "dev",
    prod_environment = "prod",
    qa_environment = "qa",
}

class Environment {
    private environment: string;

    private portOffsets: { [key: string]: number } = {
        [Environments.prod_environment]: 1,
        [Environments.dev_environment]: 2,
        [Environments.qa_environment]: 3,
    };

    private dbNames: { [key: string]: string } = {
        [Environments.prod_environment]: `${DB_PREFIX}prod`,
        [Environments.dev_environment]: `${DB_PREFIX}dev`,
        [Environments.qa_environment]: `${DB_PREFIX}qa`,
        [Environments.local_environment]: `${DB_PREFIX}local`,
    };

    constructor(environment: string) {
        this.environment = environment
    }

    getPort(): number {
        const portOffset = this.portOffsets[this.environment] || 0;
        return PORT + portOffset;
    }

    getDBName(): string {
        return this.dbNames[this.environment] || `${DB_PREFIX}local`;
    }
}

export default new Environment(environment_name)