import { CloudFrontRequest, CloudFrontResponse } from "./definitions";

export const RewriteURI = (uri: string): string => {
  if (uri === "/") {
    return uri;
  }

  if (uri.endsWith("/")) {
    return uri + "index.html";
  }

  if (!uri.split("/").at(-1)!.includes(".")) {
    return uri + "/index.html";
  }

  return uri;
};

const requestHasURI = (
  request: CloudFrontRequest | CloudFrontResponse
): request is CloudFrontRequest => (request as any).uri !== undefined;

/**
 * https://stackoverflow.com/a/50458087/17030712
 * https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/
 */
export const RewriteRequest = (
  request: CloudFrontRequest | CloudFrontResponse
): CloudFrontRequest | CloudFrontResponse => {
  if (!requestHasURI(request)) {
    return request;
  }

  const oldURI = request.uri;
  const newURI = RewriteURI(oldURI);

  console.log("Old URI: " + oldURI);
  console.log("New URI: " + newURI);

  /**
   * Replace the received URI with the URI that includes the index page.
   */
  return { ...request, uri: newURI };
};

export const handler = RewriteRequest;
