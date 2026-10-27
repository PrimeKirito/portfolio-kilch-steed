# Security notes

## Current hosting boundary

The portfolio is a static GitHub Pages project on `primekirito.github.io`. The connected Cloudflare account has no zone for that hostname. The Web Analytics beacon measures browser-side traffic; it does not proxy or firewall requests to GitHub Pages.

A real Cloudflare WAF cannot be enabled by adding HTML or JavaScript to this repository. Cloudflare WAF and edge DDoS controls require the visitor hostname to be served through a Cloudflare zone/proxy. GitHub Pages' `github.io` hostname is managed by GitHub, so this repository cannot point its DNS records at Cloudflare.

To add an edge firewall, use a domain name you control, attach it as a custom domain to GitHub Pages, add that zone to Cloudflare and proxy traffic through Cloudflare. Then enable the Cloudflare Managed Ruleset and monitor security events for false positives. Alternatively, move hosting to Cloudflare Pages. This pull request does not change the public site.

## In-repository protections

- A Content Security Policy in a meta element restricts scripts, images, frames, styles and connections to the site and Cloudflare Web Analytics.
- The Cloudflare analytics script is inert in a template and loads only after explicit visitor consent; refusal or no choice leaves it unloaded.
- The site has no contact form and does not collect contact details. Its email link opens the visitor's mail application.
- GitHub Pages serves the default `github.io` site over HTTPS. This repository cannot set response-level headers such as HSTS, X-Content-Type-Options, Permissions-Policy or CSP `frame-ancestors`; the HTML CSP is defense-in-depth and does not replace those headers.

## Before production

Review the privacy information and Cloudflare's data-processing/transfer settings. Cloudflare's service privacy claims are not a CNIL legal determination. This proposal uses explicit opt-in for Web Analytics. Configure the actual WAF and response headers at the hosting/edge layer before describing the site as firewall-protected.
