provider aws {
  # For use in Lambda@Edge, it needs to be in this region
  region = "us-east-1"
}

locals {
  project_name = "moraesvic-homepage-2024"
}

module lambda_at_edge {
  source = "./modules/lambda-at-edge"
  project_name = local.project_name
}

module s3 {
  source = "./modules/s3"
  project_name = local.project_name
}

module cloudfront {
  source =  "./modules/cloudfront"
  project_name = local.project_name
  main_bucket = {
    id = module.s3.main_bucket.id
    arn = module.s3.main_bucket.arn
    regional_domain_name = module.s3.main_bucket.bucket_regional_domain_name
  }
  logs_bucket = {
    regional_domain_name = module.s3.logs_bucket.bucket_regional_domain_name
  }
  viewer_request_lambda = {
    qualified_arn = module.lambda_at_edge.lambda_at_edge.qualified_arn
  }
}
