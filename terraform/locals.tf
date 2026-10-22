locals {
  bucket_name = var.bucket_name != "" ? var.bucket_name : "${var.project_name}-site"

  has_custom_domain = var.domain_name != ""
  manage_dns        = local.has_custom_domain && var.route53_zone_id != ""
  create_cert       = local.has_custom_domain && var.acm_certificate_arn == ""

  domain_aliases = local.has_custom_domain ? concat([var.domain_name], var.alternate_domain_names) : []

  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    },
    var.tags,
  )
}
