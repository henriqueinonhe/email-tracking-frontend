import { Pixel } from "@/domain/pixel/Pixel";
import { Override } from "@henriqueinonhe/type-utils";

export type SerializedPixel = Override<
  Pixel,
  {
    createdAt: string;
  }
>;
