/**
 * Task symbols.
 */
export interface TaskSymbols {
    /**
     * IBuilder.
     */
    IBuilder: symbol;

    /**
     * ITaskRunner.
     */
    ITaskRunner: symbol;
    /**
     * ITaskContext.
     */
    ITaskContext: symbol;
    /**
     * TaskContainer
     */
    TaskContainer: symbol;

    /**
     * ExecFile
     */
    ExecFile: symbol;

    /**
     * ExecShell
     */
    ExecShell: symbol;


    /**
     * PipeTask
     */
    PipeTask: symbol;

}


/**
 * Task symbols.
 */
export const TaskSymbols:TaskSymbols = {
    /**
     * IBuilder.
     */
    IBuilder: Symbol('IBuilder'),

    /**
     * ITaskRunner.
     */
    ITaskRunner: Symbol('ITaskRunner'),
    /**
     * ITaskContext.
     */
    ITaskContext: Symbol('ITaskContext'),
    /**
     * TaskContainer
     */
    TaskContainer: Symbol('TaskContainer'),

    /**
     * ExecFile
     */
    ExecFile: Symbol('ExecFile'),

    /**
     * ExecShell
     */
    ExecShell: Symbol('ExecShell'),


    /**
     * PipeTask
     */
    PipeTask: Symbol('PipeTask')

}

export const taskSymbols = TaskSymbols;

