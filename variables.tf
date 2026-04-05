variable "domain_name" {
  description = "Your primary domain name"
  type        = string
  default     = "dc.spacecomnet.in" 
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "dipakchavan" 
}

variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "ap-south-1" 
}
