export class Snowflake {
  static readonly epoch = BigInt(1420070400000);

  static toTimestamp(snowflake: string): string {
    const id = BigInt(snowflake);
    return String((id >> BigInt(22)) + this.epoch);
  }
}
