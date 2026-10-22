variable "aws_region" {
  description = "AWS region for the S3 bucket."
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Short name used to prefix resources."
  type        = string
  default     = "tahirou-portfolio"
}

variable "environment" {
  description = "Deployment environment tag."
  type        = string
  default     = "production"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name hosting the built site. Defaults to project_name if not set."
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Custom domain for the site (e.g. tahirou.dev). Leave empty to use the default CloudFront domain only."
  type        = string
  default     = ""
}

variable "alternate_domain_names" {
  description = "Additional domain aliases for CloudFront (e.g. www subdomain)."
  type        = list(string)
  default     = []
}

variable "acm_certificate_arn" {
  description = "Existing ACM certificate ARN (us-east-1) to use for the custom domain. If empty and domain_name is set, one will be created and must be validated via DNS."
  type        = string
  default     = ""
}

variable "route53_zone_id" {
  description = "Hosted zone ID for domain_name, used for ACM DNS validation and the alias record. Leave empty to skip Route53 management."
  type        = string
  default     = ""
}

variable "price_class" {
  description = "CloudFront price class."
  type        = string
  default     = "PriceClass_100"
}

variable "default_root_object" {
  description = "Default object served at the distribution root."
  type        = string
  default     = "index.html"
}

variable "tags" {
  description = "Common tags applied to all resources."
  type        = map(string)
  default     = {}
}
