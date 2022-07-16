export class Storage<T> {
  private data!: T;

  public set(data: T): void {
    this.data = data;
  }

  public get(): T {
    return this.data;
  }
}
