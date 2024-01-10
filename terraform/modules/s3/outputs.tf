output main_bucket {
	value = aws_s3_bucket.main_bucket
}

output logs_bucket {
	value = aws_s3_bucket.cloudfront_logs_bucket
}