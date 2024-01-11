variable project_name {
	description = "Name of the project"
	type = string
}

variable main_bucket {
	description = "Attributes of the S3 bucket to be used as origin"
	type = object({
		regional_domain_name = string
		id = string
		arn = string
	})
}

variable logs_bucket {
	description = "Attributes of the S3 bucket to be used as destination for the logs"
	type = object({
		regional_domain_name = string
	})
}

variable viewer_request_lambda {
	description = "Attributes of the Lambda@Edge function to be trigger upon viewer request"
	type = object({
	  qualified_arn = string
	})
}