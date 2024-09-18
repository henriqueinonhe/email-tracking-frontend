import { env } from "@/config/env";
import { getPixelById } from "@/domain/pixel/getPixelById";
import { SerializedPixelMapper } from "@/infrastructure/pixel/SerializedPixelMapper";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";
import { GetServerSideProps } from "next";

const PixelPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pixelId = context.params?.id;

  if (!pixelId || typeof pixelId !== "string") {
    return {
      notFound: true,
    };
  }

  console.log(context.req.cookies);

  const token = context.req.cookies["auth"] ?? "";

  const pixel = await getPixelById(pixelId, token);

  if (typeof pixel === "string") {
    return {
      notFound: true,
    };
  }

  const serializedPixel = SerializedPixelMapper.toSerialized(pixel);

  const res = context.res;
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<img src="${env.NEXT_PUBLIC_API_BASE_URL}/pixels/${serializedPixel.id}"></img>`,
  );
  res.end();

  return {
    props: {},
  };
};

export default pageWithAuthRequired(PixelPage);
