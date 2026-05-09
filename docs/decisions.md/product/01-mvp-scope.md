# ADR-001: Define MVP Scope for Smart Farm

Date: 2026-02-06 

---

## Context

Smart Farm aims to improve how small-scale dairy farmers manage livestock, particularly in areas of reproduction (heat cycles), health tracking, and farm productivity.

Initial ideation included a wide range of features such as:
- AI-based disease prediction
- IoT sensor integration
- Milk production analytics
- Payment systems
- Veterinary marketplace

However, the target users (small-scale farmers) currently rely on:
- Manual notebooks
- Memory-based tracking
- Limited or no digital tools

Building a full-feature platform at the initial stage would:
- Increase development time
- Delay user feedback
- Introduce unnecessary complexity
- Risk solving unvalidated problems

---

## Decision

Limit the first version of Smart Farm to a **Minimum Viable Product (MVP)** focused on solving the **core problem of record-keeping and reproductive tracking**.

### MVP Features

- Animal registration and identification  
- Health record logging (treatments, vaccinations)  
- Reproduction tracking (heat cycles, breeding, calving)  
- Basic dashboard overview  
- Simple reporting (animal history)  
- User authentication  

---

## Alternatives Considered

### 1. Full Feature Launch
Including AI, IoT, payments, analytics

**Rejected because:**
- High complexity
- Long development timeline
- No validated demand for advanced features

---

### 2. AI-First Product
Focus on predictive health and automation

**Rejected because:**
- Requires large datasets not yet available
- Farmers’ primary problem is basic tracking, not prediction
- High implementation cost

---

### 3. Hardware/IoT-Based Solution
Use sensors for monitoring livestock

**Rejected because:**
- High cost for farmers
- Limited accessibility in rural areas
- Infrastructure challenges

---

## Rationale

The MVP approach enables:

- Faster time-to-market  
- Early validation with real farmers  
- Reduced development risk  
- Focus on solving the most critical problem first  
- Iterative improvement based on real user feedback  

This aligns with Lean Product Development principles.

---

## Consequences

### Positive

- Quick product launch  
- Lower development cost  
- Easier onboarding for farmers  
- Clear product focus  
- Ability to gather real-world feedback early  

---

### Negative / Trade-offs

- Limited feature set initially  
- May not satisfy advanced users  
- No automation or predictive capabilities in early stages  

---

## Future Considerations

Features intentionally deferred to later phases:

- SMS notifications and alerts  
- Offline functionality (enhanced PWA support)  
- AI-based health and production insights  
- Milk production analytics  
- Veterinary integration and scheduling  
- Payment systems (e.g., mobile money integration)  
- Multi-user farm management  

---

## Success Criteria

The MVP will be considered successful if:

- Farmers actively use the system weekly  
- Animal records are consistently created and updated  
- Reduction in missed breeding cycles is observed  
- Positive user feedback is received for usability  

---

## Notes

This decision will be revisited after:
- Initial user testing
- Feedback collection from farmers and veterinarians
- Analysis of product usage metrics