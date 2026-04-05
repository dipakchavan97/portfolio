output "step_1_add_to_hostinger_for_ssl" {
  description = "Add these CNAME records to Hostinger to validate your SSL certificate. Terraform will pause until this is done."
  value = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      target = dvo.resource_record_value
    }
  }
}

output "step_2_add_to_hostinger_for_traffic" {
  description = "Once Terraform finishes, point your Hostinger domain (dc and www.dc) to this CloudFront URL."
  value       = aws_cloudfront_distribution.portfolio_cdn.domain_name
}
