import { env } from "@/config/env";
import { getPixelById } from "@/domain/pixel/getPixelById";
import { SerializedPixelMapper } from "@/infrastructure/pixel/SerializedPixelMapper";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";
import { GetServerSideProps } from "next";

type Debug = {
  debug: string;
};

const PixelPage = ({ debug }: Debug) => {
  return <>{debug}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pixelId = context.params?.id;

  if (!pixelId || typeof pixelId !== "string") {
    //  return {
    //    notFound: true,
    //  };
    return {
      props: {
        debug: "No pixel id",
      },
    };
  }

  const token = context.req.cookies["auth"] ?? "";

  const pixel = await getPixelById(pixelId, token);

  if (typeof pixel === "string") {
    // return {
    //   notFound: true,
    // };

    return {
      props: {
        debug: `No Pixel |  ${pixelId} | ${pixel}`,
      },
    };
  }

  const serializedPixel = SerializedPixelMapper.toSerialized(pixel);

  const res = context.res;
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<img src="${env.NEXT_PUBLIC_API_BASE_URL}/pixels/${serializedPixel.id}?forCopying=true"></img>`,
  );
  res.end();

  return {
    props: { debug: "Ok!" },
  };
};

export default pageWithAuthRequired(PixelPage);
