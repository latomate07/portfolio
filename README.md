# Tahirou LAOUAN MAGAGI — Portfolio

Personal portfolio site, built with **React + TypeScript + Tailwind CSS (v4)**, available in **French and English** (react-i18next). Infrastructure is deployed on **AWS S3 + CloudFront** with **Terraform**, and shipped through **GitHub Actions** CI/CD.

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `react-i18next` for EN/FR localization (auto-detected, switchable in the UI)
- Terraform for AWS infrastructure (S3 + CloudFront, OAC, optional custom domain/ACM/Route53)
- GitHub Actions for CI (lint/typecheck/build + terraform validate) and CD (deploy)

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint        # oxlint
npm run typecheck   # tsc -b
npm run build        # production build to dist/
```

## Project structure

```
src/
  components/      Hero, Skills, Contact, LanguageSwitcher, icons/
  i18n/            i18next setup + locales/en.json, locales/fr.json
terraform/         S3 + CloudFront + (optional) ACM/Route53
.github/workflows/ ci.yml, cd.yml, terraform.yml
```

## Infrastructure (Terraform)

The `terraform/` stack provisions:

- A **private S3 bucket** (versioned, encrypted, no public access) holding the built site.
- A **CloudFront distribution** reading from S3 through an **Origin Access Control** (no public bucket policy needed).
- SPA-friendly 403/404 → `index.html` rewrites.
- Optional custom domain support: ACM certificate (issued + DNS-validated) and Route53 alias record, only created when `domain_name` / `route53_zone_id` are set.

### First-time setup

1. **Remote state backend** (recommended before using CI): create an S3 bucket + DynamoDB lock table for Terraform state, then uncomment and fill in the `backend "s3"` block in `terraform/versions.tf`.
2. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars` and adjust (bucket name must be globally unique).
3. Run locally once to bootstrap:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```
4. Note the outputs: `bucket_name`, `cloudfront_distribution_id`, `cloudfront_domain_name`.

## CI/CD (GitHub Actions)

### `ci.yml`
Runs on every PR/push to `main`: lint, typecheck, build the app, and `terraform fmt`/`validate` the infra code.

### `terraform.yml`
Runs `terraform plan` on PRs touching `terraform/**`, and `terraform apply` on pushes to `main` (gated behind the `production` [GitHub Environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) for manual approval if configured).

### `cd.yml`
Builds the app and deploys `dist/` to S3, then invalidates the CloudFront cache, on every push to `main` (excluding Terraform-only changes).

### Required GitHub configuration

Both AWS-touching workflows authenticate via **OIDC** (no long-lived AWS keys). In your AWS account:

1. Create an IAM OIDC identity provider for `token.actions.githubusercontent.com` (skip if one already exists).
2. Create two IAM roles trusting that provider, scoped to this repo (`repo:<org>/<repo>:ref:refs/heads/main`):
   - **Deploy role** — permissions: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on the site bucket, and `cloudfront:CreateInvalidation` on the distribution.
   - **Terraform role** — broader permissions to manage S3, CloudFront, ACM, Route53, and the Terraform state backend.

Then set, in the repo's `production` environment (Settings → Environments):

| Type | Name | Example |
| --- | --- | --- |
| Secret | `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/portfolio-deploy` |
| Secret | `AWS_TERRAFORM_ROLE_ARN` | `arn:aws:iam::123456789012:role/portfolio-terraform` |
| Variable | `AWS_REGION` | `eu-west-3` |
| Variable | `S3_BUCKET_NAME` | `tahirou-portfolio-site` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` | `E1A2B3C4D5E6F7` |

## i18n

Translations live in `src/i18n/locales/{en,fr}.json`. Language is auto-detected from the browser and persisted in `localStorage`; users can override it with the EN/FR switcher in the top-right corner.
