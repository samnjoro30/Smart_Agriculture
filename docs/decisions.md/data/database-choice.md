# ADR-005: Use PostgreSQL as Primary Database

Date: 2026-01-05 
Status: Accepted  

---

## Context

Smart Farm requires a reliable and structured way to store and manage data related to:

- Livestock records (animals, breeds, lifecycle)
- Health data (treatments, vaccinations, history)
- Reproduction tracking (heat cycles, breeding, calving)
- User accounts and farm ownership
- Reporting and analytics

The data is highly relational, with strong dependencies between entities such as:
- One farmer → many animals
- One animal → many health records
- One animal → multiple reproduction events

The system must ensure:
- Data consistency and integrity  
- Ability to query historical records  
- Support for reporting and analytics  
- Scalability as data grows  

---

## Decision

Use **PostgreSQL** as the primary relational database.

---

## Alternatives Considered

### 1. MongoDB (NoSQL)

**Rejected because:**
- Weak support for complex relational data
- Data duplication risk
- Harder to enforce data integrity
- Less suitable for structured reporting

---

### 2. MySQL

**Rejected because:**
- Slightly less advanced features compared to PostgreSQL
- Weaker support for complex queries and analytics use cases

---

### 3. Firebase Firestore

**Rejected because:**
- Limited relational capabilities
- Vendor lock-in concerns
- Higher cost at scale
- Less flexibility for complex queries

---

## Rationale

PostgreSQL provides:

- Strong relational data modeling  
- ACID compliance for reliable transactions  
- Powerful querying (joins, aggregations)  
- Support for complex reporting  
- Scalability and performance  
- Extensibility for future analytics and AI workloads  

It is well-suited for systems where **data correctness and relationships are critical**.

---

## Consequences

### Positive

- High data integrity and consistency  
- Reliable transaction handling  
- Efficient querying for reports and analytics  
- Scalable for long-term growth  

---

### Negative / Trade-offs

- Requires schema design and migrations  
- Slightly more complex than NoSQL for rapid prototyping  
- Needs careful indexing for performance  

---

## Future Considerations

- Introduce read replicas for scaling  
- Use caching (Redis) to reduce database load  
- Integrate with analytics tools or data warehouse  
- Support AI/ML pipelines using structured data  

---

## Success Criteria

- Data remains consistent and accurate  
- Queries perform efficiently at scale  
- Reporting features work reliably  
- System supports future analytics use cases  

---

## Notes

This decision aligns with the need for:
- Structured farm data management  
- Long-term scalability  
- Reliable reporting and insights  