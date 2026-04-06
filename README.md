# AWS Serverless DevOps Portfolio

This repository contains the source code and Infrastructure as Code (IaC) for my personal DevOps portfolio, hosted securely on AWS. The project demonstrates modern cloud engineering principles, including serverless architecture, strict security compliance, and fully automated continuous deployment (CI/CD).

🌍 **Live Site:** [https://dc.spacecomnet.in](https://dc.spacecomnet.in)

## 🏗️ Architecture & Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Cloud Provider:** Amazon Web Services (AWS)
* **Infrastructure as Code (IaC):** Terraform
* **CI/CD Pipeline:** GitHub Actions
* **DNS Management:** Hostinger

## ☁️ AWS Infrastructure Details

The infrastructure is provisioned 100% via Terraform and utilizes the following AWS services:

* **Amazon S3:** Stores the static frontend assets. The bucket is strictly private with `Block Public Access` fully enabled.
* **Amazon CloudFront:** Acts as the global Content Delivery Network (CDN) to ensure low-latency loading times. It securely accesses the private S3 bucket using **Origin Access Control (OAC)**, adhering to current AWS security best practices.
* **AWS Certificate Manager (ACM):** Provisions a free public SSL/TLS certificate (in `us-east-1`) attached to the CloudFront distribution to enforce HTTPS encryption.

## 📂 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD pipeline
├── index.html               # Main portfolio layout
├── resume.pdf               # Downloadable resume
├── main.tf                  # Terraform configuration for AWS resources
├── variables.tf             # Terraform variables (Domain, Bucket Name, Region)
└── outputs.tf               # Terraform outputs for DNS routing
