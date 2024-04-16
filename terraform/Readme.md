# Auth0 Infrastructure

This IaC setups the local development and TST applications for the swim tracker in Auth0.

## To run terraform commands:

- export envs vars to shell by running `source ./terraform/scripts/export_envs.sh` from root dir
- then run terraform commands (e.g. `terraform plan`, `terraform apply`)

## Linting:

- Run `terraform fmt` to lint files

## Docs:

- [Auto-generated Resources](https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/generate_terraform_config)
- [Resources](https://registry.terraform.io/providers/auth0/auth0/latest/docs/resources/client)
- [Tutorial](https://developer.hashicorp.com/terraform/docs)
