terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Configure a remote backend before running `terraform init` in a real
  # environment (S3 + DynamoDB lock table, or Terraform Cloud).
  # backend "s3" {
  #   bucket         = "tahirou-portfolio-tfstate"
  #   key            = "portfolio/terraform.tfstate"
  #   region         = "eu-west-3"
  #   dynamodb_table = "tahirou-portfolio-tflock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region
}

# ACM certificates for CloudFront must live in us-east-1, regardless of
# where the rest of the infrastructure is deployed.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
