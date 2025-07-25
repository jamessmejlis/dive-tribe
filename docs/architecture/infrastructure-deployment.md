# Infrastructure & Deployment

## Deployment Architecture

DiveTribe uses **Supabase** for backend infrastructure and **Expo Application Services (EAS)** for mobile app deployment:

### Production Environment

- **Database:** Supabase PostgreSQL (managed, auto-scaling)
- **API:** Supabase Edge Functions (Deno runtime, global deployment)
- **Storage:** Supabase Storage (S3-compatible with CDN)
- **Auth:** Supabase Auth (managed authentication service)
- **Real-time:** Supabase Realtime (WebSocket connections)
- **Mobile Apps:** EAS Build + App Store deployment

### Development Workflow

```yaml

```
