import * as dotenv from "dotenv";
dotenv.config();

const environment_name: string = process.env.Environment;
const PORT: number = Number(process.env.PORT);

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


    constructor(environment: string) {
        this.environment = environment
    }

    getPort(): number {
        const portOffset = this.portOffsets[this.environment] || 0;
        return PORT + portOffset;
    }

}

export default new Environment(environment_name)