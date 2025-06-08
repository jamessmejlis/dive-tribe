# App Flow Document for DiveTribe

## Onboarding and Sign-In/Sign-Up

A brand-new user lands on the DiveTribe welcome screen after downloading the app or clicking a share link from a friend. This screen briefly highlights the app’s benefits, inviting the user to either sign up or log in. Tapping the sign-up button presents options for email, Google, or Apple authentication. Choosing email prompts the user to enter an address and create a password, while selecting Google or Apple seamlessly connects with those accounts. Once the user completes the chosen authentication flow, they receive a verification prompt by email or through their OAuth provider. After confirming their account, the user is taken to a guided profile setup. For returning users, tapping the log-in button takes them straight to their chosen sign-in method. If a user forgets their password, they tap a “Forgot Password” link on the sign-in screen, enter their email address, and receive a reset link. Once they reset their password, they return to the login screen to enter their new credentials. Signing out is always available from the settings screen as a single tap that brings the user back to the welcome screen.

## Main Dashboard or Home Page

After successfully signing in and completing profile setup, users land on the Home tab, which is the main dashboard of DiveTribe. At the top of the screen, a header displays the user’s profile picture and quick access to notifications. Below that, the core of the screen is a scrollable social feed where dive posts from friends, local chapters, and popular divers appear in a continuous card layout. Each post shows photos, dive stats, a location tag, and engagement buttons. A bottom navigation bar helps users switch between the Home feed, the Log Dive screen, the Discover section, the Challenges page, and the Profile and Settings area. A floating action button on the Home tab offers a shortcut to log a new dive. From any tab, the user can tap the navigation icons to move around the app seamlessly.

## Detailed Feature Flows and Page Transitions

### Dive Logging and Analytics

When the user taps the Log Dive icon in the bottom navigation bar, they arrive on a screen offering two choices: manual entry or Garmin sync. In manual entry mode, the user types in the dive site name and optional map location, along with details such as maximum depth, dive duration, water temperature, visibility, and personal notes. Submitting the form saves the dive and instantly shows a simple graph of depth over time, along with a summary message highlighting milestones. If the user chooses Garmin sync, the app connects to the Garmin Connect API, retrieves location, dive time, depth, heart rate, and surface interval, and displays the same analytics dashboard with auto-generated text insights. Users can swipe left or right on the dashboard to view monthly trends, personal bests, and unlock milestone notifications.

### Community Feed and Groups

Tapping the Home icon brings the user back to the social feed. Here, the user scrolls through dive stories posted by friends, chapter members, and featured divers. Tapping on a chapter label opens a chapter page that shows a specialized feed of posts, upcoming meetups, and a button to join the group. On the dive feed, tapping a location tag opens the dive site catalog entry with descriptions, photos, and map pins. From the dive site screen, the user can save the site to their favorites for future logs and view community tips. All posts allow likes, comments, and shares, and tapping a user’s name or picture navigates to that user’s profile.

### Buddy and Coach Discovery

When the user taps the Discover icon, they land on a search and discovery page for buddies and coaches. A row of filter controls at the top lets them narrow results by distance, skill level, certifications, languages spoken, shared goals, and availability. Scrolling down reveals profile cards for divers and instructors that match the criteria. Tapping a profile card opens a detailed view showing bio, certifications, gear list, recent dives, reviews, and a contact button. In Phase 1, tapping the contact button offers WhatsApp or email links to start a conversation externally. After initiating contact, the user returns to the discovery page or begins chatting outside the app.

### Challenges and Gamification

Selecting the Challenges icon reveals a list of active monthly and seasonal challenges. Each challenge tile shows the title, dates, and a brief goal summary. Tapping a challenge tile transitions into the challenge details page. Here, the user sees full rules, prize details, and a join button. Once joined, any qualifying dive automatically contributes toward the challenge progress. The user can swipe up to view a real-time leaderboard that ranks participants globally or locally, and badge stamps appear on their profile when they achieve milestones. A back arrow returns the user to the main Challenges list.

### Business Hub and Booking

Users discover instructors and dive shops in both the Home feed and Discover screens. Tapping on a business or instructor listing opens their business hub page, which outlines service offerings, hourly rates, available time slots, languages spoken, certifications, equipment rental options, and cancellation policies. Images and user reviews appear further down. A prominent contact button launches WhatsApp or an email composer. After the user taps to message the business, they return to the app’s business profile or move on to explore other instructors.

### Subscription Upgrade Flow

From any screen, the user can access the subscription upgrade screen via a banner or the Profile tab. This screen clearly compares free versus premium features, highlights advanced analytics, AI matching, and exclusive challenges, and offers a 30-day free trial call-out. Tapping a purchase button launches the device’s in-app purchase dialog for monthly or yearly plans. Once the transaction is successful, the app immediately unlocks premium features and shows a confirmation screen before returning the user to their previous tab.

### Admin Panel (Advanced Workflow)

Administrators sign in through the same authentication flow but are granted a hidden Admin menu in their Profile tab. Tapping this menu takes them to a separate dashboard showing platform metrics like active user counts, engagement rates, and popular features. From here, admins can navigate to post moderation screens where they review flagged content and choose to remove or edit posts. They can access a user management page to suspend or ban accounts and view report logs. A challenge management section allows admins to create new challenges or edit existing ones by filling in titles, descriptions, dates, rules, and prize details. Tabs at the top let admins switch between moderation, user reports, metrics, and challenge settings.

## Settings and Account Management

When the user taps the Profile icon in the bottom navigation bar, they see their personal profile page with recent dive logs, badges, and a settings button. Tapping settings opens a page where the user can update account details such as display name, bio, certifications, and gear list. They can configure notification preferences for dive log milestones, comments, and challenge updates. Privacy controls live here too, allowing the user to set default visibility for new posts to public, friends-only, or private. Each past log can also be edited or deleted. A section in settings lists blocked or muted accounts, and there is a support link for reporting issues or viewing usage statistics. A sign-out button is at the bottom of settings.

## Error States and Alternate Paths

If the user enters invalid data in any form, a clear inline error message appears under the relevant field, explaining what needs to be corrected. When syncing with Garmin and the connection fails, a fallback message shows a retry button and prompts the user to switch to manual entry. If network connectivity is lost during any action, the app displays an offline banner and stores data locally in a queue that automatically syncs when online. If the user attempts to access a restricted admin feature without appropriate permissions, a “Not Authorized” page appears with a link back to the Home feed. Forgotten passwords generate an email link, and if that link expires, the user sees instructions on requesting a new one. All error pages include a button to retry or return to the last successful screen.

## Conclusion and Overall App Journey

From the moment a freediver installs DiveTribe to their daily use, the app guides them through a smooth path of signing up, setting up a profile, and jumping into dive logging and community engagement. Users track dives manually or via Garmin sync, share achievements in the social feed, join local chapters, discover dive partners and coaches, and challenge themselves through gamified events. Premium subscribers unlock deeper analytics and AI recommendations, while businesses connect with clients through dedicated profiles. Administrators keep the community safe and vibrant with moderation tools. This end-to-end journey empowers divers of all levels to connect, compete, and improve under the sea in one cohesive mobile experience.
