export declare type ExitHandler = () => void | PromiseLike<void>;
export declare function bindOnExitHandler(handler: ExitHandler, unshift?: boolean): void;
export declare function unbindOnExitHandler(handler: ExitHandler): void;
export declare function exitGracefully(exitCode: number): void;
export declare function enableExitTimeout(): void;
export declare function disableExitTimeout(): void;
