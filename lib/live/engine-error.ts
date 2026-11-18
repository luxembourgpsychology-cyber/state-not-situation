export class EngineError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "invalid_action") {
    super(message);
    this.name = "EngineError";
    this.status = status;
    this.code = code;
  }
}
