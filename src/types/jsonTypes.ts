export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = (JsonValue | undefined)[];
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;
