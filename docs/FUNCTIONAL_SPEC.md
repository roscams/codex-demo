# Functional Specification: HLN.be-Style News Website

## Document Information

**Project Name:** HLN News Website Clone
**Version:** 1.0
**Last Updated:** February 18, 2026
**Status:** Active Development

---

## 1. Executive Summary

### 1.1 Project Overview

The HLN News Website Clone is a modern, full-featured news publishing platform inspired by HLN.be, Belgium's leading digital news source. The platform consists of two primary applications:

- **Public-facing website** (Frontend): A responsive news portal for readers to consume content
- **Content Management System** (Backoffice): An admin interface for journalists and editors to manage content

### 1.2 Project Goals

**Primary Objectives:**
- Deliver a fast, engaging news reading experience across all devices
- Enable efficient content creation and management for editorial teams
- Build a scalable platform supporting multimedia content (text, images, video)
- Foster reader engagement through comments, social sharing, and personalization
- Create revenue opportunities through advertising and premium content

**Success Criteria:**
- Page load time < 2 seconds on 4G connections
- 95%+ mobile responsiveness score
- Support 10,000+ concurrent readers
- Enable editorial team to publish 50+ articles daily
- Achieve 60%+ reader engagement rate (comments, shares, saves)

### 1.3 Target Audience

**Primary Users:**
- **Readers:** General public seeking news, ages 18-65+
- **Journalists:** Content creators and writers
- **Editors:** Content approvers and managers
- **Administrators:** System and user management

### 1.4 Project Scope

**In Scope:**
- Responsive news website with article browsing and reading
- Full-featured CMS for content management
- User authentication and authorization
- Comment system with moderation
- Search functionality
- Newsletter subscriptions
- Social media integration
- Analytics and reporting
- Premium content paywall
- Advertising integration

**Out of Scope:**
- Mobile native applications (iOS/Android)
- Live video streaming infrastructure
- Third-party content syndication
- Print edition integration
- E-commerce functionality

---

## 2. User Personas

### 2.1 Persona 1: The Active Reader (Sarah)

**Demographics:**
- Age: 34
- Occupation: Marketing Manager
- Location: Brussels, Belgium
- Tech Savviness: High

**Goals:**
- Stay informed about current events during commute
- Engage with articles through comments
- Save articles to read later
- Receive breaking news notifications
- Share interesting articles with colleagues

**Pain Points:**
- Intrusive advertising disrupts reading experience
- Slow-loading pages waste time
- Difficulty finding articles on specific topics
- No way to track previously read articles

**User Journey:**
1. Opens app during morning commute
2. Skims headlines on homepage
3. Reads 2-3 full articles
4. Comments on breaking news
5. Saves article for later reading
6. Shares article on LinkedIn

### 2.2 Persona 2: The Journalist (Tom)

**Demographics:**
- Age: 29
- Occupation: News Journalist
- Location: Antwerp, Belgium
- Experience: 5 years in journalism

**Goals:**
- Publish 3-5 articles daily
- Upload and manage media assets efficiently
- Collaborate with editors on drafts
- Track article performance metrics
- Meet tight publishing deadlines

**Pain Points:**
- Cumbersome content editors slow down writing
- Difficulty organizing media library
- No visibility into article performance
- Limited formatting options for rich content

**User Journey:**
1. Logs into backoffice CMS
2. Creates new article with rich text editor
3. Uploads and crops images
4. Adds tags and categories
5. Previews article
6. Submits for editor review
7. Checks article views and engagement

### 2.3 Persona 3: The Editor (Linda)

**Demographics:**
- Age: 45
- Occupation: Chief Editor
- Location: Brussels, Belgium
- Experience: 20 years in media

**Goals:**
- Review and approve 40+ articles daily
- Manage editorial calendar
- Monitor content performance
- Ensure content quality and consistency
- Manage journalist team
- Respond to trending topics quickly

**Pain Points:**
- Difficult to track pending approvals
- No consolidated performance dashboard
- Limited tools for content planning
- Cannot easily reprioritize featured content

**User Journey:**
1. Reviews dashboard with pending articles
2. Reads and edits submitted content
3. Approves or requests revisions
4. Sets featured/breaking news flags
5. Monitors real-time traffic
6. Adjusts homepage layout based on performance

### 2.4 Persona 4: The Administrator (Mark)

**Demographics:**
- Age: 38
- Occupation: System Administrator
- Location: Remote
- Tech Savviness: Expert

**Goals:**
- Manage user accounts and permissions
- Monitor system performance and uptime
- Configure system settings
- Ensure data security and backups
- Troubleshoot technical issues

**Pain Points:**
- Limited visibility into system health
- Manual user provisioning
- No automated backup verification
- Difficulty tracking security events

**User Journey:**
1. Reviews system health dashboard
2. Creates accounts for new journalists
3. Assigns appropriate permissions
4. Monitors error logs
5. Configures CDN and caching
6. Reviews security audit logs

---

## 3. User Stories

### 3.1 Reader Experience

#### Homepage & Navigation

**US-001: View Homepage**
- **As a** reader
- **I want to** see the latest news on the homepage
- **So that** I can quickly catch up on current events

**Acceptance Criteria:**
- Homepage displays breaking news ticker at top
- Featured articles shown prominently with large images
- Latest articles organized by category
- Trending section shows most-read articles
- "Load more" pagination for older articles
- All content loads within 2 seconds

**US-002: Browse by Category**
- **As a** reader
- **I want to** filter articles by category
- **So that** I can focus on topics that interest me

**Acceptance Criteria:**
- Navigation menu shows all categories (Nieuws, Sport, Showbizz, Binnenland, Buitenland, Economie)
- Category pages display category-specific articles
- Breadcrumb navigation shows current location
- Category color coding consistent across site
- Subcategories supported where applicable

**US-003: Search Articles**
- **As a** reader
- **I want to** search for articles by keywords
- **So that** I can find specific topics or events

**Acceptance Criteria:**
- Search box prominently placed in header
- Real-time search suggestions as user types
- Search results show title, excerpt, category, and date
- Filters available for date range and category
- Search highlights matching keywords
- Results paginated with 20 per page

#### Article Reading

**US-004: Read Article**
- **As a** reader
- **I want to** read full article content
- **So that** I can stay informed

**Acceptance Criteria:**
- Article displays title, author, date, category
- Featured image shown at top
- Content formatted with proper typography
- Reading time estimate displayed
- Related articles suggested at bottom
- Social share buttons visible
- Print-friendly view available
- Responsive on mobile and tablet

**US-005: View Article Media**
- **As a** reader
- **I want to** view images and videos in articles
- **So that** I can better understand the story

**Acceptance Criteria:**
- Images load progressively (lazy loading)
- Image captions and alt text displayed
- Click to view full-size image in lightbox
- Video player embedded with controls
- Photo galleries display as carousel
- Media optimized for mobile bandwidth

#### Engagement Features

**US-006: Comment on Article**
- **As a** registered reader
- **I want to** comment on articles
- **So that** I can share my opinion

**Acceptance Criteria:**
- Comment box visible below article
- Login required to post comments
- Comments display author name and timestamp
- Nested replies supported (2 levels deep)
- Edit own comments within 15 minutes
- Delete own comments anytime
- Report inappropriate comments
- Sort comments by newest/popular

**US-007: Share Article**
- **As a** reader
- **I want to** share articles on social media
- **So that** I can discuss with friends

**Acceptance Criteria:**
- Share buttons for Facebook, Twitter, LinkedIn, WhatsApp
- Copy link to clipboard option
- Email article option
- Social meta tags for rich previews
- Share count displayed
- Mobile-optimized share sheet on supported devices

**US-008: Save Article for Later**
- **As a** registered reader
- **I want to** bookmark articles
- **So that** I can read them later

**Acceptance Criteria:**
- Bookmark icon visible on article
- One-click to save/unsave
- Saved articles accessible from profile
- Organize bookmarks by collections
- Remove articles from saved list
- Export saved articles list

#### User Account Features

**US-009: Create Reader Account**
- **As a** visitor
- **I want to** create a reader account
- **So that** I can access personalized features

**Acceptance Criteria:**
- Registration form with email and password
- Email verification required
- Social login options (Google, Facebook)
- Privacy policy acceptance required
- Welcome email sent upon registration
- Account created in under 2 minutes

**US-010: Manage Reader Profile**
- **As a** registered reader
- **I want to** manage my profile
- **So that** I can personalize my experience

**Acceptance Criteria:**
- Edit profile information (name, avatar)
- Change password with current password verification
- Set content preferences and interests
- Manage notification settings
- View reading history
- Download personal data (GDPR)
- Delete account option

**US-011: Subscribe to Newsletter**
- **As a** reader
- **I want to** subscribe to newsletters
- **So that** I can receive curated news via email

**Acceptance Criteria:**
- Newsletter signup form in footer
- Choose frequency (daily, weekly)
- Select topic preferences
- Email confirmation sent
- Unsubscribe link in every email
- Manage subscriptions from profile

#### Premium Features

**US-012: Access Premium Content**
- **As a** premium subscriber
- **I want to** read premium articles
- **So that** I get in-depth analysis

**Acceptance Criteria:**
- Premium articles marked with badge
- Paywall appears after 2 free premium articles/month
- Clear subscription pricing displayed
- Multiple payment options available
- Immediate access after purchase
- Premium content ad-free
- Premium subscriber badge on comments

**US-013: Receive Breaking News Notifications**
- **As a** registered reader with notifications enabled
- **I want to** receive push notifications for breaking news
- **So that** I don't miss important updates

**Acceptance Criteria:**
- Opt-in prompt for notifications
- Notification permission requested appropriately
- Breaking news triggers immediate notification
- Notification includes headline and thumbnail
- Click notification opens article
- Manage notification preferences in settings
- Works on desktop and mobile browsers

### 3.2 Content Management (Backoffice)

#### Authentication & Access

**US-014: Login to Backoffice**
- **As a** journalist or editor
- **I want to** securely log in to the CMS
- **So that** I can manage content

**Acceptance Criteria:**
- Login form with email and password
- Remember me checkbox
- Password requirements enforced
- Account lockout after 5 failed attempts
- Two-factor authentication option
- Session expires after 8 hours inactivity
- Redirect to dashboard after login

#### Article Management

**US-015: Create New Article**
- **As a** journalist
- **I want to** create new articles
- **So that** I can publish news content

**Acceptance Criteria:**
- Rich text WYSIWYG editor (TinyMCE/Tiptap)
- Title, excerpt, and content fields required
- Upload featured image with alt text
- Select category from dropdown
- Add multiple tags
- Set author (default to current user)
- Save as draft or publish immediately
- Schedule future publication
- SEO fields (meta description, keywords)
- Preview before publishing

**US-016: Edit Existing Article**
- **As a** journalist
- **I want to** edit my articles
- **So that** I can correct errors or update information

**Acceptance Criteria:**
- Search and filter article list
- Edit button on each article
- Pre-filled form with existing content
- Track revision history
- Revert to previous version
- See who last edited and when
- Lock article during editing to prevent conflicts

**US-017: Manage Article Status**
- **As an** editor
- **I want to** change article status
- **So that** I can control publication workflow

**Acceptance Criteria:**
- Status options: Draft, Pending Review, Published, Archived
- Only editors can publish articles
- Published articles visible on frontend
- Unpublish option to take article offline
- Bulk status updates for multiple articles
- Email notifications on status changes

**US-018: Feature and Breaking News**
- **As an** editor
- **I want to** mark articles as featured or breaking
- **So that** I can highlight important content

**Acceptance Criteria:**
- Toggle switches for featured and breaking flags
- Featured articles appear on homepage top section
- Breaking news shows in ticker
- Only one article can be marked "breaking" at a time
- Automatically unmark breaking after 24 hours
- Limit featured articles to maximum 5

**US-019: Delete Article**
- **As an** editor
- **I want to** delete articles
- **So that** I can remove outdated or incorrect content

**Acceptance Criteria:**
- Delete button with confirmation dialog
- Soft delete moves to trash
- Permanently delete option
- Restore from trash within 30 days
- Cascade delete related comments
- Audit log tracks deletions

#### Media Management

**US-020: Upload Media**
- **As a** journalist
- **I want to** upload images and videos
- **So that** I can illustrate articles

**Acceptance Criteria:**
- Drag-and-drop file upload
- Support JPG, PNG, GIF, WebP, MP4
- Maximum file size: 10MB images, 100MB video
- Automatic image compression and resizing
- Generate multiple image sizes (thumbnail, medium, large)
- Add alt text, title, and caption
- Upload progress indicator
- Bulk upload support

**US-021: Organize Media Library**
- **As a** journalist
- **I want to** organize media files
- **So that** I can find assets quickly

**Acceptance Criteria:**
- Grid view of all media with thumbnails
- Filter by type (image, video, document)
- Search by filename or alt text
- Sort by date uploaded, size, name
- Folders/collections for organization
- Tag media files
- View media usage (which articles)
- Delete unused media

**US-022: Edit Images**
- **As a** journalist
- **I want to** crop and edit images
- **So that** I can prepare them for publication

**Acceptance Criteria:**
- Crop tool with aspect ratio presets
- Resize image dimensions
- Rotate and flip
- Adjust brightness and contrast
- Add text overlay
- Save original version
- Preview changes before saving

#### Category & Tag Management

**US-023: Manage Categories**
- **As an** administrator
- **I want to** create and edit categories
- **So that** I can organize content

**Acceptance Criteria:**
- Create new category with name and slug
- Assign category color for UI
- Set parent category for hierarchies
- Edit category details
- Reorder categories for navigation
- Delete empty categories only
- Preview category page

**US-024: Manage Tags**
- **As a** journalist
- **I want to** create and use tags
- **So that** I can cross-reference related content

**Acceptance Criteria:**
- Auto-suggest existing tags while typing
- Create new tag inline
- Merge duplicate tags
- Rename tags
- Delete unused tags
- View all articles with specific tag

#### User Management

**US-025: Manage CMS Users**
- **As an** administrator
- **I want to** manage user accounts
- **So that** I can control access

**Acceptance Criteria:**
- Create user with email, name, role
- Roles: Admin, Editor, Journalist
- Set temporary password
- Send invitation email
- Edit user details
- Deactivate/reactivate accounts
- Reset user password
- View user activity log

**US-026: Manage Permissions**
- **As an** administrator
- **I want to** control user permissions
- **So that** I can enforce security

**Acceptance Criteria:**
- Journalists: create/edit own articles, upload media
- Editors: approve articles, manage all content, moderate comments
- Admins: all permissions plus user/system management
- Custom permission sets
- Role-based access control (RBAC)

#### Dashboard & Analytics

**US-027: View Dashboard**
- **As a** journalist/editor
- **I want to** see overview metrics
- **So that** I can track performance

**Acceptance Criteria:**
- Total articles, views, comments today/week/month
- Recent articles with quick actions
- Pending articles for review
- Top-performing articles
- Traffic trends chart
- Comment moderation queue
- Quick publish shortcut

**US-028: View Article Analytics**
- **As a** journalist
- **I want to** see individual article performance
- **So that** I can understand reader engagement

**Acceptance Criteria:**
- Total views and unique visitors
- View trends over time (chart)
- Traffic sources (direct, social, search)
- Average time on page
- Scroll depth metrics
- Comment count and engagement rate
- Social shares breakdown
- Compare to category average

#### Comment Moderation

**US-029: Moderate Comments**
- **As an** editor
- **I want to** moderate user comments
- **So that** I can maintain community standards

**Acceptance Criteria:**
- View all pending comments
- Approve/reject comments
- Delete inappropriate comments
- Ban users from commenting
- Edit comment content (with note)
- Mark comment as spam
- Bulk moderation actions
- Email notifications for new comments

---

## 4. Feature Descriptions

### 4.1 Homepage

**Purpose:** Primary entry point for readers to discover news content.

**Components:**
- Breaking news ticker (auto-scrolling, red background)
- Featured news section (1 large + 3-4 smaller cards)
- Category tabs for filtering
- Latest articles grid (3 columns on desktop)
- Trending sidebar (most-read last 24h)
- Newsletter signup widget
- Advertisement placements

**Behavior:**
- Content updates automatically every 5 minutes
- Breaking news ticker pauses on hover
- Infinite scroll loads older articles
- Articles marked as "read" if user is logged in

**Business Rules:**
- Maximum 1 breaking news at a time
- Featured articles selected by editors
- Trending calculated by views + recency algorithm
- Advertisement frequency: every 5 articles

### 4.2 Category Pages

**Purpose:** Allow readers to browse category-specific content.

**Components:**
- Category header with name, color, and description
- Subcategory navigation if applicable
- Article grid (chronological)
- Filters (date range, subcategory)
- Advertisement placements

**Behavior:**
- URL structure: `/[category-slug]`
- Shows only published articles in category
- Pagination: 20 articles per page
- Category color theme applied to page

**Business Rules:**
- Category must have at least 1 article to be visible in nav
- Subcategories inherit parent category settings
- Categories cannot be deleted if containing articles

### 4.3 Article Detail Page

**Purpose:** Display full article content and enable reader engagement.

**Components:**
- Article header (title, author, date, category, reading time)
- Featured image with caption
- Article body with rich formatting
- Image galleries/videos embedded
- Social share toolbar (sticky on scroll)
- Author bio box
- Related articles section
- Comment section
- Advertisement placements

**Behavior:**
- URL structure: `/[category]/[article-slug]`
- View count incremented on page load
- Reading progress indicator
- Auto-save scroll position
- Premium articles show paywall after 2 paragraphs

**Business Rules:**
- Only published articles accessible
- Comments require account and moderation
- Breaking news badge visible if flagged
- Premium badge visible if premium content

### 4.4 Search Functionality

**Purpose:** Enable readers to find specific content.

**Components:**
- Search input in header
- Search results page
- Filters (category, date, author)
- Sort options (relevance, date)

**Behavior:**
- Live suggestions after 3 characters
- Search entire article content and title
- Highlight keywords in results
- Track popular searches for analytics

**Business Rules:**
- Search only published articles
- Minimum 2 characters required
- Results limited to 100 most relevant
- Search query logged for analytics

### 4.5 Comment System

**Purpose:** Enable reader discussions and community engagement.

**Components:**
- Comment form (requires login)
- Comment thread with nested replies
- Like/dislike buttons (optional)
- Report comment button
- Comment moderation queue (backoffice)

**Behavior:**
- Comments pending approval until reviewed
- Auto-approve if user has 5+ approved comments
- Nested replies up to 2 levels deep
- Notification sent to article author

**Business Rules:**
- Maximum 500 characters per comment
- Edit allowed within 15 minutes
- Banned users cannot comment
- Spam filter checks all comments
- Editors can approve/delete any comment

### 4.6 Newsletter System

**Purpose:** Build email subscriber list for content distribution.

**Components:**
- Signup form (email input + submit)
- Preferences page (frequency, topics)
- Email templates
- Unsubscribe mechanism

**Behavior:**
- Double opt-in confirmation email
- Send daily digest at 7 AM
- Weekly summary on Sundays
- Personalized based on preferences

**Business Rules:**
- Require valid email address
- One-click unsubscribe in every email
- GDPR-compliant data handling
- Track open and click rates

### 4.7 Rich Text Editor (Backoffice)

**Purpose:** Enable journalists to create formatted content.

**Components:**
- WYSIWYG editor toolbar
- Text formatting (bold, italic, headings, lists)
- Insert image/video
- Insert links
- Embed social media posts
- Code block formatting
- Table creation
- HTML source view

**Behavior:**
- Auto-save draft every 30 seconds
- Keyboard shortcuts for common actions
- Paste from Word cleanup
- Character count display
- Spell check integration

**Business Rules:**
- Maximum article length: 10,000 words
- Images automatically inserted as figures with captions
- External links open in new tab by default
- Sanitize HTML to prevent XSS

### 4.8 Media Library (Backoffice)

**Purpose:** Centralized asset management for all media.

**Components:**
- Grid view with thumbnails
- Upload area (drag-and-drop)
- Filters and search
- Detail panel (metadata, usage)
- Image editor
- Bulk operations

**Behavior:**
- Automatic thumbnail generation
- Preview media in lightbox
- Copy media URL to clipboard
- Insert media into article

**Business Rules:**
- Maximum upload size: 10MB per image, 100MB per video
- Supported formats: JPG, PNG, GIF, WebP, MP4, MOV
- Automatic image optimization (compression, WebP conversion)
- Unused media auto-archived after 6 months

### 4.9 Premium Content & Paywall

**Purpose:** Monetize high-value content through subscriptions.

**Components:**
- Premium badge on articles
- Paywall overlay (soft and hard)
- Subscription pricing page
- Payment integration
- Subscriber dashboard

**Behavior:**
- Free users see 2 premium articles per month
- Paywall appears after intro paragraphs
- Premium subscribers have unlimited access
- Premium content ad-free

**Business Rules:**
- Premium flag set per article
- Metered paywall: 2 free premium articles/month
- Subscription tiers: Basic, Premium, Premium Plus
- Payment via Stripe/Mollie
- Refund within 14 days

### 4.10 Advertisement System

**Purpose:** Generate revenue through display advertising.

**Components:**
- Ad units (banner, sidebar, native)
- Ad server integration
- Ad blocker detection
- Sponsored content markers

**Behavior:**
- Lazy load ads below fold
- Refresh ads after 30 seconds
- Hide ads for premium subscribers
- A/B test ad placements

**Business Rules:**
- Maximum 3 ads per article page
- Ads clearly labeled as "Advertisement"
- Sponsored content marked as "Sponsored"
- No ads on breaking/sensitive news
- Ad content must comply with policy

### 4.11 Push Notifications

**Purpose:** Re-engage users with breaking news and updates.

**Components:**
- Notification permission prompt
- Notification composer (backoffice)
- Notification preferences (frontend)
- Delivery tracking

**Behavior:**
- Request permission after 2nd visit
- Send breaking news immediately
- Personalized notifications based on interests
- Daily digest notification option

**Business Rules:**
- Maximum 3 notifications per day
- Breaking news always sent
- Respect user quiet hours (10 PM - 7 AM)
- Opt-out respected immediately
- Include article link and thumbnail

### 4.12 User Analytics Dashboard (Backoffice)

**Purpose:** Provide insights into content performance.

**Components:**
- Overview metrics (views, users, sessions)
- Traffic trends charts
- Top articles table
- Traffic sources breakdown
- Real-time visitors
- Category performance comparison
- Engagement metrics (comments, shares, time on page)

**Behavior:**
- Default to last 7 days
- Date range selector
- Export reports as CSV/PDF
- Scheduled email reports

**Business Rules:**
- Data updated every 5 minutes
- Historical data retained 2 years
- GDPR-compliant (anonymized IPs)
- Only accessible to Editors and Admins

---

## 5. User Flows

### 5.1 Reading an Article Flow

1. **Discover Article**
   - User lands on homepage
   - Sees featured/latest articles
   - Clicks article card

2. **View Article**
   - Article page loads
   - User reads title, author, date
   - Scrolls through content
   - Views embedded images/videos

3. **Engage with Content**
   - Shares article on social media
   - Clicks related article link
   - OR: Scrolls to comments section

4. **Exit or Continue**
   - Returns to homepage
   - OR: Clicks next article
   - OR: Closes browser

### 5.2 Commenting on Article Flow

1. **Read Article**
   - User finishes reading article
   - Scrolls to comment section

2. **Authentication Check**
   - IF not logged in: Click "Login to comment"
   - Redirected to login page
   - After login, returns to article

3. **Write Comment**
   - Types comment in text box
   - Clicks "Post Comment" button

4. **Moderation Queue**
   - Comment submitted as "Pending"
   - User sees "Your comment is awaiting moderation"
   - IF approved: Comment appears publicly
   - IF rejected: User notified via email

5. **Engagement**
   - User receives notifications on replies
   - Can edit/delete own comment

### 5.3 Publishing Article Flow (Journalist)

1. **Login to Backoffice**
   - Navigate to backoffice URL
   - Enter credentials
   - Dashboard loads

2. **Create Article**
   - Click "New Article" button
   - Fill in title and excerpt
   - Write content in rich text editor
   - Format text (headings, bold, lists)

3. **Add Media**
   - Click "Upload Image" button
   - Select file from computer
   - Crop image to 16:9
   - Add alt text and caption
   - Insert into article

4. **Metadata**
   - Select category from dropdown
   - Add 3-5 relevant tags
   - Write meta description for SEO
   - Set author (defaults to self)

5. **Review & Publish**
   - Click "Preview" to see article
   - IF satisfied: Click "Submit for Review"
   - Article status changes to "Pending Review"
   - Editor notified via email

6. **Editor Approval**
   - Editor reviews article
   - IF approved: Status set to "Published"
   - IF changes needed: Editor adds notes
   - Journalist makes revisions and resubmits

7. **Article Goes Live**
   - Published article appears on frontend
   - Shared on social media
   - Added to RSS feed
   - Newsletter subscribers notified

### 5.4 Newsletter Subscription Flow

1. **Discover Subscription**
   - User scrolls to footer
   - Sees newsletter signup form
   - OR: Modal popup after 3 articles read

2. **Enter Email**
   - Types email address
   - Clicks "Subscribe" button

3. **Confirmation**
   - Success message displayed
   - Confirmation email sent
   - User clicks link in email

4. **Preferences**
   - Redirected to preferences page
   - Selects frequency (daily/weekly)
   - Chooses topic interests
   - Saves preferences

5. **Receive Newsletter**
   - Automated email sent based on schedule
   - Contains curated articles
   - User reads in email
   - OR: Clicks through to website

6. **Manage Subscription**
   - User can update preferences
   - OR: Unsubscribe via link in email
   - Confirmation message shown

### 5.5 Accessing Premium Content Flow

1. **Discover Premium Article**
   - User browses homepage
   - Sees article with "Premium" badge
   - Clicks to read

2. **Partial Content View**
   - First 3 paragraphs visible
   - Paywall overlay appears
   - Message: "Subscribe to continue reading"

3. **Metered Paywall Check**
   - IF user has free articles remaining: Full access granted
   - IF free articles exhausted: Must subscribe

4. **Subscription Decision**
   - User clicks "See Plans"
   - Pricing page loads
   - 3 tiers shown: Basic, Premium, Premium Plus
   - User selects plan

5. **Payment Process**
   - User enters payment details
   - Secure payment via Stripe
   - Account upgraded immediately

6. **Access Granted**
   - User redirected to article
   - Full content now visible
   - "Premium Subscriber" badge on profile
   - Ad-free experience enabled

7. **Future Access**
   - All premium articles unlocked
   - No ads displayed
   - Priority customer support
   - Early access to new features

---

## 6. Content Model

### 6.1 Article Types

**Standard Article**
- Text-based news story
- 300-1500 words
- 1 featured image
- 0-5 inline images
- Tags and categories

**Breaking News**
- Urgent, time-sensitive news
- 100-500 words
- Brief, factual reporting
- Updated frequently
- Appears in breaking news ticker

**Photo Gallery**
- Image-focused story
- 10-50 images with captions
- Brief intro text
- Slideshow/carousel display

**Video Article**
- Video as primary content
- Embedded video player
- Transcript below video
- 100-300 words supporting text

**Opinion/Editorial**
- Author's perspective piece
- Clearly labeled as "Opinion"
- Author bio prominent
- 500-1200 words

**Live Blog**
- Real-time event coverage
- Chronological updates
- Multiple contributors
- Auto-refresh new posts

**Long-form Feature**
- In-depth investigative piece
- 2000-5000 words
- Multiple sections/chapters
- Rich media (images, videos, infographics)
- Often premium content

### 6.2 Categories

**Primary Categories:**
1. **Nieuws** (News) - General news, default category
2. **Binnenland** (Domestic) - Belgian national news
3. **Buitenland** (International) - World news
4. **Sport** (Sports) - Sports coverage
5. **Showbizz** (Entertainment) - Celebrity, entertainment
6. **Economie** (Economy) - Business and finance
7. **Tech** - Technology news
8. **Cultuur** (Culture) - Arts and culture
9. **Lifestyle** - Health, food, travel
10. **Opinie** (Opinion) - Editorial content

**Subcategories Examples:**
- Sport > Voetbal (Football), Wielrennen (Cycling), Tennis
- Economie > Beurs (Stock Market), Crypto, Bedrijven (Companies)
- Buitenland > Europa, VS (USA), Midden-Oosten (Middle East)

### 6.3 Media Types

**Images:**
- JPG, PNG, GIF, WebP
- Minimum: 800x450 (16:9)
- Recommended: 1920x1080
- Maximum file size: 10MB
- Alt text required for accessibility
- Caption optional

**Videos:**
- MP4, MOV formats
- Maximum file size: 100MB
- Hosted on CDN or YouTube/Vimeo embed
- Thumbnail required
- Closed captions recommended

**Documents:**
- PDF format
- Press releases, reports
- Maximum 5MB
- Embedded preview

**Audio:**
- MP3 format
- Podcasts, interviews
- Maximum 50MB
- Embedded player

### 6.4 Metadata Structure

**Article Metadata:**
- Title (required, max 100 chars)
- Slug (auto-generated, unique)
- Excerpt (required, max 250 chars)
- Content (required, rich text)
- Featured image (optional but recommended)
- Category (required, single select)
- Tags (optional, multi-select, max 10)
- Author (required, defaults to creator)
- Publication date (required)
- Reading time (auto-calculated)
- Status (Draft, Pending, Published, Archived)
- Featured flag (boolean)
- Breaking flag (boolean)
- Premium flag (boolean)
- Allow comments (boolean, default true)
- SEO meta description (optional, max 160 chars)
- SEO keywords (optional)

**User Metadata:**
- Name (required)
- Email (required, unique)
- Password (hashed)
- Avatar (optional)
- Role (Admin, Editor, Journalist, Reader)
- Bio (optional, max 500 chars)
- Social links (Twitter, LinkedIn, etc.)
- Preferences (JSON object)
- Account status (Active, Suspended, Deleted)

---

## 7. Wireframe Descriptions

### 7.1 Homepage (Desktop)

```
+------------------------------------------------------------------+
| [LOGO]    [Nieuws] [Sport] [Showbizz] [Economie]    [Search] [Login] |
+------------------------------------------------------------------+
| BREAKING NEWS: [Scrolling ticker with latest breaking news...]  |
+------------------------------------------------------------------+
|                                                                  |
| +------------------------------+  +--------------------------+  |
| |                              |  |                          |  |
| |    FEATURED ARTICLE          |  |   Featured Article 2     |  |
| |    (Large image)             |  |   (Medium image)         |  |
| |                              |  +--------------------------+  |
| |    Title                     |  |   Featured Article 3     |  |
| |    Excerpt...                |  |   (Medium image)         |  |
| +------------------------------+  +--------------------------+  |
|                                                                  |
| [Category Tabs: All | Nieuws | Sport | Showbizz | ...]          |
|                                                                  |
| +----------------+  +----------------+  +----------------+       |
| | Article 1      |  | Article 2      |  | Article 3      |       |
| | [Image]        |  | [Image]        |  | [Image]        |       |
| | Title          |  | Title          |  | Title          |       |
| | Excerpt...     |  | Excerpt...     |  | Excerpt...     |       |
| +----------------+  +----------------+  +----------------+       |
|                                                                  |
| [Load More Articles]                                             |
|                                                                  |
| SIDEBAR: [Trending] [Newsletter Signup] [Ad]                     |
+------------------------------------------------------------------+
| FOOTER: [About] [Contact] [Privacy] [Social Links]              |
+------------------------------------------------------------------+
```

**Key Elements:**
- Persistent header with navigation
- Breaking news ticker (auto-scroll)
- Hero section with 1 large + 2 medium featured articles
- Category filter tabs
- 3-column article grid
- Right sidebar with trending/newsletter/ads
- Footer with links

### 7.2 Article Detail Page (Desktop)

```
+------------------------------------------------------------------+
| [LOGO]    [Navigation Menu]                      [Search] [Login] |
+------------------------------------------------------------------+
| Home > Sport > Voetbal                           [Share Icons]    |
+------------------------------------------------------------------+
|                                                                  |
|                      ARTICLE TITLE                               |
|                                                                  |
|       Subtitle or excerpt goes here for context                  |
|                                                                  |
|    By [Author Name] | [Date] | [Category] | [Reading Time]      |
|                                                                  |
| +--------------------------------------------------------------+ |
| |                                                              | |
| |                  FEATURED IMAGE                              | |
| |                                                              | |
| +--------------------------------------------------------------+ |
| Image caption goes here                                          |
|                                                                  |
| Article content paragraph 1...                                   |
|                                                                  |
| Article content paragraph 2...                                   |
|                                                                  |
| [Inline Image]                                                   |
|                                                                  |
| More article content...                                          |
|                                                                  |
| +--------------------------------------------------------------+ |
| | AUTHOR BIO                                                    | |
| | [Avatar] Name - Brief bio and social links                    | |
| +--------------------------------------------------------------+ |
|                                                                  |
| +--------------------------------------------------------------+ |
| | RELATED ARTICLES                                              | |
| | [Article 1]  [Article 2]  [Article 3]                         | |
| +--------------------------------------------------------------+ |
|                                                                  |
| COMMENTS (23)                                                    |
| +--------------------------------------------------------------+ |
| | [User Avatar] User Name - 2 hours ago                         | |
| | Comment text here...              [Reply] [Report]            | |
| |   +----------------------------------------------------------+| |
| |   | Reply to comment...                                      || |
| |   +----------------------------------------------------------+| |
| +--------------------------------------------------------------+ |
| [Post Comment Box - Login Required]                              |
+------------------------------------------------------------------+
```

**Key Elements:**
- Breadcrumb navigation
- Social share toolbar (sticky)
- Article header with metadata
- Featured image with caption
- Article body with rich formatting
- Author bio section
- Related articles carousel
- Comment section with nested replies
- Comment input (requires auth)

### 7.3 Backoffice Dashboard

```
+------------------------------------------------------------------+
| [HLN CMS]                                    [User Menu]         |
+------------------------------------------------------------------+
| [Dashboard] [Articles] [Media] [Categories] [Users] [Settings]  |
+------------------------------------------------------------------+
|                                                                  |
| Dashboard Overview                          [Date Range: 7 Days] |
|                                                                  |
| +------------+  +------------+  +------------+  +------------+   |
| | Total      |  | Views      |  | Comments   |  | Pending    |   |
| | Articles   |  | Today      |  | Today      |  | Reviews    |   |
| |    247     |  |   15,342   |  |     89     |  |     12     |   |
| +------------+  +------------+  +------------+  +------------+   |
|                                                                  |
| +------------------------------+  +--------------------------+  |
| | TRAFFIC TRENDS               |  | TOP ARTICLES             |  |
| | [Line Chart]                 |  | 1. Article Title  2.3K   |  |
| |                              |  | 2. Article Title  1.8K   |  |
| |                              |  | 3. Article Title  1.5K   |  |
| +------------------------------+  +--------------------------+  |
|                                                                  |
| +--------------------------------------------------------------+ |
| | RECENT ARTICLES                       [New Article Button]   | |
| | Title | Author | Category | Status | Views | Actions         | |
| | ----------------------------------------------------------   | |
| | Art 1 | Tom    | Sport    | Pub    | 1.2K  | [Edit] [Delete] | |
| | Art 2 | Sarah  | News     | Draft  | 0     | [Edit] [Delete] | |
| +--------------------------------------------------------------+ |
|                                                                  |
| +--------------------------------------------------------------+ |
| | PENDING APPROVALS                                             | |
| | [Article requiring review] - Submitted by Tom 2 hours ago     | |
| | [Approve] [Request Changes]                                   | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Key Elements:**
- Top navigation with main sections
- Quick stats cards
- Traffic trends visualization
- Top-performing articles list
- Recent articles table with actions
- Pending approvals queue
- Quick action buttons

### 7.4 Article Editor (Backoffice)

```
+------------------------------------------------------------------+
| [Back to Articles]                 [Save Draft] [Preview] [Publish] |
+------------------------------------------------------------------+
|                                                                  |
| Title: [_____________________________________________________]   |
|                                                                  |
| Excerpt:                                                         |
| [_____________________________________________________________]  |
| [_____________________________________________________________]  |
|                                                                  |
| +--------------------------------------------------------------+ |
| | [B] [I] [H1] [H2] [List] [Link] [Image] [Video] [Code]      | |
| +--------------------------------------------------------------+ |
| | Content:                                                      | |
| |                                                              | |
| | Type your article content here...                            | |
| |                                                              | |
| |                                                              | |
| +--------------------------------------------------------------+ |
|                                                                  |
| Featured Image: [Upload Image] [Current Image Thumbnail]        |
|                                                                  |
| Category: [Dropdown Menu]                                        |
|                                                                  |
| Tags: [Tag 1] [Tag 2] [+ Add Tag]                                |
|                                                                  |
| Author: [Current User] (or select different)                     |
|                                                                  |
| [ ] Featured Article    [ ] Breaking News    [ ] Premium         |
|                                                                  |
| Publication Date: [Calendar Picker] (Schedule for later)         |
|                                                                  |
| SEO Meta Description:                                            |
| [_____________________________________________________________]  |
|                                                                  |
| [Save Draft]  [Preview]  [Publish Now]                           |
+------------------------------------------------------------------+
```

**Key Elements:**
- Title and excerpt fields
- Rich text WYSIWYG editor with toolbar
- Featured image upload
- Category dropdown
- Tag input with suggestions
- Author selection
- Feature flags (checkboxes)
- Publication scheduling
- SEO fields
- Action buttons (save, preview, publish)

---

## 8. Business Rules

### 8.1 Content Publishing Rules

**Article Publication:**
- Articles must have title, excerpt, content, and category
- Minimum content length: 100 words
- Featured image recommended but not required
- Journalists can create drafts but cannot publish
- Only Editors and Admins can publish articles
- Published articles immediately visible on frontend
- Scheduled articles publish automatically at set time
- Breaking news automatically unmarks after 24 hours
- Maximum 5 featured articles on homepage
- Archived articles not visible on frontend but accessible via URL

**Content Quality:**
- Title max 100 characters (optimal 60-70 for SEO)
- Excerpt max 250 characters
- Images must have alt text for accessibility
- External links should open in new tab
- No profanity or hate speech in content
- Plagiarism checks recommended before publishing
- Fact-checking required for breaking news

### 8.2 User Roles & Permissions

**Reader (Public):**
- Browse and read published articles
- Search content
- Register account
- Comment on articles (after approval)
- Save/bookmark articles
- Receive notifications (opt-in)
- Subscribe to newsletter

**Reader (Premium):**
- All Reader permissions
- Access premium articles
- Ad-free experience
- Early access to content
- Priority support

**Journalist:**
- Create and edit own articles
- Upload media files
- Save drafts
- Submit articles for review
- View own article analytics
- Manage own profile

**Editor:**
- All Journalist permissions
- Approve/reject articles
- Edit any article
- Delete articles
- Moderate comments
- Feature/breaking news flags
- View all analytics
- Manage categories and tags

**Administrator:**
- All Editor permissions
- Manage users (create, edit, delete)
- Assign roles
- Configure system settings
- Access audit logs
- Manage permissions
- Database backups

### 8.3 Comment Moderation Rules

**Auto-Approval:**
- Users with 5+ approved comments auto-approved
- Premium subscribers auto-approved
- Staff comments auto-approved

**Moderation Queue:**
- First-time commenters held for review
- Comments flagged by spam filter
- Comments reported by 3+ users
- Comments containing flagged keywords

**Comment Deletion:**
- Users can delete own comments anytime
- Editors can delete any comment
- Deleted comments show "Comment removed"
- If parent comment deleted, replies preserved

**User Bans:**
- 3 rejected comments = warning
- 5 rejected comments = 7-day ban
- Hate speech = permanent ban
- Ban appeal process available

### 8.4 Media Management Rules

**Upload Restrictions:**
- Images: Max 10MB, JPG/PNG/GIF/WebP
- Videos: Max 100MB, MP4/MOV
- Documents: Max 5MB, PDF
- Audio: Max 50MB, MP3
- Bulk upload max: 20 files at once

**Image Processing:**
- Auto-generate thumbnails (150x150, 300x200, 800x450)
- Compress images to <500KB
- Convert to WebP for modern browsers
- Strip EXIF data for privacy
- Generate responsive srcset

**Media Organization:**
- Unused media auto-archived after 6 months
- Deleted media moved to trash for 30 days
- Media linked to articles cannot be deleted
- Duplicate detection on upload

### 8.5 Subscription & Paywall Rules

**Free Tier:**
- Full access to standard articles
- 2 premium articles per month
- Ads displayed
- Basic newsletter

**Premium Subscription:**
- Unlimited premium articles
- Ad-free experience
- Premium newsletter with extras
- Early access to features
- Price: 9.99 EUR/month or 99 EUR/year

**Paywall Implementation:**
- Metered: 2 free premium articles/month
- Show first 3 paragraphs for non-subscribers
- Reset monthly on 1st of month
- Premium badge visible on article cards
- Subscriber status verified server-side

**Payment & Billing:**
- Secure payment via Stripe
- Automatic renewal (can cancel anytime)
- 14-day money-back guarantee
- Prorated refunds
- Invoice sent via email

### 8.6 Notification Rules

**Breaking News:**
- Sent immediately to all opted-in users
- Max 3 per day
- Title + thumbnail included
- Links directly to article

**Personalized Notifications:**
- Based on user interests/preferences
- Sent during user's active hours
- Max 2 per day (excluding breaking)
- Can be disabled per category

**Quiet Hours:**
- No notifications 10 PM - 7 AM local time
- Breaking news exception (user setting)
- Configurable in user preferences

### 8.7 SEO & Performance Rules

**SEO Requirements:**
- Unique title per article (no duplicates)
- Meta description 150-160 characters
- Semantic HTML structure (H1, H2, etc.)
- Schema.org Article markup
- Open Graph tags for social sharing
- Canonical URLs to prevent duplicates
- XML sitemap auto-generated
- Robots.txt properly configured

**Performance Targets:**
- Page load time < 2 seconds (4G)
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90
- Core Web Vitals: All "Good"
- Image lazy loading below fold
- Code splitting for faster loads

### 8.8 Data & Privacy Rules

**GDPR Compliance:**
- Cookie consent banner on first visit
- Privacy policy linked in footer
- Data export available on request
- Account deletion request honored within 30 days
- Email unsubscribe honored immediately
- Anonymous analytics (IP anonymization)
- Data retention: 2 years

**User Data:**
- Passwords hashed (bcrypt)
- Email addresses encrypted at rest
- No selling of user data
- Minimal data collection
- Audit log for admin actions

---

## 9. Success Metrics

### 9.1 Reader Engagement Metrics

**Primary KPIs:**
- **Daily Active Users (DAU):** Target 50,000+ within 6 months
- **Average Session Duration:** Target 5+ minutes
- **Pages per Session:** Target 3+ pages
- **Bounce Rate:** Target <40%
- **Return Visitor Rate:** Target >60%

**Content Engagement:**
- **Article Views:** Track per article and aggregate
- **Average Reading Time:** Target >2 minutes
- **Scroll Depth:** Target 70%+ reading full article
- **Social Shares:** Target 5% of readers share
- **Comments per Article:** Target 10+ on popular articles
- **Save/Bookmark Rate:** Target 15% of logged-in readers

**Conversion Metrics:**
- **Newsletter Signup Rate:** Target 10% of visitors
- **Account Registration Rate:** Target 25% of repeat visitors
- **Premium Conversion Rate:** Target 5% of active users
- **Premium Churn Rate:** Target <10% monthly

### 9.2 Content Performance Metrics

**Article Metrics:**
- **Publish Velocity:** 50+ articles per day
- **Draft to Publish Time:** Average <4 hours
- **Featured Article CTR:** Target >30%
- **Category Distribution:** Balanced across all categories
- **Average Article Quality Score:** Composite of engagement signals

**Editorial Efficiency:**
- **Articles per Journalist:** Average 3-5 per day
- **Approval Time:** Average <2 hours
- **Revision Rate:** <20% of articles need revisions
- **Content Accuracy:** <1% corrections/retractions

### 9.3 Technical Performance Metrics

**Page Performance:**
- **Page Load Time:** <2 seconds (75th percentile)
- **Time to First Byte (TTFB):** <600ms
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **First Input Delay (FID):** <100ms

**System Reliability:**
- **Uptime:** 99.9% SLA
- **Error Rate:** <0.1% of requests
- **API Response Time:** <200ms average
- **Database Query Time:** <50ms average
- **CDN Cache Hit Rate:** >90%

**Search Performance:**
- **Search Success Rate:** >90% find desired content
- **Search Response Time:** <500ms
- **Zero-Result Queries:** <5%

### 9.4 Business Metrics

**Revenue Targets:**
- **Ad Revenue:** 50,000 EUR/month by month 6
- **Premium Subscriptions:** 2,000 subscribers by month 6
- **Revenue per User (ARPU):** 2 EUR/month
- **Customer Lifetime Value (LTV):** 150 EUR
- **Customer Acquisition Cost (CAC):** <30 EUR

**Operational Efficiency:**
- **Content Cost per Article:** <50 EUR
- **Infrastructure Cost per User:** <0.10 EUR/month
- **Support Tickets:** <100 per week
- **Average Resolution Time:** <24 hours

### 9.5 Growth Metrics

**Audience Growth:**
- **Month-over-Month User Growth:** 20%
- **Organic Search Traffic:** 40% of total traffic
- **Social Media Referrals:** 20% of traffic
- **Direct Traffic:** 30% of traffic (brand loyalty)

**Content Reach:**
- **Social Media Followers:** 100K+ across platforms
- **Newsletter Subscribers:** 50K+ by month 6
- **Push Notification Subscribers:** 30K+ by month 6
- **Viral Articles:** 5+ per month (>50K views)

### 9.6 Monitoring & Reporting

**Real-time Dashboards:**
- Current active users
- Top articles (last hour)
- Traffic sources
- Error monitoring
- Server health

**Daily Reports:**
- Traffic summary
- Top-performing articles
- New user signups
- Revenue summary
- Comment moderation queue

**Weekly Reports:**
- Audience trends
- Content performance
- Category analysis
- Engagement metrics
- Technical performance

**Monthly Reports:**
- Executive summary
- Growth analysis
- Revenue report
- Content strategy review
- Technical health check
- Competitive analysis

---

## 10. Appendices

### 10.1 Glossary

- **Breaking News:** Urgent, time-sensitive news articles requiring immediate attention
- **Featured Article:** Editor-selected articles highlighted on homepage
- **Premium Content:** Subscription-required articles with in-depth analysis
- **Metered Paywall:** System allowing limited free access before requiring subscription
- **Engagement Rate:** Percentage of readers who interact (comment, share, save)
- **Bounce Rate:** Percentage of visitors who leave after viewing one page
- **Core Web Vitals:** Google's metrics for page experience (LCP, FID, CLS)
- **WYSIWYG:** What You See Is What You Get (editor)
- **SEO:** Search Engine Optimization
- **CDN:** Content Delivery Network
- **GDPR:** General Data Protection Regulation

### 10.2 References

- HLN.be (inspiration and competitive analysis)
- Next.js 14 Documentation
- Prisma ORM Documentation
- Tailwind CSS Documentation
- Web Content Accessibility Guidelines (WCAG 2.1)
- Google's Core Web Vitals
- GDPR Compliance Guidelines

### 10.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-18 | Documentation Team | Initial functional specification |

---

**End of Functional Specification**
