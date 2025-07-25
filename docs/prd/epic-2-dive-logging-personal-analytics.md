# Epic 2: Dive Logging & Personal Analytics

**Epic Goal:** Create comprehensive dive tracking capabilities that allow users to manually log dives, automatically sync data from Garmin devices, and view personal performance analytics. This epic transforms DiveTribe from a basic app into a powerful dive tracking tool that provides meaningful insights and progress tracking.

## Story 2.1: Manual Dive Log Entry

As a **diver**,
I want **to manually log my dive details and experiences for both ocean and pool training sessions**,
so that **I can track my diving progress across all environments and disciplines**.

### Acceptance Criteria

1. Log Dive tab displays clean, intuitive dive entry form
2. **Environment selection: Ocean/Open Water or Pool**
3. **For Ocean dives - Required fields: dive site name, date/time, maximum depth, total dive time**
4. **For Pool dives - Required fields: pool name/location, date/time, distance (for dynamic disciplines) OR time (for static), discipline type**
5. **Discipline selection for all dives: CWT (Constant Weight), FIM (Free Immersion), CNF (Constant No Fins), DYN (Dynamic Apnea), DNF (Dynamic No Fins), STA (Static Apnea), Variable Weight, No Limits, and other custom disciplines**
6. Optional fields: water temperature, visibility (ocean only), equipment used, training focus
7. Location capture via GPS with manual override option
8. Notes section for dive experience, training observations, and performance analysis
9. Photo upload capability (up to 5 photos per dive)
10. Dive buddy selection from existing contacts (Phase 1: manual text entry)
11. **Performance metrics fields based on discipline (depth, time, distance as appropriate)**
12. Save as draft functionality for incomplete entries
13. Form validation with clear error messages for required fields
14. Successful save confirmation with option to share immediately
15. Offline logging capability with sync when connection restored

## Story 2.2: Garmin Connect Integration

As a **tech-savvy diver with a Garmin device**,
I want **my dive computer data to automatically sync with DiveTribe**,
so that **I can have accurate, detailed dive metrics without manual entry**.

### Acceptance Criteria

1. Garmin Connect account linking flow within app settings
2. OAuth authentication with Garmin Connect API
3. Automatic import of dive activities from connected Garmin account
4. Imported data includes: depth profile, dive duration, surface intervals, heart rate (if available)
5. GPS coordinates automatically captured from Garmin device
6. Duplicate detection between manual and automatic entries
7. Option to merge or keep separate manual vs automatic dive logs
8. Sync status indicator showing last successful import
9. Manual refresh option to check for new Garmin activities
10. Error handling for API failures with retry mechanism
11. Data displayed in consistent format regardless of source (manual vs Garmin)

## Story 2.3: Personal Analytics Dashboard

As a **active diver**,
I want **to view my diving statistics and progress over time**,
so that **I can track my improvement and stay motivated to dive more**.

### Acceptance Criteria

1. Analytics dashboard accessible from Profile tab or dedicated section
2. Key statistics summary: total dives, deepest dive, longest dive, total underwater time
3. Monthly dive count with trend indicators (up/down vs previous month)
4. Depth progression chart showing maximum depths over time
5. Dive frequency calendar heatmap (similar to GitHub contributions)
6. Equipment usage tracking showing most-used gear
7. Dive site diversity metrics (number of unique locations)
8. Personal milestones and achievements display
9. Export functionality for personal dive statistics
10. Time period filters (last 30 days, 3 months, year, all time)
11. Comparison features (this month vs last month, year over year)

## Story 2.4: Dive Site Catalog Integration

As a **diving explorer**,
I want **access to a comprehensive database of dive sites with detailed information**,
so that **I can discover new locations and get important site-specific details**.

### Acceptance Criteria

1. Searchable dive site database integrated into Log Dive flow
2. Site selection via map interface or text search
3. Each dive site includes: name, GPS coordinates, description, average depth, difficulty level
4. Site photos and user-contributed images
5. Basic site conditions (typical visibility, temperature range, currents)
6. **Privacy controls for dive sites - users can mark sites as "Private" or "Public"**
7. **Private sites only visible to the user who created them**
8. **Option to share private sites with specific friends or groups**
9. User can add new dive sites if not found in database
10. Recent dives at each site displayed in site profile (respecting privacy settings)
11. Integration with dive log entry - selected site auto-populates location fields
12. Favorite sites feature for quick access to frequently visited locations
13. Offline access to previously viewed dive site information
14. User ratings and basic review system for public dive sites
15. **Warning prompt when making a private site public ("This will make your secret spot visible to all users")**
