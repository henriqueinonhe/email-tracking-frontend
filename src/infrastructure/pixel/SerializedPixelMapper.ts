import { Pixel } from "@/domain/pixel/Pixel";
import { SerializedPixel } from "./SerializedPixel";

export const SerializedPixelMapper = {
  toSerialized: (pixel: Pixel): SerializedPixel => {
    return {
      id: pixel.id,
      recipient: pixel.recipient,
      identifier: pixel.identifier,
      createdAt: pixel.createdAt.toISOString(),
    };
  },
  fromSerialized: (serializedPixel: SerializedPixel): Pixel => {
    return {
      id: serializedPixel.id,
      recipient: serializedPixel.recipient,
      identifier: serializedPixel.identifier,
      createdAt: new Date(serializedPixel.createdAt),
    };
  },
};
