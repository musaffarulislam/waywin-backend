import { TrainerRepositoryImpl } from "../../interfaces/persistence/trainer.repository.impl";
import { TagRepositoryImpl } from "../../interfaces/persistence/tag.repository.impl";

const trainerRepository = new TrainerRepositoryImpl()
const tagRepository = new TagRepositoryImpl()

export {
  trainerRepository,
  tagRepository
}