# Specifications

The expected behavior of Agni. A first draft, written at the setup (2026-11-22) from the context agreed with the owner before the project; step 1 of [roadmap.md](roadmap.md) completes it. What is not settled is marked `**[OPEN]**` where the gap is (`grep -n '\[OPEN\]' specs.md`).

## Idea

At the end of a visit, a heating engineer, a plumber or a refrigeration technician produces the regulatory certificate on their phone, has the client sign it on the screen, and the application emails it to the client as a PDF. The promise: « du rendez-vous à l’attestation signée, sans rien retaper ».

- **Origin**: the owner saw a heating engineer use EasySAV (about 25 € a month): at the end of a boiler maintenance, giving a name, an email and an address was enough to receive the signed certificate by email.
- **Name**: « Agni » means « fire » in Bengali (the owner's origins) and in Sanskrit; it is also the god of fire, messenger between the worlds: the tool links the craftsman, the client and the paperwork.

## Users

- **The craftsman** (the account holder): an independent heating engineer, plumber or refrigeration technician, or a small company. Uses Agni on a phone, on site (a boiler room, a cellar, sometimes without network), at the end of a visit, in a hurry. Enters the information of the company once.
- **The client**: the owner or the occupant of the dwelling. Signs on the craftsman's phone, then receives the PDF by email. Has no account.
- **The first tester**: a plumber and heating engineer the owner knows, who uses Calendly for his bookings.

## Positioning

- **Target**: the craftsmen who don't use EasySAV and still fill their certificates on paper or on the free PDFs. The real competitor is the free PDF and the carbon-copy book.
- **Difference**: the integration with Calendly. The client books on the craftsman's Calendly (name, email, address, and maybe the kind of boiler as custom questions); an `invitee.created` webhook hands these data to Agni; after the time of the visit, the craftsman is asked « Générer l'attestation ? » with the form already filled. A year later, the client is reminded of the maintenance with the Calendly link. Agni doesn't compete with Calendly: it plugs into it.
- **Price** (to validate with craftsmen): a free trial (10 to 20 certificates), then about 5 € a month, or a one-off payment of about 90 € covering 2 to 3 years of updates. **[OPEN]** The model and its numbers.
- **Never look official**: no « CERFA » in the name, no blue-white-red, no Marianne. The interface never names a competitor.

## Version 1

1. The maintenance certificate of a boiler (gas, fuel oil, wood), compliant with annex 5 of the order of 15 September 2009 as amended (see [Regulation](#regulation)).
2. Quick entry on a phone: the information of the company entered once, then only the client and the measures at each visit.
3. The signature of the client on the screen, then the PDF and its automatic email.
4. The history of the certificates per client.
5. The integration with Calendly (pre-filling), right after the core above.

Mobile first. Out of version 1: an offline mode (the cellar without network) is an idea for later (`backlog.md`).

## Out of scope

- **Later**: the maintenance certificate of heat pumps; the refrigerant intervention form CERFA 15497*04, in force since 6 July 2024, a version *05 announced (**[OPEN]** its scope, read on the text: the wording « categories I to IV » heard before the project may be those of the certificate of capacity of the operator, not of the equipment); maybe the refrigerant tracking slip (BSFF) through the Trackdéchets API.
- **Never**: the VAT certificates 1300-SD and 1301-SD, abolished since 16 February 2025 (replaced by a mention on the quote or the invoice); hosting the manuals of the manufacturers (copyright); a catalog of error codes (the strength of EasySAV, backed by Dispart and Saint-Gobain: not our ground).

## Regulation

The rules of the certificate, each with its source, are in [docs/regulation.md](docs/regulation.md). What the context already gives:

- The maintenance certificate of a boiler is **not** a CERFA: its content is set by annex 5 of the order of 15 September 2009 as amended (notably by the order of 24 July 2020).
- It is handed to the client within 15 days after the visit.
- It names the brand and the reference of the measuring instrument used.
- The reference models are those of UMGCCP/FFB and of the Pro'Réno programme (fillable PDFs): only to compare, never copied (copyright).

**[OPEN]** Every mandatory mention, word for word, from the official text (step 1).

## Screens

**[OPEN]** Drawn at steps 3 (structure) and 4 (wireframes). The paths known so far:

- the company, entered once (name, address, identifiers, technicians, measuring instruments) **[OPEN]** which fields;
- a new certificate: the client, the appliance, the measures, the advice; then the signature; then the sending;
- the history of a client: their appliances and their certificates, each PDF downloadable again;
- later, the bookings coming from Calendly, waiting for their certificate.

## Data

**[OPEN]** Drawn at step 3. The kinds of data known so far: the company, its technicians, its measuring instruments, the clients, their appliances, the visits, the certificates (with their PDF and the signature).

## Personal data

The minimum of the GDPR, without blocking the version 1:

- inform the clients (what is kept, why, for how long, by whom) **[OPEN]** where and how (on the signature screen, in the email, both);
- a retention period for each kind of data **[OPEN]** which periods (the certificate has a legal value for the client and the craftsman);
- the deletion of a client and of everything that concerns them, on request **[OPEN]** what deleting does to a certificate already sent;
- nothing personal in the logs.

## Edge cases

**[OPEN]** To walk at step 1, state by state, so that no state is a dead end: the client refuses to sign; the client has no email, or gives a wrong one; the mail bounces; the certificate is signed with a mistake; the visit is cancelled or moved on Calendly; two technicians of the same company fill the same certificate; the phone loses the network while sending.
