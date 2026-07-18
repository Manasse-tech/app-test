terraform { required_version = ">= 1.7.0" }
provider "aws" { region = "eu-west-1" }
resource "aws_vpc" "primary" {
  cidr_block = "10.100.0.0/16"
  tags = { Environment = "production", Project = "NSUG" }
}
