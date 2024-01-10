import { describe, it, expect } from "@jest/globals";
import { CloudFrontRequest, CloudFrontResponse } from "../definitions";
import { RewriteRequest } from "../main";

describe("RewriteRequest function", () => {
  it("should not modify if argument is CloudFrontResponse", () => {
    const arg: CloudFrontResponse = { status: "401" };
    const res = RewriteRequest(arg);

    expect(res).toEqual(arg);
  });

  it('should not modify URI if it is "/"', () => {
    const arg = { uri: "/" } as CloudFrontRequest;
    const res = RewriteRequest(arg);

    expect(res).toEqual(arg);
  });

  it("should apply rewrites correctly", () => {
    const tests = [
      { input: "/a", expected: "/a/index.html" },
      { input: "/a/", expected: "/a/index.html" },
      { input: "/hello", expected: "/hello/index.html" },
      { input: "/hello/", expected: "/hello/index.html" },
      { input: "/a.css", expected: "/a.css" },
    ];

    tests.forEach(({ input, expected }) => {
      const arg = { uri: input } as CloudFrontRequest;
      const res = RewriteRequest(arg);
      expect(res).toEqual({ uri: expected });
    });
  });
});
