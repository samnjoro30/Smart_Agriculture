# ADR-004: Use Next.js for Frontend Development

Date: 2026-01-06  
Status: Accepted  

---

## Context

The Smart Farm frontend must:

- Be accessible on low-cost smartphones
- Provide a simple and intuitive user experience
- Work in low-connectivity environments
- Support fast loading and responsiveness
- Be easy to iterate during MVP stage

Farmers are primarily mobile users with:
- Limited technical experience
- Intermittent internet access

---

## Decision

Use **Next.js (React framework)** to build a **Progressive Web App (PWA)**.

---

## Alternatives Considered

### 1. Plain React (CRA/Vite)

**Rejected because:**
- Lacks built-in routing and optimization features
- More setup required for production readiness

---

### 2. Native Mobile Apps (Android/iOS)

**Rejected because:**
- Higher development and maintenance cost
- Requires app installation (barrier for farmers)
- Slower iteration cycles

---

### 3. Flutter / React Native

**Rejected because:**
- Requires separate mobile development effort
- Not necessary for MVP
- Web-first approach is more accessible

---

## Rationale

Next.js provides:

- Fast performance and optimized rendering
- Built-in routing and structure
- Easy PWA integration
- Strong ecosystem and community support
- Ability to deploy quickly (e.g., Vercel)

This makes it ideal for delivering a mobile-friendly web experience without requiring app installation.

---

## Consequences

### Positive

- Fast and responsive UI  
- Mobile-friendly experience  
- No installation required  
- Easy deployment and updates  
- Rapid iteration  

---

### Negative / Trade-offs

- Limited access to some native mobile features  
- Requires careful optimization for offline use  

---

## Future Considerations

- Add offline support using PWA capabilities  
- Transition to native mobile apps if needed  
- Improve UX based on farmer feedback  

---

## Success Criteria

- Fast page load times on mobile devices  
- High usability for non-technical users  
- Consistent performance in low connectivity  
- Positive user feedback on UI/UX  

---

## Notes

This decision supports:
- Accessibility for farmers
- Rapid product iteration
- Low barrier to entry