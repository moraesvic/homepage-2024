resource aws_s3_bucket main {
  bucket = var.project_name_qualified

  tags = {
    project = var.project_name
  }
}

resource aws_s3_bucket cloudfront_logs {
  bucket = "${var.project_name_qualified}-logs"

  tags = {
    project = var.project_name
  }
}

# It is required to turn on ACL access to have logs:
# https://stackoverflow.com/a/76417890/17030712

resource aws_s3_bucket_ownership_controls cloudfront_logs {
  bucket = aws_s3_bucket.cloudfront_logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource aws_s3_bucket_acl cloudfront_logs {
  depends_on = [ aws_s3_bucket_ownership_controls.cloudfront_logs ]

  bucket = aws_s3_bucket.cloudfront_logs.id
  acl    = "private"
}

resource aws_s3_bucket_versioning bucket_versioning {
  bucket = aws_s3_bucket.main.id
  versioning_configuration {
    status = "Enabled"
  }
}

# https://stackoverflow.com/questions/76170291/how-do-i-specify-multiple-content-types-to-my-s3-object-using-terraform
# https://stackoverflow.com/questions/18296875/amazon-s3-downloads-index-html-instead-of-serving

locals {
  # https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  content_type_map = {
   "css"  = "text/css"
   "gif"  = "image/gif"
   "gz"   = "application/gzip"
   "html" = "text/html"
   "jpeg" = "image/jpeg"
   "jpg"  = "image/jpeg"
   "js"   = "text/javascript"
   "json" = "application/json"
   "mp3"  = "audio/mpeg"
   "mp4"  = "video/mp4"
   "mpeg" = "video/mpeg"
   "pdf"  = "application/pdf"
   "png"  = "image/png"
   "tar"  = "application/x-tar"
   "ttf"  = "font/ttf"
   "txt"  = "text/plain"
   "wav"  = "audio/wav"
   "webp" = "image/webp"
   "woff" = "font/woff"
   "zip"  = "application/zip"
  }

  default_content_type = "application/octet-stream"
}

