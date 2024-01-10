type Header = { key?: string; value: string };

export type CloudFrontRequest = {
  clientIp: string;
  headers: Record<string, Header[]>;
  /** @example `GET`, `POST` etc. */
  method: string;
  querystring: string;
  uri: string;
};

/**
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-generating-http-responses-in-requests.html
 **/
export type CloudFrontResponse = {
  /** A number encoded as a string */
  status: string;
  /** @example `OK` */
  statusDescription?: string;
  /** header names must be in lowercase */
  headers?: Record<string, Header[]>;
  bodyEncoding?: "text" | "base64";
  body?: string;
};

type CloudFrontRecord = {
  cf: {
    config: {
      distributionDomainName: string;
      distributionId: string;
      /** @example `viewer-request` */
      eventType: string;
      requestId: string;
    };
    request: CloudFrontRequest;
  };
};
