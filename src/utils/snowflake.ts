export class Snowflake {
  static readonly epoch = BigInt(1420070400000);

  static toTimestamp(snowflake: string): bigint {
    const id = BigInt(snowflake);
    return (id >> BigInt(22)) + this.epoch;
  }
}
