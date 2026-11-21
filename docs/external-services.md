# External services

The services Agni relies on: their limits, their terms, where the personal data goes, and the risks the owner accepts, each with its date. Checked during the specifications (process.md, Specifications), read by the steps that use a service.

## Calendly (step 14)

- **Webhooks on every plan** (checked 2026-11-22): « The Scheduling API (POST /invitees) and Calendly webhooks are now available to Calendly users on the Free plan, with no paid plan required » ([Calendly community, 2026-11-06](https://community.calendly.com/developer-faq-62/scheduling-api-post-invitees-and-webhooks-now-available-on-the-free-plan-6162)); « Webhooks are available on all Calendly plans, including the Free plan » ([developer FAQ](https://developer.calendly.com/frequently-asked-questions)). Before, they needed a paid plan (Standard or above). The first tester needs no subscription.
- **Authentication**: a personal access token or an OAuth application ([help center, webhooks overview](https://calendly.com/help/webhooks-overview), updated 2026-11-04). An `organization` subscription needs an admin or owner of the organization; a `user` subscription stops working when the user leaves the organization. **[OPEN]** Which one Agni uses on behalf of a craftsman (step 14, with its grid).
- **Signature of the webhooks**: the help center advises to « validate incoming webhook signatures ». **[OPEN]** The header, the signing key and the tolerance on the age of an event, read in the developer documentation (step 14).
- **Personal data**: a booking holds the client's name, email, maybe their address and the answers to the custom questions of the craftsman. **[OPEN]** Where Calendly hosts it, and what Agni keeps of an event.

## Email provider: Brevo (step 9)

- **Free plan** (checked 2026-11-22): 300 emails a day, marketing and transactional together, unused emails not carried over ([Brevo help center](https://help.brevo.com/hc/en-us/articles/208580669)). **[OPEN]** Whether the « Sent with Brevo » mark applies to the transactional emails, the price above the limit, and the delivery of an attachment (the PDF) of what size.
- **Personal data**: the client's email, name and the PDF go through Brevo. **[OPEN]** Its data processing agreement and where it hosts the data.

## Host (step 13)

**[OPEN]** Chosen at step 13, with its grid: where the SQLite file and the PDF live, their backups, the cost per year, and whether it stays compatible with the PDF engine chosen at step 2.

## Risks accepted by the owner

None yet.
