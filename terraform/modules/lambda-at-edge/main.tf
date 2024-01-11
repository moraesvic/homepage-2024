# Please note that upon `terraform destroy`, you are likely to raise this error:
#
#    Error: deleting Lambda Function (redirect_to_index_html): operation error
#    Lambda: DeleteFunction, https response error StatusCode: 400, RequestID:
#    [...], InvalidParameterValueException: Lambda was unable to delete
#    arn:aws:lambda:us-east-1:[...] because it is a replicated function.
#    Please see our documentation for Deleting Lambda@Edge Functions and Replicas.
#
# This is a known AWS issue and there is no workaround. Some time after the CloudFront
# distribution is dissociated from the function (possibly 1-2 hours), the replicas should
# go away. Until then, you have to keep trying `terraform destroy`.
#
# https://stackoverflow.com/questions/45296923/cannot-delete-aws-lambdaedge-replicas
# https://stackoverflow.com/a/52870580/17030712
# https://advancedweb.hu/how-to-use-lambda-edge-with-terraform/

locals {
	function_name = "redirect_to_index_html"
	lambda_source_file = "../lambda-at-edge/dist/main.mjs"
}

data aws_iam_policy_document assume_role {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["edgelambda.amazonaws.com", "lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource aws_iam_role iam_for_lambda {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json

  tags = {
    project = var.project_name
  }
}

resource aws_cloudwatch_log_group lambda_log_group {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = 0

  tags = {
    project = var.project_name
  }
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
data aws_iam_policy_document lambda_logging {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource aws_iam_policy lambda_logging {
  name        = "lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_logging.json

  tags = {
    project = var.project_name
  }
}

resource aws_iam_role_policy_attachment lambda_logs {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

data archive_file lambda {
  type        = "zip"
  source_file = local.lambda_source_file
  output_path = "payload.zip"
}

resource aws_lambda_function redirect_to_index_html {
  function_name = local.function_name
  runtime = "nodejs20.x"

  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "payload.zip"
  handler       = "main.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256

  role          = aws_iam_role.iam_for_lambda.arn

  publish = true

  tags = {
    project = var.project_name
  }
}