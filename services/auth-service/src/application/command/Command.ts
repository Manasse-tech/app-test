export abstract class Command {
  abstract readonly commandType: string;
}

export interface ICommandHandler<T extends Command> {
  execute(command: T): Promise<void>;
}

export interface ICommandBus {
  execute<T extends Command>(command: T): Promise<void>;
}
