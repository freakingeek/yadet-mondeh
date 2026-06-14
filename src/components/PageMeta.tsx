import { Link, Meta, Title } from "@solidjs/meta";

export const SITE_NAME = "یادت مونده؟";
export const SITE_URL = "https://dpzkbmtxuf.lexoyacloud.ir";
const DEFAULT_OG_IMAGE_PATH = "/images/mental-health.png";

type PageMetaProps = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  image?: string;
};

const toAbsoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export default function PageMeta(props: PageMetaProps) {
  const url = () => (props.path ? toAbsoluteUrl(props.path) : undefined);
  const image = () => toAbsoluteUrl(props.image ?? DEFAULT_OG_IMAGE_PATH);
  const fullTitle = () => `${props.title} | ${SITE_NAME}`;
  const robots = () => (props.noindex ? "noindex, nofollow" : "index, follow");

  return (
    <>
      <Title>{fullTitle()}</Title>
      <Meta name="description" content={props.description} />
      <Meta name="robots" content={robots()} />
      <Meta property="og:type" content="website" />
      <Meta property="og:locale" content="fa_IR" />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta property="og:title" content={fullTitle()} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:image" content={image()} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={fullTitle()} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={image()} />
      {url() && <Meta property="og:url" content={url()} />}
      {url() && <Link rel="canonical" href={url()} />}
    </>
  );
}
