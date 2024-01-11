locals {
	s3_origin_id = "s3_origin"
}

resource aws_cloudfront_origin_access_control cf_oac {
  name = "moraesvic_cf_origin_access_control"
  description = "moraesvic CF Origin Access Control"
  origin_access_control_origin_type = "s3"
  signing_behavior = "always"
  signing_protocol = "sigv4"
}

resource aws_cloudfront_distribution s3_distribution {
  origin {
    domain_name              = var.main_bucket.regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cf_oac.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "moraesvic homepage"
  default_root_object = "index.html"

  aliases = [
    "moraesvic.com",
    "www.moraesvic.com",
  ]

  price_class = "PriceClass_All"

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:063005315572:certificate/64587017-6bec-4acb-8a30-896b986e5321"
    ssl_support_method = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 360
    max_ttl                = 3600

    lambda_function_association {
      event_type = "viewer-request"
      lambda_arn = var.viewer_request_lambda.qualified_arn
      include_body = false
    }
  }

  custom_error_response {
    error_code = 404
    response_code = 404
    response_page_path = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

logging_config {
    include_cookies = false
    bucket          = var.logs_bucket.regional_domain_name
    prefix          = "logs"
  }

  tags = {
    project = var.project_name
  }
}

data aws_iam_policy_document allow_cloudfront_to_access_bucket {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:ListBucket",
      "s3:GetObject"
    ]

    resources = [
      var.main_bucket.arn,
      "${var.main_bucket.arn}/*"
    ]

    condition {
      test = "StringEquals"
      variable = "AWS:SourceArn"
      values = [
        aws_cloudfront_distribution.s3_distribution.arn
      ]
    }
  }
}

resource aws_s3_bucket_policy allow_cloudfront_to_access_bucket {
  bucket = var.main_bucket.id
  policy = data.aws_iam_policy_document.allow_cloudfront_to_access_bucket.json
}